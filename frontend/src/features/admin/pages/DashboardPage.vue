<template>
  <admin-layout>
  
  <div class="flex items-center justify-between mb-7">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">
        Welcome to Your Admin Dashboard <span class="uppercase">{{username}}</span>
      </h1>
      <p class="text-xl font-medium text-gray-500 mt-1">
        Here's what's happening with your Platform this month
      </p>
    </div>
    <AutoRefreshToggle
      v-model="autoRefreshEnabled"
      :interval="refreshInterval"
      @refresh="refreshDashboard"
    />
  </div>

  <div class="mb-20 grid grid-cols-12 gap-4 md:gap-6">
  <!-- Left column: ecommerce-metrics + monthly-sale -->
  <div class="col-span-12 xl:col-span-7 space-y-15">
    <ecommerce-metrics />
    <monthly-sale />
  </div>

  <!-- Right column: monthly-target -->
  <div class="col-span-12 xl:col-span-5 space-y-15">
    <monthly-target />
  </div>
  </div>
  

  <div class="mb-20 grid grid-cols-12 gap-4 md:gap-6">
  <!-- Left column: 7/12 -->
  <div class="col-span-12 xl:col-span-7 space-y-15">
    <evaluation-source />
  </div>

  <!-- Right column: 5/12 -->
  <div class="col-span-12 xl:col-span-5 space-y-15">
    <user-distrubution />
  </div>
  </div>



</admin-layout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import AutoRefreshToggle from '@/components/ui/AutoRefreshToggle.vue'
import EcommerceMetrics from '@/components/charts/EcommerceMetrics.vue'
import MonthlyTarget from '@/components/charts/MonthlyTarget.vue'
import MonthlySale from '@/components/charts/MonthlySale.vue'
import EvaluationSource from '@/components/charts/EvaluationSource.vue'
import UserDistrubution from '@/components/charts/UserDistrubution.vue'
import { onMounted, ref  } from 'vue'

const username = ref('') 
const autoRefreshEnabled = ref(false)
const refreshInterval = ref(60000)

function refreshDashboard() {
  window.location.reload()
}

onMounted(() => {
  username.value = localStorage.getItem('username') || 'Nom inconnu'
})


</script>
