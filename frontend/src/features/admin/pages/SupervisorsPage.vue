<template>
  <admin-layout>
    <PageHeader title="Supervisors" :subtitle="`Manage internship supervisors`">
      <template #actions>
        <SearchInput v-model="searchQuery" placeholder="Search supervisors..." @search="handleSearch" class="w-64" />
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
        <SaaSButton variant="primary" @click="openAddModal">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </template>
          Add Supervisor
        </SaaSButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard :icon="UserGroupIcon" label="Total Supervisors" :value="stats.total || 0" color="primary" />
      <StatCard :icon="BuildingOfficeIcon" label="Companies" :value="stats.companies || 0" color="success" />
      <StatCard :icon="BriefcaseIcon" label="Positions" :value="stats.positions || 0" color="info" />
      <StatCard :icon="ArrowTrendingUpIcon" label="Growth Rate" :value="stats.growthRate || 0" format="percent" :trend="stats.growthRate" color="warning" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard :icon="UserGroupIcon" label="Active" :value="stats.active || 0" color="success" />
      <StatCard :icon="BriefcaseIcon" label="Active Internships" :value="stats.activeInternships || 0" color="info" />
      <StatCard :icon="CheckCircleIcon" label="Completed Internships" :value="stats.completedInternships || 0" color="primary" />
      <StatCard :icon="UsersIcon" label="Supervised Students" :value="stats.supervisedStudents || 0" color="secondary" />
    </div>

    <SaaSCard :padding="false">
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <SaaSTable v-else :data="paginatedData" :columns="columns" row-key="id_utilisateur" :sort-key="sortKey" :sort-order="sortOrder" :pagination="true" :current-page="currentPage" :page-size="10" :total-items="filteredSups.length" @sort="handleSort" @page-change="goToPage">
        <template #cell-full_name="{ row }">
          <div class="flex items-center gap-3">
            <UserAvatar :name="row.full_name" size="md" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.full_name }}</p>
              <p class="text-xs text-gray-500">{{ row.email }}</p>
            </div>
          </div>
        </template>

        <template #cell-numero_de_matricule="{ value }">
          <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ value || 'N/A' }}</span>
        </template>

        <template #cell-nom_de_entreprise="{ value }">
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{{ value || 'N/A' }}</span>
        </template>

        <template #cell-my_position="{ value }">
          <span class="text-gray-600 dark:text-gray-400">{{ value || 'N/A' }}</span>
        </template>

        <template #cell-date_creation="{ value }">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {{ formatDate(value) }}
          </div>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button @click="openEditModal(row.id_utilisateur)" class="p-2 rounded-lg text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button @click="confirmDelete(row)" class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No supervisors found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">No internship or external supervisors have been added.</p>
            <SaaSButton variant="primary" @click="openAddModal">Add Supervisor</SaaSButton>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>

    <SaaSModal v-model="showDeleteModal" title="Confirm Delete" size="sm" theme="danger">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Supervisor?</h3>
        <p class="text-gray-500 dark:text-gray-400">Are you sure you want to delete <strong>{{ supToDelete?.full_name }}</strong>?</p>
      </div>
      <template #footer>
        <SaaSButton variant="ghost" @click="showDeleteModal = false">Cancel</SaaSButton>
        <SaaSButton variant="danger" @click="deleteSupervisor">Delete</SaaSButton>
      </template>
    </SaaSModal>

    <SaaSModal v-model="showEditModal" :title="selectedSupId ? 'Edit Supervisor' : 'Add New Supervisor'" size="lg" theme="supervisor">
      <EditSupervisorModal
        :supervisor-id="selectedSupId"
        @close="closeEditModal"
        @refresh="fetchSups"
      />
    </SaaSModal>
  </admin-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SaaSButton from '@/components/ui/SaaSButton.vue'
import SaaSCard from '@/components/ui/SaaSCard.vue'
import SaaSTable from '@/components/ui/SaaSTable.vue'
import SaaSModal from '@/components/ui/SaaSModal.vue'
import StatCard from '@/components/ui/StatCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import api from '@/services/api'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'
import { useStudentStore } from '@/stores/student'
import { UserGroupIcon, BuildingOfficeIcon, BriefcaseIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const studentStore = useStudentStore()

const sups = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortKey = ref('full_name')
const sortOrder = ref('asc')
const showDeleteModal = ref(false)
const supToDelete = ref(null)
const showEditModal = ref(false)
const selectedSupId = ref(null)

const columns = [
  { key: 'full_name', label: 'Supervisor', sortable: true },
  { key: 'numero_de_matricule', label: 'Reg. Number', sortable: true },
  { key: 'nom_de_entreprise', label: 'Company', sortable: true },
  { key: 'my_position', label: 'Position', sortable: true },
  { key: 'date_creation', label: 'Date Added', sortable: true },
]

const filteredSups = computed(() => {
  let result = [...sups.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(s => s.full_name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.nom_de_entreprise?.toLowerCase().includes(q) || s.my_position?.toLowerCase().includes(q))
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

const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination(filteredSups, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const stats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  companies: 0,
  positions: 0,
  supervisedStudents: 0,
  activeInternships: 0,
  completedInternships: 0,
  thisMonth: 0,
  growthRate: 0
})

async function fetchStats() {
  try {
    const res = await api.get('/admin/supervisors/stats')
    stats.value = res.data.data
  } catch (err) {
    console.error('Error loading supervisor stats:', err)
  }
}

function handleSearch(q) { searchQuery.value = q; goToPage(1) }

function handleExport() {
  exportToCSV(filteredSups.value, 'supervisors', columns)
  toast.success('Supervisors exported successfully')
}

const hasActiveFilters = computed(() => searchQuery.value.trim() !== '')

function clearFilters() {
  searchQuery.value = ''
  goToPage(1)
}
function handleSort({ key, order }) { sortKey.value = key; sortOrder.value = order }
function formatDate(d) { return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A' }

function openAddModal() {
  selectedSupId.value = null
  showEditModal.value = true
}

function openEditModal(id) {
  selectedSupId.value = id
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
}

function confirmDelete(sup) { supToDelete.value = sup; showDeleteModal.value = true }
async function deleteSupervisor() {
  try {
    await studentStore.deleteSupervisor(supToDelete.value.id_utilisateur)
    showDeleteModal.value = false
    toast.success('Supervisor deleted successfully')
    fetchSups()
  } catch (e) { 
    console.error('Error deleting supervisor:', e)
    toast.error('Failed to delete supervisor. Please try again.')
  }
}
const fetchSups = async () => {
  try { const res = await api.get('/admin/supervisors'); sups.value = res.data.data; goToPage(1) }
  catch (e) { console.error('Error:', e); sups.value = [] }
  finally { isLoading.value = false }
}
onMounted(() => {
  fetchSups()
  fetchStats()
})
const stringToColor = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h); return `hsl(${Math.abs(h) % 360}, 55%, 55%)` }
</script>
