<template>
  <div class="relative">
    <input
      v-model="searchValue"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
             rounded-lg bg-white dark:bg-gray-800 
             text-gray-900 dark:text-gray-100
             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
             placeholder-gray-400 dark:placeholder-gray-500
             transition-all duration-200"
      @input="handleInput"
    />
    <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <button
      v-if="searchValue"
      @click="clearSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  debounceMs: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const searchValue = ref(props.modelValue)
let debounceTimeout = null

watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})

function handleInput() {
  emit('update:modelValue', searchValue.value)
  
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  
  debounceTimeout = setTimeout(() => {
    emit('search', searchValue.value)
  }, props.debounceMs)
}

function clearSearch() {
  searchValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>
