import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}))

describe('Auth Store', () => {
  let store
  let apiModule

  beforeEach(async () => {
    vi.clearAllMocks()
    localStorage.clear()
    sessionStorage.clear()
    
    const pinia = createPinia()
    setActivePinia(pinia)
    
    const { useAuthStore } = await import('@/stores/auth')
    store = useAuthStore()
    
    apiModule = await import('@/services/api')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Login', () => {
    it('should authenticate user with valid credentials', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, email: 'test@example.com', full_name: 'Test User' },
          role: 'student',
          access_token: 'mock-token'
        }
      }
      apiModule.default.post.mockResolvedValue(mockResponse)
      localStorage.setItem('cookiesAccepted', 'true')

      await store.Login('test@example.com', 'password123', false)

      expect(apiModule.default.post).toHaveBeenCalled()
      expect(store.user).toEqual(mockResponse.data.user)
      expect(store.role).toBe('student')
      expect(store.error).toBe(null)
      expect(store.loading).toBe(false)
    })

    it('should handle invalid credentials error', async () => {
      const mockError = {
        response: {
          data: { message: 'Invalid credentials' }
        }
      }
      apiModule.default.post.mockRejectedValue(mockError)

      await store.Login('wrong@example.com', 'wrongpass', false)

      expect(store.user).toBe(null)
      expect(store.error).toBe('Invalid credentials')
      expect(store.loading).toBe(false)
    })

    it('should handle generic error message', async () => {
      const mockError = {
        response: {}
      }
      apiModule.default.post.mockRejectedValue(mockError)

      await store.Login('test@example.com', 'password', false)

      expect(store.error).toBe('Email or password incorrect')
    })
  })

  describe('forgotPassword', () => {
    it('should call forgot password API', async () => {
      apiModule.default.post.mockResolvedValue({})

      await store.forgotPassword('test@example.com')

      expect(apiModule.default.post).toHaveBeenCalledWith(
        '/api/auth/reset-password',
        { email: 'test@example.com' }
      )
      expect(store.error).toBe(null)
      expect(store.loading).toBe(false)
    })

    it('should handle API error', async () => {
      const mockError = {
        response: { data: { message: 'Email not found' } }
      }
      apiModule.default.post.mockRejectedValue(mockError)

      await store.forgotPassword('notfound@example.com')

      expect(store.error).toBe('Email not found')
      expect(store.loading).toBe(false)
    })
  })

  describe('resetPassword', () => {
    it('should call reset password API', async () => {
      apiModule.default.post.mockResolvedValue({})

      await store.resetPassword('newpassword', 'reset-token')

      expect(apiModule.default.post).toHaveBeenCalledWith(
        '/api/resetpass?token=reset-token',
        { password: 'newpassword' }
      )
      expect(store.error).toBe(null)
    })
  })

  describe('checkAuth', () => {
    it('should return true when user is authenticated', async () => {
      const mockResponse = { status: 200, data: { role: 'student', id: 1 } }
      apiModule.default.get.mockResolvedValue(mockResponse)

      const result = await store.checkAuth()

      expect(result).toBe(true)
      expect(store.role).toBe('student')
      expect(store.loading).toBe(false)
    })

    it('should return false when user is not authenticated', async () => {
      apiModule.default.get.mockRejectedValue({})

      const result = await store.checkAuth()

      expect(result).toBe(false)
      expect(store.loading).toBe(false)
    })
  })

  describe('logout', () => {
    it('should clear auth state', async () => {
      store.user = { id: 1 }
      apiModule.default.post.mockResolvedValue({})
      localStorage.setItem('remember_me', 'true')

      await store.logout()

      expect(store.user).toBe(null)
    })
  })

  describe('Clearstatus', () => {
    it('should reset error and loading states', () => {
      store.error = 'Some error'
      store.loading = true

      store.Clearstatus()

      expect(store.error).toBe(null)
      expect(store.loading).toBe(false)
    })
  })

  describe('Computed Getters', () => {
    it('isAuthenticated should return true when user exists', () => {
      store.user = { id: 1 }
      expect(store.isAuthenticated).toBe(true)
    })

    it('isAuthenticated should return false when user is null', () => {
      store.user = null
      expect(store.isAuthenticated).toBe(false)
    })
  })
})
