<template>
  <div
    class="flex flex-col items-center justify-center text-center py-16 px-4"
  >
    <div class="text-6xl mb-4">
      <slot name="icon">🔍</slot>
    </div>
    
    <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
      {{ title }}
    </h3>
    
    <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
      {{ message }}
    </p>
    
    <slot name="action">
      <button
        v-if="actionText"
        @click="$emit('action')"
        class="bg-[#F97316] hover:bg-[#FA9148] text-white font-bold
               py-3 px-8 rounded-md
               transform hover:scale-105 hover:shadow-lg
               transition-all duration-200"
      >
        {{ actionText }}
      </button>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No data found'
  },
  message: {
    type: String,
    default: 'There is no data to display.'
  },
  actionText: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>
