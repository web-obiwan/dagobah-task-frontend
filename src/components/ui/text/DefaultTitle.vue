<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h1
      :class="
      cn('text-3xl font-bold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </h1>
</template>
