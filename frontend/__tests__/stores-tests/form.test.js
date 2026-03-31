import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFormStore } from '@/stores/form'

vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    patch: vi.fn()
  }
}))

vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn((str) => str)
  }
}))

describe('Form Store', () => {
  let store
  let api

  beforeEach(async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    store = useFormStore()
    api = await import('@/services/api')
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('submitForm', () => {
    it('should submit POST request successfully', async () => {
      const mockResponse = { data: { id: 1 } }
      api.default.post.mockResolvedValue(mockResponse)

      await store.submitForm('/api/students', { name: 'John' })

      expect(api.default.post).toHaveBeenCalledWith('/api/students', { name: 'John' })
      expect(store.success).toBe('Submitted successfully')
      expect(store.error).toBe(null)
      expect(store.loading).toBe(false)
    })

    it('should handle API errors', async () => {
      const mockError = {
        response: { data: { message: 'Validation failed' } }
      }
      api.default.post.mockRejectedValue(mockError)

      await store.submitForm('/api/students', { name: '' })

      expect(store.error).toBe('Validation failed')
      expect(store.loading).toBe(false)
    })

    it('should handle field-specific validation errors', async () => {
      const mockError = {
        response: {
          data: {
            errors: [
              { path: 'name', msg: 'Name is required' },
              { path: 'email', msg: 'Invalid email' }
            ]
          }
        }
      }
      api.default.post.mockRejectedValue(mockError)

      await store.submitForm('/api/students', {})

      expect(store.errors).toEqual({ name: 'Name is required', email: 'Invalid email' })
    })

    it('should call onSuccess callback on success', async () => {
      const mockResponse = { data: { id: 1, name: 'John' } }
      api.default.post.mockResolvedValue(mockResponse)
      const onSuccess = vi.fn()

      await store.submitForm('/api/students', { name: 'John' }, onSuccess)

      expect(onSuccess).toHaveBeenCalledWith(mockResponse.data)
    })

    it('should use default error message', async () => {
      const mockError = {}
      api.default.post.mockRejectedValue(mockError)

      await store.submitForm('/api/students', {})

      expect(store.error).toBe("Couldn't submit the form. Please retry again later")
    })
  })

  describe('Update', () => {
    it('should call PATCH request successfully', async () => {
      const mockResponse = { data: { id: 1 } }
      api.default.patch.mockResolvedValue(mockResponse)

      await store.Update('/api/students/1', { name: 'Updated' })

      expect(api.default.patch).toHaveBeenCalledWith('/api/students/1', { name: 'Updated' })
      expect(store.success).toBe('Submitted successfully')
    })

    it('should handle update errors', async () => {
      const mockError = {
        response: { data: { error: 'Update failed' } }
      }
      api.default.patch.mockRejectedValue(mockError)

      await store.Update('/api/students/1', {})

      expect(store.error).toBe('Update failed')
    })
  })

  describe('validateWithSchema', () => {
    it('should return true for valid data', async () => {
      const mockSchema = {
        validate: vi.fn().mockResolvedValue(true)
      }

      const result = await store.validateWithSchema({ name: 'John' }, mockSchema)

      expect(result).toBe(true)
      expect(store.errors).toEqual({})
    })

    it('should return false and set errors for invalid data', async () => {
      const mockError = {
        inner: [
          { path: 'name', message: 'Name is required' },
          { path: 'email', message: 'Email is required' }
        ]
      }
      const mockSchema = {
        validate: vi.fn().mockRejectedValue(mockError)
      }

      const result = await store.validateWithSchema({}, mockSchema)

      expect(result).toBe(false)
      expect(store.errors).toEqual({
        name: 'Name is required',
        email: 'Email is required'
      })
    })
  })

  describe('sanitizeInputs', () => {
    it('should sanitize string values', () => {
      const input = { name: '<script>alert("xss")</script>' }
      const result = store.sanitizeInputs(input)
      expect(result.name).toBe('<script>alert("xss")</script>')
    })

    it('should preserve non-string values', () => {
      const input = { age: 25, active: true }
      const result = store.sanitizeInputs(input)
      expect(result.age).toBe(25)
      expect(result.active).toBe(true)
    })

    it('should handle empty object', () => {
      const result = store.sanitizeInputs({})
      expect(result).toEqual({})
    })
  })

  describe('clearStatus', () => {
    it('should reset all form states', () => {
      store.loading = true
      store.error = 'Some error'
      store.success = 'Success'
      store.errors = { name: 'Error' }

      store.clearStatus()

      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
      expect(store.success).toBe(null)
      expect(store.errors).toEqual({})
    })
  })
})
