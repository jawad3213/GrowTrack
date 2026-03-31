<template>
  <admin-layout>
    <PageHeader title="Skills" :subtitle="`Manage evaluation skills and competencies`">
      <template #actions>
        <SearchInput v-model="searchQuery" placeholder="Search skills..." @search="handleSearch" class="w-64" />
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
        <SaaSButton variant="primary" @click="$router.push('/AddSkill')">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </template>
          Add Skill
        </SaaSButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard :icon="SparklesIcon" label="Total Skills" :value="stats.total || 0" color="primary" />
      <StatCard :icon="ClipboardDocumentCheckIcon" label="With Questions" :value="stats.withQuestions || 0" color="success" />
      <StatCard :icon="ChartBarIcon" label="Categories" :value="stats.categories || 0" color="info" />
    </div>

    <SaaSCard :padding="false">
      <div v-if="isLoading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <SaaSTable v-else :data="paginatedData" :columns="columns" row-key="id_competence" :sort-key="sortKey" :sort-order="sortOrder" :pagination="true" :current-page="currentPage" :page-size="10" :total-items="filteredSkills.length" @sort="handleSort" @page-change="goToPage">
        <template #cell-nom_competence="{ value }">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
          </div>
        </template>

        <template #cell-description_competence="{ value }">
          <span class="text-gray-600 dark:text-gray-400 line-clamp-2">{{ value || 'No description' }}</span>
        </template>

        <template #cell-question1="{ value }">
          <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', value ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400']">
            {{ value ? 'Configured' : 'Not set' }}
          </span>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <router-link :to="`/AddSkill/${row.nom_competence}`" class="p-2 rounded-lg text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </router-link>
            <button @click="confirmDelete(row)" class="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No skills defined</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">Create skills and indicators to build your custom evaluation framework.</p>
            <SaaSButton variant="primary" @click="$router.push('/AddSkill')">Add Skill</SaaSButton>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>

    <SaaSModal v-model="showDeleteModal" title="Confirm Delete" size="sm" theme="danger">
      <div class="text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Skill?</h3>
        <p class="text-gray-500 dark:text-gray-400">Are you sure you want to delete <strong>{{ skillToDelete?.nom_competence }}</strong>?</p>
      </div>
      <template #footer>
        <SaaSButton variant="ghost" @click="showDeleteModal = false">Cancel</SaaSButton>
        <SaaSButton variant="danger" @click="deleteSkill">Delete</SaaSButton>
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
import api from '@/services/api'
import { usePagination } from '@/composables/usePagination'
import { useExport } from '@/composables/useExport'
import { useToast } from '@/composables/useToast'
import { SparklesIcon, ClipboardDocumentCheckIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const skills = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortKey = ref('nom_competence')
const sortOrder = ref('asc')
const showDeleteModal = ref(false)
const skillToDelete = ref(null)

const columns = [
  { key: 'nom_competence', label: 'Skill Name', sortable: true },
  { key: 'description_competence', label: 'Description', sortable: true },
  { key: 'question1', label: 'Questions', sortable: false },
]

const filteredSkills = computed(() => {
  let result = [...skills.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(s => s.nom_competence?.toLowerCase().includes(q) || s.description_competence?.toLowerCase().includes(q))
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

const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination(filteredSkills, 10)

const { exportToCSV } = useExport()
const toast = useToast()

const stats = ref({ total: 0, withQuestions: 0, categories: 0 })

async function fetchStats() {
  try {
    const res = await api.get('/admin/skills/stats')
    stats.value = res.data.data
  } catch (err) {
    console.error('Error loading skill stats:', err)
  }
}

function handleSearch(q) { searchQuery.value = q; goToPage(1) }

function handleExport() {
  exportToCSV(filteredSkills.value, 'skills', columns)
  toast.success('Skills exported successfully')
}

const hasActiveFilters = computed(() => searchQuery.value.trim() !== '')

function clearFilters() {
  searchQuery.value = ''
  goToPage(1)
}
function handleSort({ key, order }) { sortKey.value = key; sortOrder.value = order }
function confirmDelete(skill) { skillToDelete.value = skill; showDeleteModal.value = true }
async function deleteSkill() {
  try {
    await api.delete(`/admin/skills/${skillToDelete.value.id_competence}`)
    showDeleteModal.value = false
    toast.success('Skill deleted successfully')
    fetchSkills()
  } catch (e) { 
    console.error('Error deleting skill:', e)
    toast.error('Failed to delete skill. Please try again.')
  }
}
const fetchSkills = async () => {
  try { const res = await api.get('/admin/skills'); skills.value = res.data.data; goToPage(1) }
  catch (e) { console.error('Error:', e); skills.value = [] }
  finally { isLoading.value = false }
}
onMounted(() => {
  fetchSkills()
  fetchStats()
})
</script>
