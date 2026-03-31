import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  function show(message, type = 'info', duration = 4000) {
    const id = ++toastId
    
    toasts.value.push({
      id,
      message,
      type,
      visible: true
    })
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }
  
  function success(message, duration) {
    return show(message, 'success', duration)
  }
  
  function error(message, duration) {
    return show(message, 'error', duration)
  }
  
  function warning(message, duration) {
    return show(message, 'warning', duration)
  }
  
  function info(message, duration) {
    return show(message, 'info', duration)
  }
  
  function remove(id) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value[index].visible = false
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 300)
    }
  }
  
  function clear() {
    toasts.value = []
  }
  
  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear
  }
}
