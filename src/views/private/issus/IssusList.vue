<template>
  <div class="mb-5 flex space-x-2">
    <div class="relative w-full max-w-sm items-center">
      <Input id="search" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
    </div>
    <DefaultFilterBtn />
  </div>
  <DefaultKanban />
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-vue-next'

import DefaultKanban from "@/components/kanban/DefaultKanban.vue";
import DefaultFilterBtn from "@/components/filter/DefaultFilterBtn.vue";
</script>



