<template>
  <nav class="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5">
      <!-- Home Link -->
      <li>
        <router-link
          to="/dashboard"
          class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </router-link>
      </li>

      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <!-- Separator -->
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>

        <!-- Current Item -->
        <component
          :is="item.to ? 'router-link' : 'span'"
          :to="item.to"
          :class="[
            item.to
              ? 'text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors'
              : 'text-gray-900 dark:text-white font-medium',
            'flex items-center gap-1.5'
          ]"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            class="w-4 h-4"
          />
          {{ item.label }}
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
