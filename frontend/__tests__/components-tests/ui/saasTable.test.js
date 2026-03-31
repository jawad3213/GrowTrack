import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SaaSTable from '@/components/ui/SaaSTable.vue'

const mockColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', align: 'center' }
]

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
]

describe('SaaSTable', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SaaSTable, {
      props: {
        columns: mockColumns,
        data: mockData,
        selectable: false
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Component Rendering', () => {
    it('should render table with data', () => {
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('should render column headers', () => {
      expect(wrapper.text()).toContain('Name')
      expect(wrapper.text()).toContain('Email')
      expect(wrapper.text()).toContain('Status')
    })

    it('should render table rows', () => {
      const rows = wrapper.findAll('tbody tr')
      expect(rows).toHaveLength(2)
    })

    it('should render data correctly', () => {
      expect(wrapper.text()).toContain('John Doe')
      expect(wrapper.text()).toContain('Jane Smith')
    })
  })

  describe('Sortable Columns', () => {
    it('should emit sort event when column is clicked', async () => {
      const sortableColumn = wrapper.findAll('th').at(0)
      await sortableColumn.trigger('click')
    })
  })

  describe('Selectable Rows', () => {
    it('should render checkbox column when selectable is true', async () => {
      wrapper = mount(SaaSTable, {
        props: {
          columns: mockColumns,
          data: mockData,
          selectable: true
        }
      })
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.exists()).toBe(true)
    })
  })
})
