<template>
  <admin-layout>
    <PageHeader title="Fields & Groups" :subtitle="`Manage academic fields and groups`">
      <template #actions>
        <SearchInput v-model="searchQuery" placeholder="Search fields..." @search="handleSearch" class="w-64" />
        <SaaSButton v-if="hasActiveFilters" variant="ghost" @click="clearFilters" title="Clear Filters">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </template>
          Clear
        </SaaSButton>
        <SaaSButton variant="secondary" @click="handleExport">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </template>
          Export CSV
        </SaaSButton>
        <SaaSButton variant="primary" @click="$router.push('/AddField')">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </template>
          Add Field
        </SaaSButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard :icon="FolderIcon" label="Total Fields" :value="groups.length" color="primary" />
      <StatCard :icon="CubeIcon" label="Total Classes" :value="totalClasses" color="success" />
      <StatCard :icon="SparklesIcon" label="This Year" :value="groups.length" color="info" />
    </div>

    <SaaSCard :padding="false">
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <SaaSTable v-else :data="paginatedData" :columns="columns" row-key="field" :sort-key="sortKey" :sort-order="sortOrder" :pagination="true" :current-page="currentPage" :page-size="10" :total-items="filteredGroups.length" @sort="handleSort" @page-change="goToPage">
        <template #cell-field="{ value }">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
          </div>
        </template>

        <template #cell-description="{ value }">
          <span class="text-gray-600 dark:text-gray-400">{{ value || 'No description' }}</span>
        </template>

        <template #cell-number_of_classes="{ value }">
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {{ value || 0 }} classes
          </span>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <router-link :to="`/AddField/${row.field}`" class="p-2 rounded-lg text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </router-link>
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No fields configured</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Set up fields or academic tracks to better segment your platform.</p>
            <SaaSButton variant="primary" @click="$router.push('/AddField')">Add Field</SaaSButton>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>
  </admin-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SaaSButton from '@/components/ui/SaaSButton.vue'
import SaaSCard from '@/components/ui/SaaSCard.vue'
import SaaSTable from '@/components/ui/SaaSTable.vue'
import StatCard from '@/components/ui/StatCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import api from '@/services/api'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'
import { FolderIcon, CubeIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const groups = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortKey = ref('field')
const sortOrder = ref('asc')

const columns = [
  { key: 'field', label: 'Field Name', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { key: 'number_of_classes', label: 'Classes', sortable: true },
]

const filteredGroups = computed(() => {
  let result = [...groups.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(g => g.field?.toLowerCase().includes(q) || g.description?.toLowerCase().includes(q))
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      let aVal = a[sortKey.value] || '', bVal = b[sortKey.value] || ''
      if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase() }
      return sortOrder.value === 'asc' ? (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) : (aVal > bVal ? -1 : aVal < bVal ? 1 : 0)
    })
  }
  return result
})

const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination(filteredGroups, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const totalClasses = computed(() => groups.value.reduce((sum, g) => sum + (g['number of classes'] || 0), 0))

function handleSearch(q) { searchQuery.value = q; goToPage(1) }

function handleExport() {
  exportToCSV(filteredGroups.value, 'fields', columns)
  toast.success('Fields exported successfully')
}

const hasActiveFilters = computed(() => searchQuery.value.trim() !== '')

function clearFilters() {
  searchQuery.value = ''
  goToPage(1)
}
function handleSort({ key, order }) { sortKey.value = key; sortOrder.value = order }

const fetchGroup = async () => {
  try { const res = await api.get('/admin/class'); groups.value = res.data.data; goToPage(1) }
  catch (e) { console.error('Error:', e); groups.value = [] }
  finally { isLoading.value = false }
}

onBeforeMount(async () => { await fetchGroup() })
</script>
