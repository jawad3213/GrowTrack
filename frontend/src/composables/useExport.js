import { ref } from 'vue'

export function useExport() {
  const isExporting = ref(false)

  function exportToCSV(data, filename, columns) {
    if (!data || data.length === 0) {
      return
    }

    const headers = columns.map(col => col.label).join(',')
    const rows = data.map(row => {
      return columns.map(col => {
        let value = row[col.key] ?? ''
        
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""')
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`
          }
        }
        
        return value
      }).join(',')
    })

    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  async function exportWithProgress(data, filename, columns, onProgress) {
    isExporting.value = true
    
    try {
      if (onProgress) onProgress(10)
      
      await new Promise(resolve => setTimeout(resolve, 50))
      
      if (onProgress) onProgress(50)
      
      exportToCSV(data, filename, columns)
      
      if (onProgress) onProgress(100)
      
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting,
    exportToCSV,
    exportWithProgress
  }
}
