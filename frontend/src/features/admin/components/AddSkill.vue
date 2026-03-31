<template>
  <PopupModal v-model="isOpen" :title="isEditMode ? 'Edit Skill' : 'Add New Skill'" size="lg">
    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- Skill Name -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Skill Name <span class="text-red-500">*</span></label>
        <div class="relative">
          <input
            v-model="skill.skill_name"
            :readonly="isEditMode"
            type="text"
            placeholder="e.g., JavaScript, Python, React..."
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white',
              isEditMode ? 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 cursor-not-allowed text-gray-500' : 'border-gray-200 dark:border-gray-700'
            ]"
          />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span v-if="formStore.errors.skill_name" class="text-red-500 text-xs">{{ formStore.errors.skill_name }}</span>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          v-model="skill.description_skill"
          rows="3"
          placeholder="Describe this skill and its relevance..."
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white resize-none"
        ></textarea>
      </div>

      <!-- Indicators -->
      <div class="space-y-4">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Evaluation Indicators <span class="text-red-500">*</span></label>
        
        <div class="grid gap-4">
          <!-- Indicator 1 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">Indicator 1</span>
            </div>
            <input
              v-model="skill.question1"
              type="text"
              placeholder="e.g., How would you rate your knowledge?"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          <!-- Indicator 2 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">2</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">Indicator 2</span>
            </div>
            <input
              v-model="skill.question2"
              type="text"
              placeholder="e.g., Can you explain key concepts?"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          <!-- Indicator 3 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">3</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">Indicator 3</span>
            </div>
            <input
              v-model="skill.question3"
              type="text"
              placeholder="e.g., Have you built any projects?"
              class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>
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
        class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="formStore.loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>{{ formStore.loading ? 'Saving...' : (isEditMode ? 'Update Skill' : 'Create Skill') }}</span>
      </button>
    </template>
  </PopupModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFormStore } from '@/stores/form'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PopupModal from '@/components/ui/PopupModal.vue'

const formStore = useFormStore()
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isEditMode = computed(() => route.params.skill_name !== undefined)
const isOpen = ref(true)

const skill = ref({
  skill_name: '',
  question1: '',
  question2: '',
  question3: '',
  description_skill: '',
  id_admin: auth.ID
})

onMounted(() => {
  if (isEditMode.value && route.params.skill_name) {
    skill.value.skill_name = route.params.skill_name
  }
})

function closeModal() {
  isOpen.value = false
  router.push('/Skills')
}

async function submitForm() {
  formStore.clearErrors()
  
  try {
    const payload = {
      skill_name: skill.value.skill_name,
      question1: skill.value.question1,
      question2: skill.value.question2,
      question3: skill.value.question3,
      description_skill: skill.value.description_skill,
      id_admin: auth.ID
    }

    if (isEditMode.value) {
      await axios.patch(`/admin/skills/${skill.value.skill_name}`, payload)
    } else {
      await axios.post('/admin/skills/create', payload)
    }
    
    formStore.setSuccess(isEditMode.value ? 'Skill updated successfully!' : 'Skill created successfully!')
    setTimeout(() => closeModal(), 1000)
  } catch (err) {
    formStore.setError(err.response?.data?.error || 'Something went wrong')
  }
}
</script>
