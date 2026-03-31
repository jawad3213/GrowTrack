<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
    :class="[
      hoverable && 'hover:shadow-xl hover:shadow-gray-100/50 dark:hover:shadow-gray-900/50 hover:-translate-y-0.5',
      padding && 'p-6',
      customClass
    ]"
  >
    <!-- Header -->
    <div
      v-if="title || $slots.header || actions"
      class="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-700"
    >
      <div class="flex-1">
        <slot name="header">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div v-if="actions" class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Body -->
    <div :class="[noPadding ? '' : '']">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      class="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: Boolean,
    default: true
  },
  noPadding: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
