<template>
  <admin-layout>
    <PageHeader title="Signals" :subtitle="`Manage student signals and reports`">
      <template #actions>
        <div class="flex items-center gap-3">
          <select v-model="statusFilter" class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">All Status</option>
            <option value="No Action Taken">No Action Taken</option>
            <option value="in progress">In Progress</option>
            <option value="Blocked">Blocked</option>
            <option value="Approved">Approved</option>
          </select>
          <DateRangePicker v-model="dateRange" />
          <SaaSButton v-if="hasActiveFilters" variant="ghost" @click="clearFilters" title="Clear Filters">
            <template #icon-left>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </template>
            Clear
          </SaaSButton>
          <AutoRefreshToggle
            v-model="autoRefreshEnabled"
            :interval="refreshInterval"
            @refresh="fetchSignals"
          />
          <SaaSButton variant="secondary" @click="handleExport">
            <template #icon-left>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </template>
            Export CSV
          </SaaSButton>
          <SearchInput v-model="searchQuery" placeholder="Search signals..." @search="handleSearch" class="w-64" />
        </div>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard :icon="ExclamationTriangleIcon" label="Total Signals" :value="signals.length" color="primary" />
      <StatCard :icon="ClockIcon" label="Pending" :value="pendingCount" color="warning" />
      <StatCard :icon="CheckCircleIcon" label="Resolved" :value="resolvedCount" color="success" />
      <StatCard :icon="XCircleIcon" label="Blocked" :value="blockedCount" color="danger" />
    </div>

    <SaaSCard :padding="false">
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <SaaSTable v-else :data="paginatedData" :columns="columns" row-key="id_signal" :sort-key="sortKey" :sort-order="sortOrder" :pagination="true" :current-page="currentPage" :page-size="10" :total-items="filteredSignals.length" @sort="handleSort" @page-change="goToPage">
        <template #cell-id_signal="{ value }">
          <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#{{ value }}</span>
        </template>

        <template #cell-reporder_name="{ row }">
          <div class="flex items-center gap-3">
            <UserAvatar :name="row.reporder_name" size="sm" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.reporder_name }}</p>
              <p class="text-xs text-gray-500">{{ row.reporder_role }}</p>
            </div>
          </div>
        </template>

        <template #cell-reported_name="{ row }">
          <div class="flex items-center gap-3">
            <UserAvatar :name="row.reported_name" size="sm" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.reported_name }}</p>
              <p class="text-xs text-gray-500">{{ row.reported_role }}</p>
            </div>
          </div>
        </template>

        <template #cell-solution_state="{ value }">
          <span :class="solutionBadge(value || 'No Action Taken')">
            {{ value || 'No Action Taken' }}
          </span>
        </template>

        <template #actions="{ row }">
          <ShowSignalDetailsButton :id="row.id_signal" />
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No signals found</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ searchQuery || statusFilter ? 'No signals match your filters' : 'There are no signals to display.' }}</p>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>

    <SignalEvaluationModal v-if="showModal" :signal="selectedSignal" @close="showModal = false" @refresh="fetchSignals" />
  </admin-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SaaSButton from '@/components/ui/SaaSButton.vue'
import SaaSCard from '@/components/ui/SaaSCard.vue'
import SaaSTable from '@/components/ui/SaaSTable.vue'
import StatCard from '@/components/ui/StatCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import DateRangePicker from '@/components/ui/DateRangePicker.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import SignalEvaluationModal from '@/features/admin/components/SignalEvaluationModal.vue'
import ShowSignalDetailsButton from '@/features/admin/components/Solution.vue'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'
import AutoRefreshToggle from '@/components/ui/AutoRefreshToggle.vue'
import { ExclamationTriangleIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref({ start: null, end: null })
const signals = ref([])
const selectedSignal = ref(null)
const showModal = ref(false)
const isLoading = ref(true)
const sortKey = ref('date_add')
const sortOrder = ref('desc')
const autoRefreshEnabled = ref(false)
const refreshInterval = ref(60000)

const columns = [
  { key: 'id_signal', label: 'ID', sortable: true },
  { key: 'reporder_name', label: 'Reported By', sortable: true },
  { key: 'reported_name', label: 'Reported User', sortable: true },
  { key: 'solution_state', label: 'Status', sortable: true },
]

const filteredSignals = computed(() => {
  let result = [...signals.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(s => s.reporder_name?.toLowerCase().includes(q) || s.reported_name?.toLowerCase().includes(q) || s.reason?.toLowerCase().includes(q))
  }
  if (statusFilter.value) {
    result = result.filter(s => (s.solution_state || 'No Action Taken') === statusFilter.value)
  }
  if (dateRange.value.start || dateRange.value.end) {
    result = result.filter(signal => {
      if (!signal.date_add) return false
      const date = new Date(signal.date_add)
      const start = dateRange.value.start ? new Date(dateRange.value.start) : null
      const end = dateRange.value.end ? new Date(dateRange.value.end) : null
      if (start && date < start) return false
      if (end && date > end) return false
      return true
    })
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      let aVal = a[sortKey.value] || '', bVal = b[sortKey.value] || ''
      if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase() }
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder.value === 'asc' ? cmp : -cmp
    })
  }
  return result
})

const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination(filteredSignals, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const pendingCount = computed(() => signals.value.filter(s => !s.solution_state || s.solution_state === 'No Action Taken' || s.solution_state === 'in progress').length)
const resolvedCount = computed(() => signals.value.filter(s => s.solution_state === 'Approved').length)
const blockedCount = computed(() => signals.value.filter(s => s.solution_state === 'Blocked').length)

function handleSearch(q) { searchQuery.value = q; goToPage(1) }

function handleExport() {
  exportToCSV(filteredSignals.value, 'signals', columns)
  toast.success('Signals exported successfully')
}

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || statusFilter.value || dateRange.value.start || dateRange.value.end
})

function clearFilters() {
  searchQuery.value = ''
  statusFilter.value = ''
  dateRange.value = { start: null, end: null }
  goToPage(1)
}

function handleSort({ key, order }) { sortKey.value = key; sortOrder.value = order }

async function fetchSignals() {
  try { const res = await api.get('/admin/signals'); signals.value = res.data.data; goToPage(1) }
  catch (e) { console.error('Error:', e) }
  finally { isLoading.value = false }
}

const solutionBadge = (solution) => {
  const badges = {
    'No Action Taken': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    'in progress': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    'Blocked': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Approved': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  }
  return (badges[solution] || badges['No Action Taken']) + ' px-3 py-1 rounded-full text-xs font-medium'
}

const stringToColor = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h); return `hsl(${Math.abs(h) % 360}, 55%, 55%)` }

onMounted(fetchSignals)
</script>
