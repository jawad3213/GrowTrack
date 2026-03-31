<template>
  <PopupModal v-model="isOpen" :title="isEditMode ? 'Edit Supervisor' : 'Add New Supervisor'" size="lg">
    <form @submit.prevent="submitForm" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="supervisor.fullName"
              type="text"
              placeholder="Full name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span v-if="errors.fullName" class="text-red-500 text-xs">{{ errors.fullName }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">CIN <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="supervisor.cin"
              type="text"
              placeholder="CIN number"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 4h2m-2 2v-2m0 2h2m-2-4h2m-6 0H9m0 4v-2m0 2h2m-2-4h2" />
            </svg>
          </div>
          <span v-if="errors.cin" class="text-red-500 text-xs">{{ errors.cin }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="supervisor.email"
              type="email"
              placeholder="you@company.com"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>
        <div v-if="!isEditMode" class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Password <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="supervisor.password"
              type="password"
              placeholder="Enter a secure password"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Company</label>
          <div class="relative">
            <input
              v-model="supervisor.company"
              type="text"
              placeholder="Company name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Registration Number</label>
          <div class="relative">
            <input
              v-model="supervisor.registrationNumber"
              type="text"
              placeholder="Registration code"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date <span class="text-red-500">*</span></label>
          <input
            v-model="supervisor.dateStart"
            type="date"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
          />
          <span v-if="errors.dateStart" class="text-red-500 text-xs">{{ errors.dateStart }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">End Date <span class="text-red-500">*</span></label>
          <input
            v-model="supervisor.dateEnd"
            type="date"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
          />
          <span v-if="errors.dateEnd" class="text-red-500 text-xs">{{ errors.dateEnd }}</span>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Internship Subject</label>
        <textarea
          v-model="supervisor.subject"
          rows="3"
          placeholder="Describe the internship subject..."
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white resize-none"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Position</label>
        <div class="relative">
          <input
            v-model="supervisor.position"
            type="text"
            placeholder="Your position in the company"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
          />
        </div>
      </div>

      <div v-if="errors.general" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p class="text-sm text-red-600 dark:text-red-400">{{ errors.general }}</p>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        @click="closeModal"
        class="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        @click="submitForm"
        :disabled="loading"
        class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
        <span>{{ loading ? 'Saving...' : (isEditMode ? 'Update Supervisor' : 'Create Supervisor') }}</span>
      </button>
    </template>
  </PopupModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { useFormStore } from '@/stores/form'
import PopupModal from '@/components/ui/PopupModal.vue'

const props = defineProps({
  supervisorId: { type: String, default: null }
})

const emit = defineEmits(['close', 'refresh'])

const router = useRouter()
const studentStore = useStudentStore()
const formStore = useFormStore()
const loading = ref(false)
const errors = ref({})
const isOpen = ref(true)

const isEditMode = computed(() => !!props.supervisorId)

const supervisor = ref({
  fullName: '',
  cin: '',
  email: '',
  password: '',
  company: '',
  registrationNumber: '',
  dateStart: '',
  dateEnd: '',
  subject: '',
  position: ''
})

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const data = await studentStore.getSupervisorById(props.supervisorId)
      if (data && data.data) {
        const s = data.data
        supervisor.value = {
          fullName: (s.prenom ? s.prenom + ' ' : '') + (s.nom || ''),
          cin: s.cin || '',
          email: s.email || '',
          password: '',
          company: s.nom_de_entreprise || '',
          registrationNumber: s.numero_de_matricule || '',
          dateStart: s.debut_stage ? s.debut_stage.split('T')[0] : '',
          dateEnd: s.fin_stage ? s.fin_stage.split('T')[0] : '',
          subject: s.sujet_stage || '',
          position: s.my_position || ''
        }
      }
    } catch (e) {
      console.error('Error loading supervisor:', e)
    }
  }
})

function closeModal() {
  isOpen.value = false
  emit('close')
}

async function submitForm() {
  loading.value = true
  errors.value = {}
  
  try {
    if (isEditMode.value) {
      await studentStore.updateSupervisor(props.supervisorId, {
        full_name: supervisor.value.fullName,
        cin: supervisor.value.cin,
        email: supervisor.value.email,
        nom_de_entreprise: supervisor.value.company,
        numero_de_matricule: supervisor.value.registrationNumber,
        date_debut: supervisor.value.dateStart,
        date_fin: supervisor.value.dateEnd,
        sujet_stage: supervisor.value.subject,
        my_position: supervisor.value.position
      })
    } else {
      await axios.post('/admin/supervisors/create', {
        full_name: supervisor.value.fullName,
        cin: supervisor.value.cin,
        email: supervisor.value.email,
        pass: supervisor.value.password,
        nom_de_entreprise: supervisor.value.company,
        numero_de_matricule: supervisor.value.registrationNumber,
        date_debut: supervisor.value.dateStart,
        date_fin: supervisor.value.dateEnd,
        sujet_stage: supervisor.value.subject,
        my_position: supervisor.value.position
      })
    }
    
    emit('refresh')
    emit('close')
  } catch (err) {
    errors.value = err.response?.data || { general: 'Something went wrong' }
  } finally {
    loading.value = false
  }
}
</script>
