<template>
  <component
    :is="to ? 'router-link' : 'span'"
    :to="to || undefined"
    class="inline-flex items-center gap-2.5 select-none"
  >
    <span
      class="grid place-items-center rounded-xl bg-gradient-to-br from-primary-accent to-primary-hover text-white shadow-sm"
      :class="sizeClasses.box"
    >
      <svg
        :class="sizeClasses.icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
        <path d="m6.2 5.3 3.1 3.9" />
        <path d="m12.4 3.4 3.1 4" />
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    </span>
    <span
      v-if="showText"
      class="font-heading font-bold tracking-wide leading-none"
      :class="sizeClasses.text"
    >
      <span class="text-light-text">CENTRAL</span>
      <span class="text-primary-accent"> CINEMA</span>
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  showText: { type: Boolean, default: true },
  to: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xl':
      return { box: 'w-14 h-14 md:w-16 md:h-16', icon: 'w-7 h-7 md:w-8 md:h-8', text: 'text-3xl md:text-5xl' }
    case 'lg':
      return { box: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-2xl' }
    case 'sm':
      return { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' }
    default:
      return { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-base md:text-lg' }
  }
})
</script>
