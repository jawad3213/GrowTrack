<template>
  <admin-layout>
    <!-- Page Header -->
    <PageHeader title="Professors" :subtitle="`Manage your professor database`">
      <template #actions>
        <SearchInput
          v-model="searchQuery"
          placeholder="Search professors..."
          @search="handleSearch"
          class="w-64"
        />
        <SaaSButton 
          v-if="hasActiveFilters" 
          variant="ghost" 
          @click="clearFilters"
          title="Clear Filters"
        >
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </template>
          Clear
        </SaaSButton>
        <SaaSButton variant="secondary" @click="handleExport">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
          Export CSV
        </SaaSButton>
        <SaaSButton variant="primary" @click="openAddModal">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </template>
          Add Professor
        </SaaSButton>
      </template>
    </PageHeader>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        :icon="AcademicCapIcon"
        label="Total Professors"
        :value="stats.total || 0"
        color="primary"
      />
      <StatCard
        :icon="BuildingOfficeIcon"
        label="Departments"
        :value="stats.departments || 0"
        color="success"
      />
      <StatCard
        :icon="UserGroupIcon"
        label="Active"
        :value="stats.active || 0"
        color="info"
      />
      <StatCard
        :icon="ClipboardDocumentCheckIcon"
        label="Contract (Titulaire)"
        :value="stats.contractCount || 0"
        color="warning"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        :icon="UserGroupIcon"
        label="Vacataire"
        :value="stats.vacataireCount || 0"
        color="secondary"
      />
      <StatCard
        :icon="BookOpenIcon"
        label="Courses Taught"
        :value="stats.coursesTaught || 0"
        color="primary"
      />
      <StatCard
        :icon="CalendarIcon"
        label="Classes Assigned"
        :value="stats.classesAssigned || 0"
        color="info"
      />
      <StatCard
        :icon="ArrowTrendingUpIcon"
        label="Growth Rate"
        :value="stats.growthRate || 0"
        format="percent"
        :trend="stats.growthRate"
        color="warning"
      />
    </div>

    <!-- Main Content Card -->
    <SaaSCard :padding="false">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-500">Loading professors...</p>
        </div>
      </div>

      <!-- Table -->
      <SaaSTable
        v-else
        :data="paginatedData"
        :columns="columns"
        row-key="cin"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        :pagination="true"
        :current-page="currentPage"
        :page-size="10"
        :total-items="filteredProfs.length"
        @sort="handleSort"
        @page-change="goToPage"
      >
        <!-- Custom Cells -->
        <template #cell-full_name="{ row }">
          <div class="flex items-center gap-3">
            <UserAvatar :name="row.full_name" size="md" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.full_name }}</p>
              <p class="text-xs text-gray-500">{{ row.email }}</p>
            </div>
          </div>
        </template>

        <template #cell-cin="{ value }">
          <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {{ value }}
          </span>
        </template>

        <template #cell-departement="{ value }">
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {{ value || 'N/A' }}
          </span>
        </template>

        <template #cell-date_creation="{ value }">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(value) }}
          </div>
        </template>

        <template #cell-status="{ value }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
              value === 'actif' 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            <span class="w-1.5 h-1.5 rounded-full mr-1.5" 
              :class="value === 'actif' ? 'bg-emerald-500' : 'bg-gray-400'"
            ></span>
            {{ value === 'actif' ? 'Active' : 'Inactive' }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button
              @click="openEditModal(row.id_utilisateur)"
              class="p-2 rounded-lg text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
              title="Edit"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              @click="confirmDelete(row)"
              class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </template>

        <!-- Empty State -->
        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No professors found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              {{ searchQuery ? `No professors match your search for "${searchQuery}"` : "You haven't added any professors yet." }}
            </p>
            <SaaSButton variant="primary" @click="openAddModal">
              <template #icon-left>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </template>
              Add Professor
            </SaaSButton>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>

    <!-- Add/Edit Modal -->
    <div v-if="showAddProfModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">{{ selectedProfId ? 'Edit Professor' : 'Add New Professor' }}</h3>
          <button @click="closeAddModal" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <EditProfessorModal
          :key="selectedProfId || 'add'"
          :professor-id="selectedProfId"
          @close="closeAddModal"
          @refresh="fetchProfs"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <SaaSModal v-model="showDeleteModal" title="Confirm Delete" size="sm" theme="danger">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Professor?</h3>
        <p class="text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <strong>{{ profToDelete?.full_name }}</strong>? This action cannot be undone.
        </p>
      </div>
      <template #footer>
        <SaaSButton variant="ghost" @click="showDeleteModal = false">Cancel</SaaSButton>
        <SaaSButton variant="danger" @click="deleteProf">Delete</SaaSButton>
      </template>
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
import AddProfessorModal from '@/features/admin/components/AddProfessorModal.vue'
import EditProfessorModal from '@/features/admin/components/EditProfessorModal.vue'
import { useStudentStore } from '@/stores/student'
import api from '@/services/api'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'

const studentStore = useStudentStore()

// Icons
import { 
  AcademicCapIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon 
} from '@heroicons/vue/24/outline'

const profs = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortKey = ref('full_name')
const sortOrder = ref('asc')
const showAddProfModal = ref(false)
const selectedProfId = ref(null)
const showDeleteModal = ref(false)
const profToDelete = ref(null)

const columns = [
  { key: 'full_name', label: 'Professor', sortable: true },
  { key: 'cin', label: 'CIN', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'departement', label: 'Department', sortable: true },
  { key: 'date_creation', label: 'Registration Date', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
]

// Computed
const filteredProfs = computed(() => {
  let result = [...profs.value]
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(prof => 
      prof.full_name?.toLowerCase().includes(query) ||
      prof.cin?.toLowerCase().includes(query) ||
      prof.email?.toLowerCase().includes(query) ||
      prof.departement?.toLowerCase().includes(query)
    )
  }
  
  if (sortKey.value) {
    result.sort((a, b) => {
      let aVal = a[sortKey.value] ?? ''
      let bVal = b[sortKey.value] ?? ''
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  }
  
  return result
})

const { 
  currentPage, 
  totalPages, 
  paginatedData, 
  nextPage, 
  prevPage, 
  goToPage 
} = usePagination(filteredProfs, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const stats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  departments: 0,
  contractCount: 0,
  vacataireCount: 0,
  coursesTaught: 0,
  classesAssigned: 0,
  thisMonth: 0,
  growthRate: 0
})

const uniqueDepartments = computed(() => stats.value.departments)
const activeThisMonth = computed(() => stats.value.activeThisMonth)
const contractCount = computed(() => stats.value.contractCount)

async function fetchStats() {
  try {
    const res = await api.get('/admin/professors/stats')
    stats.value = res.data.data
  } catch (err) {
    console.error('Error loading professor stats:', err)
  }
}

// Methods
function openAddModal() {
  selectedProfId.value = null
  showAddProfModal.value = true
}

function openEditModal(id) {
  console.log('🎯 OPEN EDIT MODAL - id:', id, 'current selectedProfId:', selectedProfId.value)
  selectedProfId.value = id
  console.log('🎯 After assignment - selectedProfId:', selectedProfId.value)
  showAddProfModal.value = true
  console.log('🎯 showAddProfModal set to true, modal should open')
}

function closeAddModal() {
  showAddProfModal.value = false
}

function confirmDelete(prof) {
  profToDelete.value = prof
  showDeleteModal.value = true
}

const hasActiveFilters = computed(() => searchQuery.value.trim() !== '')

function clearFilters() {
  searchQuery.value = ''
  goToPage(1)
}

function handleExport() {
  exportToCSV(filteredProfs.value, 'professors', columns)
  toast.success('Professors exported successfully')
}

async function deleteProf() {
  try {
    await studentStore.deleteProf(profToDelete.value.id_utilisateur)
    showDeleteModal.value = false
    profToDelete.value = null
    toast.success('Professor deleted successfully')
    fetchProfs()
  } catch (err) {
    console.error('Error deleting professor:', err)
    toast.error('Failed to delete professor. Please try again.')
  }
}

async function fetchProfs() {
  isLoading.value = true
  try {
    const res = await api.get('/admin/professors')
    profs.value = res.data.data
    goToPage(1)
  } catch (error) {
    console.error('Error loading professors:', error)
    profs.value = []
  } finally {
    isLoading.value = false
  }
}

function handleSearch(query) {
  searchQuery.value = query
  goToPage(1)
}

function handleSort({ key, order }) {
  sortKey.value = key
  sortOrder.value = order
}

function formatDate(date) {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchProfs()
  fetchStats()
})

const stringToColor = (str) => {
  if (!str) return 'hsl(250, 50%, 55%)'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 55%, 55%)`
}
</script>
