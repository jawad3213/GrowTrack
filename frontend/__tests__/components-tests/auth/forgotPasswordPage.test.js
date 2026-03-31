import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const mockPush = vi.fn()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/Login', name: 'Login' },
    { path: '/forgotpass', name: 'ForgotPassword' }
  ]
})
router.push = mockPush

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => router
  }
})

const mockAuthStore = {
  forgotPassword: vi.fn().mockResolvedValue({}),
  Clearstatus: vi.fn(),
  errorMsg: null,
  load: false
}

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => mockAuthStore
}))

describe('ForgotPasswordPage', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthStore.errorMsg = null
    
    const pinia = createPinia()
    setActivePinia(pinia)
    
    wrapper = mount(ForgotPasswordPage, {
      global: {
        plugins: [pinia, router],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('should display email input field', () => {
      const emailInput = wrapper.find('input[type="email"]')
      expect(emailInput.exists()).toBe(true)
    })

    it('should display submit button', () => {
      const button = wrapper.find('button[type="submit"]')
      expect(button.exists()).toBe(true)
    })

    it('should display title', () => {
      expect(wrapper.text()).toContain('Forgot your password?')
    })
  })

  describe('Form Interaction', () => {
    it('should update email value when user types', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      await emailInput.setValue('test@example.com')
      expect(emailInput.element.value).toBe('test@example.com')
    })
  })

  describe('Form Submission', () => {
    it('should call forgotPassword on form submit', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      const form = wrapper.find('form')
      
      await emailInput.setValue('test@example.com')
      await form.trigger('submit.prevent')

      expect(mockAuthStore.forgotPassword).toHaveBeenCalledWith('test@example.com')
    })

    it('should show success state after submit', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      const form = wrapper.find('form')
      
      await emailInput.setValue('test@example.com')
      await form.trigger('submit.prevent')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Email sent')
    })
  })

  describe('Error Display', () => {
    it('should call Clearstatus on mount', async () => {
      expect(mockAuthStore.Clearstatus).toHaveBeenCalled()
    })
  })
})
