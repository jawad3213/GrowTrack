import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AutoRefreshToggle from '@/components/ui/AutoRefreshToggle.vue'

describe('AutoRefreshToggle', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('should render the component', () => {
      wrapper = mount(AutoRefreshToggle)
      expect(wrapper.exists()).toBe(true)
    })

    it('should display auto-refresh label', () => {
      wrapper = mount(AutoRefreshToggle)
      expect(wrapper.text()).toContain('Auto-refresh')
    })

    it('should have a checkbox input', () => {
      wrapper = mount(AutoRefreshToggle)
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.exists()).toBe(true)
    })

    it('should not show interval selector when disabled', () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: false }
      })
      const select = wrapper.find('select')
      expect(select.exists()).toBe(false)
    })
  })

  describe('Toggle Functionality', () => {
    it('should show interval selector when enabled', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: true }
      })
      const select = wrapper.find('select')
      expect(select.exists()).toBe(true)
    })

    it('should emit update:modelValue when toggled', async () => {
      wrapper = mount(AutoRefreshToggle)
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('should have default interval options', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: true }
      })
      const select = wrapper.find('select')
      const options = select.findAll('option')
      expect(options.length).toBe(3)
    })
  })

  describe('Interval Selection', () => {
    it('should emit update:interval when interval is changed', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: true }
      })
      const select = wrapper.find('select')
      await select.setValue(30000)
      expect(wrapper.emitted('update:interval')).toBeTruthy()
    })
  })

  describe('Auto Refresh Timer', () => {
    it('should emit update:modelValue when toggled to enabled', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: false }
      })
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.setValue(true)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
    })

    it('should emit update:modelValue when toggled to disabled', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: true }
      })
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.setValue(false)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
    })

    it('should emit update:interval when interval changes', async () => {
      wrapper = mount(AutoRefreshToggle, {
        props: { modelValue: true, interval: 60000 }
      })
      const select = wrapper.find('select')
      await select.setValue(300000)
      expect(wrapper.emitted('update:interval')).toBeTruthy()
      expect(wrapper.emitted('update:interval')[0]).toEqual([300000])
    })
  })
})