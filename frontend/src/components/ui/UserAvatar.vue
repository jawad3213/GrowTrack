<template>
  <div 
    class="rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md"
    :class="sizeClasses"
    :style="{ backgroundColor: bgColor }"
  >
    <slot>
      {{ initials }}
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  size: { type: String, default: 'md' },
  color: { type: String, default: null }
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }
  return sizes[props.size] || sizes.md
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name.charAt(0).toUpperCase()
})

const bgColor = computed(() => {
  if (props.color) return props.color
  
  const colorPalette = {
    student: { hue: 260, sat: 65, light: 55 },
    professor: { hue: 220, sat: 70, light: 50 },
    coach: { hue: 340, sat: 70, light: 55 },
    supervisor: { hue: 270, sat: 65, light: 55 },
    skill: { hue: 160, sat: 60, light: 45 },
    signal: { hue: 35, sat: 75, light: 55 },
    group: { hue: 200, sat: 65, light: 50 },
    default: null
  }
  
  let palette = colorPalette.default
  const name = props.name.toLowerCase()
  
  if (name.includes('student') || name.includes('etudiant')) palette = colorPalette.student
  else if (name.includes('professor') || name.includes('professeur')) palette = colorPalette.professor
  else if (name.includes('coach')) palette = colorPalette.coach
  else if (name.includes('supervisor') || name.includes('superviseur')) palette = colorPalette.supervisor
  else if (name.includes('skill') || name.includes('competence')) palette = colorPalette.skill
  else if (name.includes('signal')) palette = colorPalette.signal
  else if (name.includes('group') || name.includes('classe')) palette = colorPalette.group
  
  if (props.name) {
    let hash = 0
    for (let i = 0; i < props.name.length; i++) {
      hash = props.name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 55%, 55%)`
  }
  
  return 'hsl(220, 55%, 55%)'
})
</script>
