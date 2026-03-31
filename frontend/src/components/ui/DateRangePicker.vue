<template>
  <div class="flex items-center gap-2">
    <div class="relative">
      <input
        v-model="startDate"
        type="date"
        :max="endDate || today"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-purple-500"
        @change="emitChange"
      />
    </div>
    <span class="text-gray-500 dark:text-gray-400">to</span>
    <div class="relative">
      <input
        v-model="endDate"
        type="date"
        :min="startDate"
        :max="today"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-purple-500"
        @change="emitChange"
      />
    </div>
    <select
      v-model="preset"
      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-purple-500"
      @change="applyPreset"
    >
      <option value="">Custom</option>
      <option value="7">Last 7 days</option>
      <option value="30">Last 30 days</option>
      <option value="90">Last 90 days</option>
    </select>
    <button
      v-if="startDate || endDate"
      @click="clear"
      class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      title="Clear date range"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: null, end: null })
  }
})

const emit = defineEmits(['update:modelValue'])

const startDate = ref(props.modelValue.start || '')
const endDate = ref(props.modelValue.end || '')
const preset = ref('')
const today = computed(() => new Date().toISOString().split('T')[0])

function emitChange() {
  preset.value = ''
  emit('update:modelValue', {
    start: startDate.value || null,
    end: endDate.value || null
  })
}

function applyPreset() {
  if (!preset.value) return
  
  const days = parseInt(preset.value)
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  
  startDate.value = start.toISOString().split('T')[0]
  endDate.value = end.toISOString().split('T')[0]
  
  emit('update:modelValue', {
    start: startDate.value,
    end: endDate.value
  })
}

function clear() {
  startDate.value = ''
  endDate.value = ''
  preset.value = ''
  emit('update:modelValue', { start: null, end: null })
}
</script>
