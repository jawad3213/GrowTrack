<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-16">
      <div class="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-500">Loading signal details...</p>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Signal #{{ route.params.id }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(signalData.submitted_date) }}</p>
          </div>
        </div>
        <button @click="closeModal" class="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Reporter Info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
        <div class="space-y-3">
          <label class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reported By</label>
          <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
              {{ signalData.reporter_name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ signalData.reporter_name }}</p>
              <p class="text-xs text-gray-500">{{ signalData.reporter_role }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <label class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reported User</label>
          <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-semibold text-sm">
              {{ signalData.reported_name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ signalData.reported_name }}</p>
              <p class="text-xs text-gray-500">{{ signalData.reported_role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reason -->
      <div class="space-y-3 pt-4">
        <label class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</label>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ signalData.reason || 'No reason provided' }}</p>
        </div>
      </div>

      <!-- Current Status -->
      <div v-if="signalData.solution_state" class="space-y-3 pt-4">
        <label class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Status</label>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl" :class="statusClass">
          <span class="w-2 h-2 rounded-full" :class="statusDotClass"></span>
          <span class="font-medium">{{ signalData.solution_state }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
        <button
          @click="goToRejection"
          class="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Reject
        </button>
        <button
          @click="goToSolution"
          class="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Approve
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const signalData = ref({})
const isLoading = ref(true)

const statusClass = computed(() => {
  const state = signalData.value.solution_state
  if (state === 'Approved') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
  if (state === 'Blocked') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  if (state === 'in progress') return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
  return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
})

const statusDotClass = computed(() => {
  const state = signalData.value.solution_state
  if (state === 'Approved') return 'bg-emerald-500'
  if (state === 'Blocked') return 'bg-red-500'
  if (state === 'in progress') return 'bg-violet-500'
  return 'bg-gray-500'
})

function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

async function fetchSignal() {
  try {
    const res = await api.get(`/admin/signals/review/${route.params.id}`)
    signalData.value = res.data.data
  } catch (err) {
    console.error('Error fetching signal:', err)
  } finally {
    isLoading.value = false
  }
}

function closeModal() {
  router.back()
}

function goToSolution() {
  router.push({ name: 'Solution', params: { id: route.params.id } })
}

function goToRejection() {
  router.push({ name: 'Rejection', params: { id: route.params.id } })
}

onMounted(fetchSignal)
</script>
