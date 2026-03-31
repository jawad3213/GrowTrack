<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <app-sidebar />
    
    <div
      class="transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[280px]' : 'lg:ml-[88px]']"
    >
      <app-header />
      
      <main class="p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
    
    <ToastContainer />
  </div>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isExpanded, isHovered } = useSidebar()
</script>
