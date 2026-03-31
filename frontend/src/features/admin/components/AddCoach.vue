<template>
  <PopupModal v-model="isOpen" :title="isEditMode ? 'Edit Coach' : 'Add New Coach'" size="lg">
    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- Full Name + CIN -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="coach.full_name"
              type="text"
              placeholder="Coach full name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span v-if="formStore.errors.full_name" class="text-red-500 text-xs">{{ formStore.errors.full_name }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">CIN <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="coach.cin"
              type="text"
              :disabled="isEditMode"
              placeholder="CIN number"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white disabled:opacity-50"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 4h2m-2 2v-2m0 2h2m-2-4h2m-6 0H9m0 4v-2m0 2h2m-2-4h2" />
            </svg>
          </div>
          <span v-if="formStore.errors.cin" class="text-red-500 text-xs">{{ formStore.errors.cin }}</span>
        </div>
      </div>

      <!-- Email + Password (only in Create mode) -->
      <div v-if="!isEditMode" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="coach.email"
              type="email"
              placeholder="coach@example.com"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span v-if="formStore.errors.email" class="text-red-500 text-xs">{{ formStore.errors.email }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Password <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="coach.pass"
              type="password"
              placeholder="Secure password"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span v-if="formStore.errors.pass" class="text-red-500 text-xs">{{ formStore.errors.pass }}</span>
        </div>
      </div>

      <!-- Specialization + Field -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Specialization <span class="text-red-500">*</span></label>
          <select
            v-model="coach.field"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white appearance-none"
          >
            <option value="">Select specialization</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Data Science</option>
            <option>UI/UX Design</option>
            <option>Cloud Computing</option>
            <option>DevOps</option>
            <option>Cybersecurity</option>
            <option>Machine Learning</option>
          </select>
          <span v-if="formStore.errors.field" class="text-red-500 text-xs">{{ formStore.errors.field }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Domain Description</label>
          <textarea
            v-model="coach.note"
            rows="3"
            placeholder="Describe the coach's expertise..."
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all dark:text-white resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="formStore.error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p class="text-sm text-red-600 dark:text-red-400">{{ formStore.error }}</p>
      </div>
      <div v-if="formStore.success" class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
        <p class="text-sm text-emerald-600 dark:text-emerald-400">{{ formStore.success }}</p>
      </div>
    </form>

    <!-- Footer -->
    <template #footer>
      <button
        type="button"
        @click="closeModal"
        class="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Cancel
      </button>
      <button
        type="button"
        @click="submitForm"
        :disabled="formStore.loading"
        class="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="formStore.loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>{{ formStore.loading ? 'Saving...' : (isEditMode ? 'Update Coach' : 'Create Coach') }}</span>
      </button>
    </template>
  </PopupModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFormStore } from '@/stores/form'
import PopupModal from '@/components/ui/PopupModal.vue'

const router = useRouter()
const route = useRoute()
const formStore = useFormStore()

const isEditMode = computed(() => route.params.id !== undefined)
const isOpen = ref(true)

const coach = ref({
  full_name: '',
  cin: '',
  email: '',
  pass: '',
  field: '',
  note: ''
})

function closeModal() {
  isOpen.value = false
  router.push('/Coach')
}

async function submitForm() {
  formStore.clearErrors()
  
  try {
    if (isEditMode.value) {
      await axios.patch(`/admin/coachs/${coach.value.cin}`, coach.value)
    } else {
      await axios.post('/admin/coachs/create', coach.value)
    }
    formStore.setSuccess(isEditMode.value ? 'Coach updated successfully!' : 'Coach created successfully!')
    setTimeout(() => closeModal(), 1000)
  } catch (err) {
    formStore.setError(err.response?.data?.error || 'Something went wrong')
  }
}
</script>
