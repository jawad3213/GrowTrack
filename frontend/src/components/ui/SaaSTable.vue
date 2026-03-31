<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <!-- Table Container -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Head -->
        <thead>
          <tr class="bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
            <th
              v-if="selectable"
              class="px-6 py-4 text-left"
            >
              <input
                type="checkbox"
                :checked="allSelected"
                :indeterminate="someSelected"
                @change="toggleAll"
                class="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400',
                column.align || 'text-left',
                column.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200'
              ]"
              @click="column.sortable && $emit('sort', column.key)"
            >
              <div class="flex items-center gap-2" :class="column.align === 'center' ? 'justify-center' : ''">
                {{ column.label }}
                <template v-if="column.sortable">
                  <svg 
                    v-if="sortKey === column.key && sortOrder === 'asc'"
                    class="w-4 h-4 text-violet-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg 
                    v-else-if="sortKey === column.key && sortOrder === 'desc'"
                    class="w-4 h-4 text-violet-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg 
                    v-else
                    class="w-4 h-4 text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </template>
              </div>
            </th>
            <th
              v-if="$slots.actions"
              class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Actions
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          <tr
            v-for="(row, index) in data"
            :key="row[rowKey] || index"
            :class="[
              'transition-colors duration-150',
              selectedRows.includes(row[rowKey])
                ? 'bg-violet-50/50 dark:bg-violet-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            ]"
          >
            <td v-if="selectable" class="px-6 py-4">
              <input
                type="checkbox"
                :checked="selectedRows.includes(row[rowKey])"
                @change="toggleRow(row[rowKey])"
                class="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 text-sm',
                column.align === 'center' ? 'text-center' : 'text-left'
              ]"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-6 py-4 text-right">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="data.length === 0">
            <td :colspan="totalColumns" class="px-6 py-16 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p class="text-gray-500 dark:text-gray-400 font-medium">No data available</p>
                  <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer -->
    <div
      v-if="$slots.footer || pagination"
      class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80"
    >
      <slot name="footer">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Showing <span class="font-medium">{{ startItem }}</span> to <span class="font-medium">{{ endItem }}</span> of <span class="font-medium">{{ totalItems }}</span> results
          </p>
          <div v-if="pagination" class="flex items-center gap-2">
            <button
              :disabled="currentPage === 1"
              @click="$emit('page-change', currentPage - 1)"
              class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              :disabled="currentPage === totalPages"
              @click="$emit('page-change', currentPage + 1)"
              class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    required: true
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  selectable: {
    type: Boolean,
    default: false
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortOrder: {
    type: String,
    default: 'asc'
  },
  pagination: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  totalItems: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['sort', 'page-change', 'selection-change'])

const selectedRows = defineModel('selectedRows', { default: [] })

const totalColumns = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  return count
})

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))
const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))

const allSelected = computed(() => 
  props.data.length > 0 && props.data.every(row => selectedRows.value.includes(row[props.rowKey]))
)

const someSelected = computed(() => 
  selectedRows.value.length > 0 && !allSelected.value
)

const toggleRow = (key) => {
  const index = selectedRows.value.indexOf(key)
  if (index === -1) {
    selectedRows.value.push(key)
  } else {
    selectedRows.value.splice(index, 1)
  }
  emit('selection-change', selectedRows.value)
}

const toggleAll = () => {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = props.data.map(row => row[props.rowKey])
  }
  emit('selection-change', selectedRows.value)
}
</script>
