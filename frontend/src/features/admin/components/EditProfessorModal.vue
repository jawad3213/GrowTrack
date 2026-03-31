<template>
  <PopupModal v-model="isOpen" :title="isEditMode ? 'Edit Professor' : 'Add New Professor'" size="lg">
    <form @submit.prevent="submitForm" class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="prof.name"
              type="text"
              placeholder="Professor full name"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">CIN <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="prof.cin"
              type="text"
              placeholder="CIN number"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
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
              v-model="prof.email"
              type="email"
              placeholder="professor@university.com"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
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
              v-model="prof.pass"
              type="password"
              placeholder="Secure password"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span v-if="errors.pass" class="text-red-500 text-xs">{{ errors.pass }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Department <span class="text-red-500">*</span></label>
          <select
            v-model="prof.department"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white appearance-none"
          >
            <option value="">Select department</option>
            <option>MATHS</option>
            <option>INFO</option>
            <option>BIO</option>
            <option>LOGE</option>
            <option>PHYSICS</option>
            <option>CHEMISTRY</option>
          </select>
          <span v-if="errors.department" class="text-red-500 text-xs">{{ errors.department }}</span>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Professor Code <span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              v-model="prof.code"
              type="text"
              placeholder="e.g., PROF001"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
          <span v-if="errors.code" class="text-red-500 text-xs">{{ errors.code }}</span>
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Assigned Classes</label>
        <div v-for="(group, index) in prof.Classe" :key="index" class="flex gap-3 items-start">
          <div class="flex-1 grid grid-cols-3 gap-3">
            <select v-model="group.level" class="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
              <option>AP1</option><option>AP2</option><option>CI1</option><option>CI2</option><option>CI3</option>
            </select>
            <select v-model="group.class" class="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
              <option>GI</option><option>GE</option><option>GM</option><option>IM</option><option>TC</option>
            </select>
            <input v-model="group.course" type="text" placeholder="Course name" class="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <button v-if="prof.Classe.length > 1" type="button" @click="removeGroup(index)" class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
        <button type="button" @click="addGroup" class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">+ Add Another Class</button>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Notes</label>
        <textarea
          v-model="prof.note"
          rows="3"
          placeholder="Additional notes about this professor..."
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white resize-none"
        ></textarea>
      </div>

      <div v-if="errors.general" class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <p class="text-sm text-red-600 dark:text-red-400">{{ errors.general }}</p>
      </div>
    </form>

    <template #footer>
      <button type="button" @click="closeModal" class="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        Cancel
      </button>
      <button type="button" @click="submitForm" :disabled="loading" class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2">
        <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
        <span>{{ loading ? 'Saving...' : (isEditMode ? 'Update Professor' : 'Create Professor') }}</span>
      </button>
    </template>
  </PopupModal>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import PopupModal from '@/components/ui/PopupModal.vue'

const props = defineProps({
  professorId: { type: String, default: null }
})

const emit = defineEmits(['close', 'refresh'])

const router = useRouter()
const route = useRoute()
const studentStore = useStudentStore()
const loading = ref(false)
const errors = ref({})
const isOpen = ref(true)

const isEditMode = computed(() => !!props.professorId)

console.log('EditProfessorModal - professorId:', props.professorId, 'isEditMode:', isEditMode.value)

const prof = ref({
  name: '',
  cin: '',
  email: '',
  pass: '',
  department: '',
  code: '',
  note: '',
  Classe: [{ level: 'AP1', class: 'GI', course: '' }]
})

onMounted(async () => {
  console.log('📌 onMounted fired, professorId:', props.professorId)
  await loadProfessor()
})

watch(() => props.professorId, async (newVal) => {
  console.log('📌 watch triggered, newVal:', newVal)
  await loadProfessor()
}, { immediate: true })

async function loadProfessor() {
  console.log('🔍 loadProfessor START - isEditMode:', isEditMode.value, 'props.professorId:', props.professorId)
  if (isEditMode.value && props.professorId) {
    try {
      console.log('🔍 Calling API with id:', props.professorId)
      const data = await studentStore.getProfById(props.professorId)
      console.log('🔍 API response:', data)
      if (data && data.data) {
        const p = data.data
        console.log('🔍 Professor data received:', p)
        prof.value = {
          name: (p.prenom ? p.prenom + ' ' : '') + (p.nom || ''),
          cin: p.cin || '',
          email: p.email || '',
          pass: '',
          department: p.departement || '',
          code: p.code || '',
          note: '',
          Classe: [{ level: 'AP1', class: 'GI', course: '' }]
        }
        console.log('🔍 Form state after update:', JSON.parse(JSON.stringify(prof.value)))
      } else {
        console.log('🔍 No data.data in response:', data)
      }
    } catch (e) {
      console.error('🔍 Error loading professor:', e)
    }
  } else {
    console.log('🔍 Skipping - not edit mode or no professorId')
  }
}

function addGroup() {
  prof.value.Classe.push({ level: 'AP1', class: 'GI', course: '' })
}

function removeGroup(index) {
  prof.value.Classe.splice(index, 1)
}

function closeModal() {
  isOpen.value = false
  emit('close')
}

async function submitForm() {
  loading.value = true
  errors.value = {}
  
  try {
    const classes = prof.value.Classe.map(c => c.class)
    const courses = prof.value.Classe.map(c => c.course)
    
    if (isEditMode.value) {
      await studentStore.updateProf(props.professorId, {
        name: prof.value.name,
        cin: prof.value.cin,
        email: prof.value.email,
        departement: prof.value.department,
        code: prof.value.code,
        note: prof.value.note,
        course: courses,
        classe: classes
      })
    } else {
      await axios.post('/admin/professors/create', {
        name: prof.value.name,
        cin: prof.value.cin,
        email: prof.value.email,
        pass: prof.value.pass,
        departement: prof.value.department,
        code: prof.value.code,
        note: prof.value.note,
        course: courses,
        classe: classes
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
