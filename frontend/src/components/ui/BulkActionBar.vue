<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
    <div class="bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <svg class="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span class="text-white font-medium">{{ selectedCount }} selected</span>
      </div>

      <div class="h-6 w-px bg-gray-700"></div>

      <div class="flex items-center gap-2">
        <button
          @click="$emit('delete')"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span class="text-sm font-medium">Delete</span>
        </button>

        <button
          @click="$emit('clear')"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span class="text-sm font-medium">Clear</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedCount: {
    type: Number,
    required: true
  }
})

defineEmits(['delete', 'clear'])
</script>
