import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AdminDashboardPage from '@/features/admin/pages/DashboardPage.vue'

vi.mock('@/components/charts/EcommerceMetrics.vue', () => ({
  default: { 
    template: '<div>EcommerceMetrics</div>',
    name: 'EcommerceMetrics'
  }
}))

vi.mock('@/components/charts/MonthlyTarget.vue', () => ({
  default: { 
    template: '<div>MonthlyTarget</div>',
    name: 'MonthlyTarget'
  }
}))

vi.mock('@/components/charts/MonthlySale.vue', () => ({
  default: { 
    template: '<div>MonthlySale</div>',
    name: 'MonthlySale'
  }
}))

vi.mock('@/components/charts/EvaluationSource.vue', () => ({
  default: { 
    template: '<div>EvaluationSource</div>',
    name: 'EvaluationSource'
  }
}))

vi.mock('@/components/charts/UserDistrubution.vue', () => ({
  default: { 
    template: '<div>UserDistrubution</div>',
    name: 'UserDistrubution'
  }
}))

vi.mock('@/components/ui/AutoRefreshToggle.vue', () => ({
  default: { 
    template: '<div><button @click="$emit(\'refresh\')">Refresh</button></div>',
    props: ['modelValue', 'interval'],
    emits: ['update:modelValue', 'refresh'],
    name: 'AutoRefreshToggle'
  }
}))

vi.mock('@/components/layout/AdminLayout.vue', () => ({
  default: { 
    template: '<div><slot /></div>',
    props: []
  }
}))

describe('AdminDashboardPage', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    
    const pinia = createPinia()
    setActivePinia(pinia)
    
    wrapper = mount(AdminDashboardPage, {
      global: {
        plugins: [pinia]
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('should render the dashboard page', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('should display welcome message', () => {
      expect(wrapper.text()).toContain('Welcome to Your Admin Dashboard')
    })

    it('should display subtitle text', () => {
      expect(wrapper.text()).toContain("Here's what's happening with your Platform this month")
    })
  })

  describe('Auto Refresh Toggle', () => {
    it('should have auto refresh toggle component', () => {
      const toggle = wrapper.findComponent({ name: 'AutoRefreshToggle' })
      expect(toggle.exists()).toBe(true)
    })

    it('should emit refresh when toggle is clicked', async () => {
      const toggle = wrapper.findComponent({ name: 'AutoRefreshToggle' })
      await toggle.trigger('refresh')
    })
  })

  describe('Chart Components', () => {
    it('should render ecommerce metrics', () => {
      const metrics = wrapper.findComponent({ name: 'EcommerceMetrics' })
      expect(metrics.exists()).toBe(true)
    })

    it('should render monthly target', () => {
      const target = wrapper.findComponent({ name: 'MonthlyTarget' })
      expect(target.exists()).toBe(true)
    })

    it('should render monthly sale', () => {
      const sale = wrapper.findComponent({ name: 'MonthlySale' })
      expect(sale.exists()).toBe(true)
    })

    it('should render evaluation source', () => {
      const source = wrapper.findComponent({ name: 'EvaluationSource' })
      expect(source.exists()).toBe(true)
    })

    it('should render user distribution', () => {
      const distribution = wrapper.findComponent({ name: 'UserDistrubution' })
      expect(distribution.exists()).toBe(true)
    })
  })

  describe('Layout Structure', () => {
    it('should have grid layout structure', () => {
      const gridContainer = wrapper.find('.grid')
      expect(gridContainer.exists()).toBe(true)
    })
  })
})