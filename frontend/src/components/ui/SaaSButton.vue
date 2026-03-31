<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to"
    :type="!to ? type : undefined"
    :disabled="disabled || loading"
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>

    <!-- Icon Left -->
    <component
      v-if="iconLeft && !loading"
      :is="iconLeft"
      class="w-4 h-4"
      :class="[iconMargin]"
    />

    <!-- Slot -->
    <slot></slot>

    <!-- Icon Right -->
    <component
      v-if="iconRight && !loading"
      :is="iconRight"
      class="w-4 h-4"
      :class="[iconMargin]"
    />
  </component>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost', 'outline', 'student', 'professor', 'coach', 'supervisor', 'skill', 'signal'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  to: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  iconLeft: {
    type: Object,
    default: null
  },
  iconRight: {
    type: Object,
    default: null
  },
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const baseClasses = `
  inline-flex items-center justify-center font-semibold rounded-xl
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
`

const variantClasses = {
  primary: `
    bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700
    text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
    focus:ring-violet-500
  `,
  secondary: `
    bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
    text-gray-900 dark:text-white
    focus:ring-gray-500
  `,
  success: `
    bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600
    text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
    focus:ring-emerald-500
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600
    text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40
    focus:ring-red-500
  `,
  warning: `
    bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600
    text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40
    focus:ring-amber-500
  `,
  ghost: `
    bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
    text-gray-700 dark:text-gray-300
    focus:ring-gray-500
  `,
  outline: `
    bg-transparent border-2 border-violet-600 text-violet-600 hover:bg-violet-50
    dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-900/20
    focus:ring-violet-500
  `,
  student: `
    bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700
    text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
    focus:ring-violet-500
  `,
  professor: `
    bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
    text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
    focus:ring-blue-500
  `,
  coach: `
    bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700
    text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40
    focus:ring-rose-500
  `,
  supervisor: `
    bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700
    text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40
    focus:ring-purple-500
  `,
  skill: `
    bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700
    text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
    focus:ring-emerald-500
  `,
  signal: `
    bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700
    text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40
    focus:ring-amber-500
  `
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base'
}

const iconMargin = 'ml-0'

const handleClick = (e) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>
