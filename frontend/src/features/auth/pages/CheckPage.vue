<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 px-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-10 text-center animate-fade-in">

      <!-- Animated check icon -->
      <div class="flex justify-center mb-6">
        <div class="relative">
          <div class="bg-green-100 rounded-full p-5">
            <svg class="w-12 h-12 text-green-500 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <!-- Pulse ring -->
          <span class="absolute inset-0 rounded-full bg-green-200 opacity-40 animate-ping"></span>
        </div>
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
      <p class="text-gray-500 text-sm leading-relaxed mb-2">
        We've sent a password reset link to your email address.
      </p>
      <p class="text-gray-400 text-xs mb-8">
        Didn't receive it? Check your spam folder or wait a few minutes.
      </p>

      <!-- Actions -->
      <div class="space-y-3">
        <button
          @click="router.push('/Login')"
          class="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02]"
        >
          Back to Login
        </button>
        <button
          @click="router.push('/forgotpass')"
          class="w-full py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Resend email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.5s ease-out both; }

@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both; }
</style>
