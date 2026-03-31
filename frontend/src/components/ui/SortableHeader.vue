<template>
  <th
    class="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
    @click="handleClick"
  >
    <div class="flex items-center gap-2">
      <span>{{ label }}</span>
      <span class="flex flex-col">
        <svg
          v-if="sortKey === currentSort && sortOrder === 'asc'"
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 text-purple-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <svg
          v-else-if="sortKey === currentSort && sortOrder === 'desc'"
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 text-purple-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 text-gray-300 dark:text-gray-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </span>
    </div>
  </th>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  sortKey: {
    type: String,
    default: ''
  },
  currentSort: {
    type: String,
    default: ''
  },
  currentOrder: {
    type: String,
    default: 'asc'
  }
})

const emit = defineEmits(['sort'])

function handleClick() {
  let newOrder = 'asc'
  
  if (props.currentSort === props.sortKey) {
    newOrder = props.currentOrder === 'asc' ? 'desc' : 'asc'
  }
  
  emit('sort', { key: props.sortKey, order: newOrder })
}
</script>
