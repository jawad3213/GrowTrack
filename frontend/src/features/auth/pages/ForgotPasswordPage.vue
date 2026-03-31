<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 px-4 font-inter">
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 sm:p-10">

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-purple-100 rounded-full p-4">
          <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Forgot your password?</h1>
        <p class="text-gray-500 text-sm leading-relaxed">
          No worries! Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <!-- Success state -->
      <transition name="fade">
        <div v-if="sent" class="text-center py-4">
          <div class="flex justify-center mb-4">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 font-medium mb-1">Email sent!</p>
          <p class="text-gray-500 text-sm mb-6">Check your inbox for the reset link.</p>
          <router-link to="/Login" class="text-sm text-purple-600 hover:underline">← Back to Login</router-link>
        </div>
      </transition>

      <!-- Form -->
      <form v-if="!sent" @submit.prevent="forgot" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
          <input
            v-model="emailres"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none transition"
            required
          />
          <transition name="fade">
            <p v-if="store.errorMsg" class="text-red-600 text-xs mt-1.5 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ store.errorMsg }}
            </p>
          </transition>
        </div>

        <button
          type="submit"
          :disabled="store.load"
          class="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          <svg v-if="store.load" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
            <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>{{ store.load ? 'Sending...' : 'Send Reset Link' }}</span>
        </button>

        <router-link to="/Login" class="block text-center text-sm text-purple-600 hover:underline mt-2">
          ← Back to Login
        </router-link>
      </form>

    </div>
  </div>
</template>
  



<script setup>
import {ref , onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useFormStore } from '@/stores/form';

const store = useAuthStore();
const formStore = useFormStore()
const emailres = ref('');
const router = useRouter();
const sent = ref(false);

async function forgot() {
  try {
    const sanitizedemail = formStore.sanitizeInputs({email: emailres.value});
    await store.forgotPassword(sanitizedemail.email);
    if(store.errorMsg === null){
        formStore.clearStatus();
        sent.value = true;
    }
  } catch (error) {
    console.error('An Error occured while trying to send the email, Please retry :', error)
  }
};

onMounted(() => {
    store.Clearstatus();
});

</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
