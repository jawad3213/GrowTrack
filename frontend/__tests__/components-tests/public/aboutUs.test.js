import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AboutUs from '@/features/public/pages/AboutUs.vue'

vi.mock('@/components/layout/header/UserMenu.vue', () => ({
  default: { template: '<div>UserMenu</div>' }
}))

vi.mock('@/components/layout/header/NotificationMenu.vue', () => ({
  default: { template: '<div>NotificationMenu</div>' }
}))

vi.mock('@/components/layout/header/SearchBar.vue', () => ({
  default: { template: '<div>SearchBar</div>' }
}))

describe('AboutUs', () => {
  let wrapper

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    
    wrapper = mount(AboutUs, {
      global: {
        plugins: [pinia],
        stubs: {
          Header: { template: '<div>Header</div>' }
        }
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('should display main title', () => {
      expect(wrapper.text()).toContain('About GrowTrack')
    })

    it('should display description', () => {
      expect(wrapper.text()).toContain('Empowering Education')
    })

    it('should display What is GrowTrack section', () => {
      expect(wrapper.text()).toContain('What is GrowTrack')
    })

    it('should display stats section', () => {
      expect(wrapper.text()).toContain('User Roles')
    })
  })
})
