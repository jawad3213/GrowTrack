<template>
  <PopupModal v-model="isOpen" :title="isEditMode ? 'Edit Student' : 'Add New Student'" size="lg">
    <div class="space-y-5">
      <!-- Full Name + CIN -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="Student.full_name"
              type="text"
              placeholder="Enter full name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all"
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
              v-model="Student.cin"
              type="text"
              placeholder="K00000"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h3m-3 4h2m-2 2v-2m0 2h2m-2-4h2m-6 0H9m0 4v-2m0 2h2m-2-4h2" />
            </svg>
          </div>
          <span v-if="formStore.errors.cin" class="text-red-500 text-xs">{{ formStore.errors.cin }}</span>
        </div>
      </div>

      <!-- CNE + Email -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Code Apogee <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="Student.cne"
              type="text"
              placeholder="CNE000001"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <span v-if="formStore.errors.cne" class="text-red-500 text-xs">{{ formStore.errors.cne }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="Student.email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span v-if="formStore.errors.email" class="text-red-500 text-xs">{{ formStore.errors.email }}</span>
        </div>
      </div>

      <!-- Password -->
      <div v-if="!isEditMode" class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Password <span class="text-red-500">*</span></label>
        <div class="flex gap-3">
          <div class="relative flex-1">
            <input
              v-model="Student.pass"
              type="password"
              placeholder="Enter password"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <button
            type="button"
            @click="generatePassword"
            class="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate
          </button>
        </div>
        <span v-if="formStore.errors.pass" class="text-red-500 text-xs">{{ formStore.errors.pass }}</span>
      </div>

      <!-- Year + Field -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Year of Studies <span class="text-red-500">*</span></label>
          <select
            v-model="Student.id_sector"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all appearance-none"
          >
            <option disabled value="">Select year</option>
            <option>AP1</option>
            <option>AP2</option>
            <option>CI1</option>
            <option>CI2</option>
            <option>CI3</option>
          </select>
          <span v-if="formStore.errors.id_sector" class="text-red-500 text-xs">{{ formStore.errors.id_sector }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Field <span class="text-red-500">*</span></label>
          <select
            v-model="Student.id_class"
            :disabled="availableFields.length === 0"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all appearance-none disabled:opacity-50"
          >
            <option disabled value="">Select field</option>
            <option v-for="id_class in availableFields" :key="id_class">{{ id_class }}</option>
          </select>
          <span v-if="formStore.errors.id_class" class="text-red-500 text-xs">{{ formStore.errors.id_class }}</span>
        </div>
      </div>

      <!-- Notes -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin Notes</label>
        <textarea
          v-model="Student.note"
          rows="3"
          placeholder="Add any notes about this student..."
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white transition-all resize-none"
        ></textarea>
      </div>

      <!-- Alerts -->
      <div v-if="formStore.error" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p class="text-sm text-red-600 dark:text-red-400">{{ formStore.error }}</p>
      </div>
      <div v-if="formStore.success" class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
        <p class="text-sm text-emerald-600 dark:text-emerald-400">{{ formStore.success }}</p>
      </div>
    </div>

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
        class="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <svg v-if="formStore.loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>{{ formStore.loading ? 'Saving...' : (isEditMode ? 'Update Student' : 'Create Student') }}</span>
      </button>
    </template>
  </PopupModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form'
import { useStudentStore } from '@/stores/student'
import PopupModal from '@/components/ui/PopupModal.vue'
import api from '@/services/api'

const props = defineProps({
  studentCin: { type: String, default: null }
})

const emit = defineEmits(['close', 'refresh'])

const formStore = useFormStore()
const studentStore = useStudentStore()
const isOpen = ref(true)

const Student = ref({
  full_name: '',
  cin: '',
  cne: '',
  email: '',
  pass: '',
  id_sector: '',
  id_class: '',
  note: ''
})

const isEditMode = computed(() => !!props.studentCin)
const availableFields = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/admin/class')
    availableFields.value = res.data.data.map(f => f.field)
  } catch (e) { console.error(e) }
})

function closeModal() {
  isOpen.value = false
  emit('close')
}

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  Student.value.pass = password
}

async function submitForm() {
  formStore.clearErrors()
  
  try {
    if (isEditMode.value) {
      await studentStore.updateStudent(props.studentCin, Student.value)
    } else {
      await studentStore.createStudent(Student.value)
    }
    
    emit('refresh')
    emit('close')
  } catch (err) {
    console.error(err)
  }
}
</script>
