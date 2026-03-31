<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Blur Backdrop -->
        <div
          class="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          @click="closeOnBackdrop && close()"
        ></div>

        <!-- Modal Content -->
        <div
          ref="modalRef"
          class="relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          :class="[sizeClasses, customClass]"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between px-6 py-4 border-b"
            :class="headerBorderClass"
          >
            <slot name="header">
              <div class="flex items-center gap-3">
                <div 
                  v-if="showIcon"
                  class="w-10 h-10 rounded-xl flex items-center justify-center"
                  :class="iconBgClass"
                >
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold" :class="titleClass">
                  {{ title }}
                </h3>
              </div>
            </slot>
            <button
              v-if="showClose"
              @click="close"
              class="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 max-h-[70vh] overflow-y-auto">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t bg-gray-50 dark:bg-gray-900/50"
            :class="footerBorderClass"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'student', 'professor', 'coach', 'supervisor', 'skill', 'signal', 'danger'].includes(value)
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const themeConfig = {
  default: {
    headerBorder: 'border-gray-100 dark:border-gray-700',
    footerBorder: 'border-gray-100 dark:border-gray-700',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-violet-500 to-indigo-600',
    iconPath: 'M12 4v16m8-8H4'
  },
  student: {
    headerBorder: 'border-violet-100 dark:border-violet-800/50',
    footerBorder: 'border-violet-100 dark:border-violet-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
  },
  professor: {
    headerBorder: 'border-blue-100 dark:border-blue-800/50',
    footerBorder: 'border-blue-100 dark:border-blue-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  coach: {
    headerBorder: 'border-rose-100 dark:border-rose-800/50',
    footerBorder: 'border-rose-100 dark:border-rose-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
  },
  supervisor: {
    headerBorder: 'border-purple-100 dark:border-purple-800/50',
    footerBorder: 'border-purple-100 dark:border-purple-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  skill: {
    headerBorder: 'border-emerald-100 dark:border-emerald-800/50',
    footerBorder: 'border-emerald-100 dark:border-emerald-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  signal: {
    headerBorder: 'border-amber-100 dark:border-amber-800/50',
    footerBorder: 'border-amber-100 dark:border-amber-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  danger: {
    headerBorder: 'border-red-100 dark:border-red-800/50',
    footerBorder: 'border-red-100 dark:border-red-800/50',
    title: 'text-gray-900 dark:text-white',
    iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  }
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl'
  }
  return sizes[props.size]
})

const headerBorderClass = computed(() => themeConfig[props.theme]?.headerBorder || themeConfig.default.headerBorder)
const footerBorderClass = computed(() => themeConfig[props.theme]?.footerBorder || themeConfig.default.footerBorder)
const titleClass = computed(() => themeConfig[props.theme]?.title || themeConfig.default.title)
const iconBgClass = computed(() => themeConfig[props.theme]?.iconBg || themeConfig.default.iconBg)
const iconPath = computed(() => themeConfig[props.theme]?.iconPath || themeConfig.default.iconPath)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
