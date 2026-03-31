<template>
  <admin-layout>
    <!-- Page Header -->
    <PageHeader title="Students" :subtitle="`Manage your student database`">
      <template #actions>
        <SearchInput
          v-model="searchQuery"
          placeholder="Search students..."
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
        <DateRangePicker v-model="dateRange" />
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
          Add Student
        </SaaSButton>
      </template>
    </PageHeader>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        :icon="UsersIcon"
        label="Total Students"
        :value="stats.total || 0"
        color="primary"
      />
      <StatCard
        :icon="AcademicCapIcon"
        label="Active"
        :value="stats.active || 0"
        color="success"
      />
      <StatCard
        :icon="CalendarIcon"
        label="With Internship"
        :value="stats.withInternship || 0"
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
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        :icon="UsersIcon"
        label="Inactive"
        :value="stats.inactive || 0"
        color="danger"
      />
      <StatCard
        :icon="UserGroupIcon"
        label="Male"
        :value="stats.male || 0"
        color="primary"
      />
      <StatCard
        :icon="UserGroupIcon"
        label="Female"
        :value="stats.female || 0"
        color="secondary"
      />
      <StatCard
        :icon="CalendarIcon"
        label="Without Internship"
        :value="stats.withoutInternship || 0"
        color="info"
      />
    </div>

    <!-- Main Content Card -->
    <SaaSCard :padding="false">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-500">Loading students...</p>
        </div>
      </div>

      <!-- Table -->
      <SaaSTable
        v-else
        :data="paginatedData"
        :columns="columns"
        row-key="id_utilisateur"
        :selectable="true"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        :pagination="true"
        :current-page="currentPage"
        :page-size="10"
        :total-items="filteredStudents.length"
        @sort="handleSort"
        @page-change="goToPage"
        v-model:selected-rows="selectedRows"
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

        <template #cell-date_add="{ value }">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(value) }}
          </div>
        </template>

        <template #cell-status="{ row }">
          <span
            :class="[
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
              row.status === 'actif' 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            ]"
          >
            <span class="w-1.5 h-1.5 rounded-full mr-1.5" 
              :class="row.status === 'actif' ? 'bg-emerald-500' : 'bg-gray-400'"
            ></span>
            {{ row.status === 'actif' ? 'Active' : 'Inactive' }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button
              @click="openEditModal(row.cin)"
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No students found</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              {{ searchQuery ? `No students match your search for "${searchQuery}"` : "You haven't added any students yet. Get started by adding your first student." }}
            </p>
            <SaaSButton variant="primary" @click="openAddModal">
              <template #icon-left>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </template>
              Add Student
            </SaaSButton>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>

    <!-- Bulk Actions Bar -->
    <Transition name="slide-up">
      <BulkActionBar
        v-if="selectedRows.length > 0"
        :selected-count="selectedRows.length"
        @delete="bulkDelete"
        @clear="selectedRows = []"
      />
    </Transition>

    <!-- Add/Edit Modal -->
    <SaaSModal v-model="showAddStudentModal" :title="selectedStudentCin ? 'Edit Student' : 'Add New Student'" size="lg" theme="student">
      <AddStudentModal
        :student-cin="selectedStudentCin"
        @close="closeAddModal"
        @refresh="fetchStudents"
      />
    </SaaSModal>

    <!-- Delete Confirmation Modal -->
    <SaaSModal v-model="showDeleteModal" title="Confirm Delete" size="sm" theme="danger">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Student?</h3>
        <p class="text-gray-500 dark:text-gray-400">
          Are you sure you want to delete <strong>{{ studentToDelete?.full_name }}</strong>? This action cannot be undone.
        </p>
      </div>
      <template #footer>
        <SaaSButton variant="ghost" @click="showDeleteModal = false">Cancel</SaaSButton>
        <SaaSButton variant="danger" @click="deleteStudent">Delete</SaaSButton>
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
import DateRangePicker from '@/components/ui/DateRangePicker.vue'
import BulkActionBar from '@/components/ui/BulkActionBar.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import AddStudentModal from '@/features/admin/components/AddStudentModal.vue'
import api from '@/services/api'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'

// Icons
import { UsersIcon, AcademicCapIcon, CalendarIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/outline'

const students = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const dateRange = ref({ start: null, end: null })
const sortKey = ref('full_name')
const sortOrder = ref('asc')
const selectedRows = ref([])
const showAddStudentModal = ref(false)
const selectedStudentCin = ref(null)
const showDeleteModal = ref(false)
const studentToDelete = ref(null)

const columns = [
  { key: 'full_name', label: 'Student', sortable: true },
  { key: 'cin', label: 'CIN', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'date_add', label: 'Registration Date', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
]

// Computed
const filteredStudents = computed(() => {
  let result = [...students.value]
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(student => 
      student.full_name?.toLowerCase().includes(query) ||
      student.cin?.toLowerCase().includes(query) ||
      student.email?.toLowerCase().includes(query)
    )
  }
  
  if (dateRange.value.start || dateRange.value.end) {
    result = result.filter(student => {
      if (!student.date_add) return false
      const date = new Date(student.date_add)
      const start = dateRange.value.start ? new Date(dateRange.value.start) : null
      const end = dateRange.value.end ? new Date(dateRange.value.end) : null
      if (start && date < start) return false
      if (end && date > end) return false
      return true
    })
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
} = usePagination(filteredStudents, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const stats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  male: 0,
  female: 0,
  withInternship: 0,
  withoutInternship: 0,
  thisMonth: 0,
  growthRate: 0
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || dateRange.value.start || dateRange.value.end
})

function clearFilters() {
  searchQuery.value = ''
  dateRange.value = { start: null, end: null }
  goToPage(1)
}

async function fetchStats() {
  try {
    const res = await api.get('/admin/students/stats')
    stats.value = res.data.data
  } catch (err) {
    console.error('Error loading student stats:', err)
  }
}

// Methods
function openAddModal() {
  selectedStudentCin.value = null
  showAddStudentModal.value = true
}

function openEditModal(id) {
  selectedStudentCin.value = id
  showAddStudentModal.value = true
}

function closeAddModal() {
  showAddStudentModal.value = false
}

function handleExport() {
  exportToCSV(filteredStudents.value, 'students', columns)
  toast.success('Students exported successfully')
}

function handleSort({ key, order }) {
  sortKey.value = key
  sortOrder.value = order
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function confirmDelete(student) {
  studentToDelete.value = student
  showDeleteModal.value = true
}

async function deleteStudent() {
  try {
    await api.delete(`/admin/students/${studentToDelete.value.id_etudiant}`)
    showDeleteModal.value = false
    studentToDelete.value = null
    toast.success('Student deleted successfully')
    fetchStudents()
  } catch (err) {
    console.error('Error deleting student:', err)
    toast.error('Failed to delete student. Please try again.')
  }
}

async function bulkDelete() {
  try {
    for (const id of selectedRows.value) {
      await api.delete(`/admin/students/${id}`)
    }
    selectedRows.value = []
    toast.success('Students deleted successfully')
    fetchStudents()
  } catch (err) {
    console.error('Error bulk deleting:', err)
    toast.error('Failed to delete students. Please try again.')
  }
}

async function fetchStudents() {
  isLoading.value = true
  try {
    const res = await api.get('/admin/students')
    students.value = res.data.data
    goToPage(1)
  } catch (err) {
    console.error('Error loading students:', err)
    students.value = []
  } finally {
    isLoading.value = false
  }
}

const stringToColor = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 55%, 55%)`
}

onMounted(() => {
  fetchStudents()
  fetchStats()
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
