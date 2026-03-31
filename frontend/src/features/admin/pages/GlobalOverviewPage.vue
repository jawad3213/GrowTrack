<template>
  <admin-layout>
    <PageHeader title="Evaluations" :subtitle="`View all student evaluations`">
      <template #actions>
        <SaaSButton variant="outline" @click="refreshData">
          <template #icon-left>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </template>
          Refresh
        </SaaSButton>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard :icon="ClipboardDocumentCheckIcon" label="Total Evaluations" :value="raw.length" color="primary" />
      <StatCard :icon="AcademicCapIcon" label="This Month" :value="thisMonthCount" color="success" />
      <StatCard :icon="UserGroupIcon" label="Unique Students" :value="uniqueStudents" color="info" />
      <StatCard :icon="ChartBarIcon" label="Unique Evaluators" :value="uniqueEvaluators" color="warning" />
    </div>

    <SaaSCard :padding="false">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <SaaSTable v-else :data="paginatedData" :columns="columns" row-key="id_evaluation" :pagination="true" :current-page="currentPage" :page-size="10" :total-items="filteredEvaluations.length" @page-change="goToPage">
        <template #cell-id_evaluation="{ value }">
          <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#{{ value }}</span>
        </template>

        <template #cell-evaluator_full_name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-semibold text-xs shadow-md" :style="{ backgroundColor: stringToColor(row.evaluator_full_name) }">
              {{ row.evaluator_full_name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.evaluator_full_name }}</p>
              <p class="text-xs text-gray-500">{{ row.evaluator_role }}</p>
            </div>
          </div>
        </template>

        <template #cell-student_full_name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-semibold text-xs shadow-md" :style="{ backgroundColor: stringToColor(row.student_full_name) }">
              {{ row.student_full_name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ row.student_full_name }}</p>
              <p class="text-xs text-gray-500">{{ row.student_role }}</p>
            </div>
          </div>
        </template>

        <template #cell-date_add="{ value }">
          <span class="text-gray-600 dark:text-gray-400">{{ formatDate(value) }}</span>
        </template>

        <template #cell-type_evaluation="{ value }">
          <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
            {{ value || 'Standard' }}
          </span>
        </template>

        <template #actions="{ row }">
          <ShowDetailsButton :id="row.id_evaluation" />
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No evaluations found</h3>
            <p class="text-gray-500 dark:text-gray-400">There are no evaluations to display.</p>
          </div>
        </template>
      </SaaSTable>
    </SaaSCard>
  </admin-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import ShowDetailsButton from '@/features/professor/components/ShowDetailsButton.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import SaaSButton from '@/components/ui/SaaSButton.vue'
import SaaSCard from '@/components/ui/SaaSCard.vue'
import SaaSTable from '@/components/ui/SaaSTable.vue'
import StatCard from '@/components/ui/StatCard.vue'
import { usePagination } from '@/composables/usePagination'
import { ClipboardDocumentCheckIcon, AcademicCapIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const loading = ref(false)
const raw = ref([])

const columns = [
  { key: 'id_evaluation', label: 'ID', sortable: false },
  { key: 'evaluator_full_name', label: 'Evaluator', sortable: false },
  { key: 'student_full_name', label: 'Student', sortable: false },
  { key: 'date_add', label: 'Date', sortable: false },
  { key: 'type_evaluation', label: 'Type', sortable: false },
]

const filteredEvaluations = computed(() =>
  [...raw.value].sort((a, b) => new Date(b.date_add) - new Date(a.date_add))
)

const { currentPage, totalPages, paginatedData, nextPage, prevPage, goToPage } = usePagination(filteredEvaluations, 10)

const thisMonthCount = computed(() => {
  const now = new Date(), start = new Date(now.getFullYear(), now.getMonth(), 1)
  return raw.value.filter(e => new Date(e.date_add) >= start).length
})
const uniqueStudents = computed(() => new Set(raw.value.map(e => e.student_full_name).filter(Boolean)).size)
const uniqueEvaluators = computed(() => new Set(raw.value.map(e => e.evaluator_full_name).filter(Boolean)).size)

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
}

async function refreshData() {
  loading.value = true
  try {
    const res = await api.get('/api/GlobalOverView/all_evaluation')
    raw.value = res.data.result || []
    goToPage(1)
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

const stringToColor = (str) => {
  if (!str) return 'hsl(250, 50%, 55%)'
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return `hsl(${Math.abs(h) % 360}, 55%, 55%)`
}

onMounted(refreshData)
</script>
