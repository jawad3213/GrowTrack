import { ref, computed } from 'vue'

export function useSort(items, defaultSort = { key: '', order: 'asc' }) {
  const sortKey = ref(defaultSort.key)
  const sortOrder = ref(defaultSort.order)
  
  const sortedItems = computed(() => {
    if (!sortKey.value) {
      return items.value
    }
    
    return [...items.value].sort((a, b) => {
      let aVal = getNestedValue(a, sortKey.value)
      let bVal = getNestedValue(b, sortKey.value)
      
      if (aVal === null || aVal === undefined) aVal = ''
      if (bVal === null || bVal === undefined) bVal = ''
      
      // Handle string comparison
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      
      // Handle date comparison
      if (aVal instanceof Date && bVal instanceof Date) {
        aVal = aVal.getTime()
        bVal = bVal.getTime()
      } else if (isDateString(aVal) && isDateString(bVal)) {
        aVal = new Date(aVal).getTime()
        bVal = new Date(bVal).getTime()
      }
      
      let comparison = 0
      if (aVal < bVal) comparison = -1
      if (aVal > bVal) comparison = 1
      
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })
  
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }
  
  function isDateString(value) {
    if (typeof value !== 'string') return false
    const datePattern = /^\d{4}-\d{2}-\d{2}/
    return datePattern.test(value)
  }
  
  function setSort(key, order = null) {
    if (sortKey.value === key && order === null) {
      // Toggle order if same key
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = order || 'asc'
    }
  }
  
  function clearSort() {
    sortKey.value = ''
    sortOrder.value = 'asc'
  }
  
  function sortBy(key) {
    setSort(key)
  }
  
  return {
    sortKey,
    sortOrder,
    sortedItems,
    setSort,
    clearSort,
    sortBy
  }
}
