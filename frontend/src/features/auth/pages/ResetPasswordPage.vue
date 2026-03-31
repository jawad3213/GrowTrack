<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 px-4">
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 sm:p-10">

      <!-- Loading state -->
      <div v-if="store.load" class="flex flex-col items-center justify-center py-12">
        <svg class="animate-spin h-10 w-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
          <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p class="text-gray-500 text-sm">Verifying your link...</p>
      </div>

      <!-- Invalid token state -->
      <div v-else-if="!store.validtoken" class="text-center">
        <div class="flex justify-center mb-5">
          <div class="bg-red-100 rounded-full p-4">
            <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Link Expired or Invalid</h1>
        <p class="text-gray-500 text-sm mb-6">This password reset link is no longer valid. Please request a new one.</p>
        <router-link
          to="/forgotpass"
          class="inline-block w-full py-3 text-center font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 transition-all duration-300"
        >
          Request New Link
        </router-link>
        <router-link to="/Login" class="block mt-4 text-sm text-purple-600 hover:underline text-center">
          ← Back to Login
        </router-link>
      </div>

      <!-- Valid token: reset form -->
      <div v-else>
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div class="bg-purple-100 rounded-full p-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-1">Create New Password</h1>
          <p class="text-gray-500 text-sm">Your new password must be at least 8 characters and include an uppercase letter and a number.</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="resetPass" class="space-y-5">
          <!-- New Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <div class="relative">
              <input
                v-model="newpassword"
                :type="showNew ? 'text' : 'password'"
                placeholder="At least 8 characters"
                class="w-full py-3 px-4 pr-11 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                required
              />
              <button type="button" @click="showNew = !showNew" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                <svg v-if="!showNew" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="formStore.errors.newpassword" class="text-red-500 text-xs mt-1">{{ formStore.errors.newpassword }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <div class="relative">
              <input
                v-model="confirmpasssword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="Repeat your password"
                class="w-full py-3 px-4 pr-11 border border-gray-300 rounded-lg text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                required
              />
              <button type="button" @click="showConfirm = !showConfirm" class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <transition name="fade">
            <p v-if="store.errorMsg" class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {{ store.errorMsg }}
            </p>
          </transition>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="store.load"
            class="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            <svg v-if="store.load" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
              <path fill="currentColor" class="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>{{ store.load ? 'Resetting...' : 'Reset Password' }}</span>
          </button>

          <router-link to="/Login" class="block text-sm text-purple-600 hover:underline text-center mt-2">
            ← Back to Login
          </router-link>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFormStore } from '@/stores/form'
import * as yup from 'yup'

  
const disallowedPasswords = [
  "password",
  "12345678",
  "qwertyui",
  "abcdefgh",
  "87654321"
];

const passwordSchema = yup.object({
  newpassword: yup
  .string()
  .required('The password is required')
  .min(8, 'The password must have at least 8 characters')
  .max(64, 'The password must be at most 64 characters')
  .test(
    'not-in-disallowed',
    'The password is weak.',
    value => !disallowedPasswords.includes(value?.toLowerCase())
  )
  .matches(
    /^(?=.*[A-Z])(?=.*\d).+$/,
    'The password must contain at least one uppercase letter and one number.'
  )
})

const store = useAuthStore()
const formStore = useFormStore()
const newpassword = ref('')
const confirmpasssword = ref('')
const showNew = ref(false)
const showConfirm = ref(false)
const router = useRouter()
const route = useRoute() //pour recupérer  de l'url 
const token = route.query.token || ''; //pour recupérer le token de de l'url 

async function checktoken(token){
  try {
    await store.CheckResetToken(token);
  } catch (error) {
    console.log('Invalide link')
  }
}checktoken(token);

function match(){
  if(newpassword.value !== confirmpasssword.value){
  store.error = 'Passwords do not match';
  confirmpasssword.value = '';
  return false;
}return true;
}



async function resetPass() {
  try {
    const valid = await formStore.validateWithSchema({newpassword: newpassword.value}, passwordSchema);
    if(valid){
    if (match()) {
    await store.resetPassword(newpassword.value , token);
    if (!store.errorMsg) {
      formStore.clearStatus();
      router.push('/check');
    }
  }
}
  } catch (error) {
    console.error('An Error occured while submiting the password, Please Try again', error)
  }
  
}
onMounted(() => {
    store.checkAuth()
    if(store.isAuthenticated){ //à répeter
        router.push('/');
    }
    store.Clearstatus();
});


</script>
