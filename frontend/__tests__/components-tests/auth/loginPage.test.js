import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginPage from '@/features/auth/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const mockPush = vi.fn()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashstud', name: 'StudentDashboard' },
    { path: '/dashSupervisor', name: 'SupervisorDashboard' },
    { path: '/DashboardProf', name: 'ProfessorDashboard' },
    { path: '/Login', name: 'Login' }
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
  Login: vi.fn().mockResolvedValue({}),
  checkAuth: vi.fn().mockResolvedValue(false),
  Clearstatus: vi.fn(),
  errorMsg: null,
  role: null,
  isAuthenticated: false,
  get Role() { return this.role }
}

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => mockAuthStore
}))

describe('LoginPage', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthStore.errorMsg = null
    mockAuthStore.role = null
    mockAuthStore.isAuthenticated = false
    
    const pinia = createPinia()
    setActivePinia(pinia)
    
    wrapper = mount(LoginPage, {
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

    it('should display password input field', () => {
      const passwordInput = wrapper.find('input[type="password"]')
      expect(passwordInput.exists()).toBe(true)
    })

    it('should display submit button', () => {
      const button = wrapper.find('button[type="submit"]')
      expect(button.exists()).toBe(true)
    })

    it('should display remember me checkbox', () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.exists()).toBe(true)
    })
  })

  describe('Form Interaction', () => {
    it('should update email value when user types', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      await emailInput.setValue('test@example.com')
      expect(emailInput.element.value).toBe('test@example.com')
    })

    it('should update password value when user types', async () => {
      const passwordInput = wrapper.find('input[type="password"]')
      await passwordInput.setValue('password123')
      expect(passwordInput.element.value).toBe('password123')
    })

    it('should toggle password visibility', async () => {
      const passwordInput = wrapper.find('input[type="password"]')
      expect(passwordInput.exists()).toBe(true)

      const toggleButton = wrapper.find('button[type="button"]')
      await toggleButton.trigger('click')

      const updatedInput = wrapper.find('input[type="text"]')
      expect(updatedInput.exists()).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('should call auth store login on form submit', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      const passwordInput = wrapper.find('input[type="password"]')
      const form = wrapper.find('form')
      
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('password123')
      await form.trigger('submit.prevent')

      expect(mockAuthStore.Login).toHaveBeenCalled()
    })
  })

  describe('Component Lifecycle', () => {
    it('should call Clearstatus on mount', () => {
      expect(mockAuthStore.Clearstatus).toHaveBeenCalled()
    })
  })
})
