<template>
  <div class="flex items-center gap-3">
    <label class="flex items-center gap-2 cursor-pointer">
      <div class="relative">
        <input
          type="checkbox"
          v-model="isEnabled"
          @change="toggleAutoRefresh"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
      </div>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Auto-refresh
      </span>
    </label>
    
    <select
      v-if="isEnabled"
      v-model="currentInterval"
      @change="updateInterval"
      class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      <option :value="30000">30 sec</option>
      <option :value="60000">1 min</option>
      <option :value="300000">5 min</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 60000
  }
})

const emit = defineEmits(['update:modelValue', 'update:interval', 'refresh'])

const isEnabled = ref(props.modelValue)
const currentInterval = ref(props.interval)
let timer = null

function toggleAutoRefresh() {
  emit('update:modelValue', isEnabled.value)
  if (isEnabled.value) {
    startTimer()
  } else {
    stopTimer()
  }
}

function updateInterval() {
  emit('update:interval', currentInterval.value)
  if (isEnabled.value) {
    stopTimer()
    startTimer()
  }
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    emit('refresh')
  }, currentInterval.value)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.modelValue, (val) => {
  isEnabled.value = val
  if (!val) stopTimer()
})

watch(() => props.interval, (val) => {
  currentInterval.value = val
  if (isEnabled.value) {
    stopTimer()
    startTimer()
  }
})
</script>
