<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/50"
    :class="[hoverable && 'cursor-pointer']"
  >
    <!-- Background Icon -->
    <div
      class="absolute -right-4 -bottom-4 opacity-10 transform"
      :class="[iconBgClass]"
    >
      <component :is="icon" class="w-24 h-24" />
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div
          class="p-3 rounded-xl"
          :class="[iconBgClass, 'bg-opacity-10']"
        >
          <component
            :is="icon"
            class="w-6 h-6"
            :class="iconColorClass"
          />
        </div>
        <span
          v-if="trend"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="trendClasses"
        >
          <svg
            class="w-3 h-3 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              v-if="trend > 0"
              fill-rule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
            <path
              v-else-if="trend < 0"
              fill-rule="evenodd"
              d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          {{ Math.abs(trend) }}%
        </span>
      </div>

      <!-- Value -->
      <div class="mb-1">
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {{ formattedValue }}
        </h3>
      </div>

      <!-- Label -->
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
        {{ label }}
      </p>

      <!-- Subtitle -->
      <p v-if="subtitle" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  trend: {
    type: Number,
    default: null
  },
  subtitle: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'success', 'warning', 'danger', 'info'].includes(v)
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: 'number'
  }
})

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(props.value)
  }
  if (props.format === 'percent') {
    return `${props.value}%`
  }
  if (typeof props.value === 'number' && props.value >= 1000) {
    return new Intl.NumberFormat('en-US').format(props.value)
  }
  return props.value
})

const colorClasses = {
  primary: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    icon: 'text-purple-600 dark:text-purple-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  success: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    icon: 'text-emerald-600 dark:text-emerald-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  warning: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    icon: 'text-amber-600 dark:text-amber-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  danger: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    icon: 'text-red-600 dark:text-red-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    icon: 'text-blue-600 dark:text-blue-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  secondary: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    icon: 'text-purple-600 dark:text-purple-400',
    trendUp: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    trendDown: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  }
}

const iconBgClass = computed(() => colorClasses[props.color]?.bg || colorClasses.primary.bg)
const iconColorClass = computed(() => colorClasses[props.color]?.icon || colorClasses.primary.icon)

const trendClasses = computed(() => {
  if (!props.trend) return ''
  const color = colorClasses[props.color] || colorClasses.primary
  return props.trend > 0 ? color.trendUp : color.trendDown
})
</script>
