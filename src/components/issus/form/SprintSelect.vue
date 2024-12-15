<template>
  <div class="grid gap-2">
    <Label for="sprint">Sprint</Label>
    <Select :value="modelValue" @update:value="$emit('update:modelValue', $event)">
      <SelectTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full justify-between"
        >
          <div class="flex items-center gap-2">
            <span v-if="modelValue?.status" class="w-2 h-2 rounded-full" :class="{
              'bg-green-500': modelValue.status === 'active',
              'bg-blue-500': modelValue.status === 'planned',
              'bg-gray-500': modelValue.status === 'completed'
            }" />
            {{ modelValue ? modelValue.name : "Select sprint..." }}
          </div>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </SelectTrigger>
      <SelectContent class="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search sprint..." />
          <CommandEmpty>No sprint found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="sprint in mockSprints"
                :key="sprint.id"
                :value="sprint"
                @select="() => {
                  $emit('update:modelValue', sprint)
                  open = false
                }"
              >
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" :class="{
                    'bg-green-500': sprint.status === 'active',
                    'bg-blue-500': sprint.status === 'planned',
                    'bg-gray-500': sprint.status === 'completed'
                  }" />
                  <span>{{ sprint.name }}</span>
                  <span class="text-xs text-gray-500">
                    {{ new Date(sprint.startDate).toLocaleDateString() }} - {{ new Date(sprint.endDate).toLocaleDateString() }}
                  </span>
                </div>
                <Check
                  :class="[
                    'ml-auto h-4 w-4',
                    modelValue?.id === sprint.id ? 'opacity-100' : 'opacity-0'
                  ]"
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { mockSprints } from '@/mock/sprint.mock'
import type { Sprint } from '@/interface/sprint.interface'

const props = defineProps<{
  modelValue: Sprint | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Sprint): void
}>()

const open = ref(false)

const selectedSprint = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>