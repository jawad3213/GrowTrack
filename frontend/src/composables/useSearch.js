import { ref, computed, watch } from 'vue'

export function useSearch(items, searchFields = [], debounceMs = 300) {
  const searchQuery = ref('')
  const isSearching = ref(false)
  let debounceTimeout = null
  
  const filteredItems = computed(() => {
    if (!searchQuery.value.trim()) {
      return items.value
    }
    
    const query = searchQuery.value.toLowerCase().trim()
    
    return items.value.filter(item => {
      return searchFields.some(field => {
        const value = getNestedValue(item, field)
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(query)
      })
    })
  })
  
  function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }
  
  function setSearch(query) {
    searchQuery.value = query
  }
  
  function clearSearch() {
    searchQuery.value = ''
  }
  
  function search(query) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    
    isSearching.value = true
    
    debounceTimeout = setTimeout(() => {
      searchQuery.value = query
      isSearching.value = false
    }, debounceMs)
  }
  
  watch(searchQuery, () => {
    // Reset search state when query changes
  })
  
  return {
    searchQuery,
    filteredItems,
    isSearching,
    setSearch,
    clearSearch,
    search
  }
}
