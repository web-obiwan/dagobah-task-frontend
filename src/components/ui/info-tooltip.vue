<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info class="h-4 w-4 text-muted-foreground" />
      </TooltipTrigger>
      <TooltipContent>
        <slot />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-vue-next'
</script>
