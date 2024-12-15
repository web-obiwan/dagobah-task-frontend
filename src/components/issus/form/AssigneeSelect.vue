<template>
  <div class="grid gap-2">
    <Label for="assignee">Assignee</Label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="isOpen"
          class="w-full justify-between"
        >
          <div v-if="modelValue" class="flex items-center">
            <Avatar class="mr-2 h-5 w-5">
              <AvatarImage :src="modelValue.avatar" />
              <AvatarFallback>{{ modelValue.name }}</AvatarFallback>
            </Avatar>
            {{ modelValue.name }}
          </div>
          <div v-else>Select assignee...</div>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search assignee..." />
          <CommandEmpty>No assignee found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="user in mockUsers"
                :key="user.id"
                :value="user"
                @select="() => {
                  $emit('update:modelValue', user)
                  isOpen = false
                }"
              >
                <Check
                  :class="[
                    'mr-2 h-4 w-4',
                    modelValue?.id === user.id ? 'opacity-100' : 'opacity-0'
                  ]"
                />
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage :src="user.avatar" />
                  <AvatarFallback>{{ user.name }}</AvatarFallback>
                </Avatar>
                {{ user.name }}
                <span class="ml-2 text-sm text-muted-foreground">{{
                  user.email
                }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { mockUsers } from '@/mock/user.mock'
import type { User } from '@/interface/user.interface'

defineProps<{
  modelValue: User | null
}>()

defineEmits<{
  (e: 'update:modelValue', value: User | null): void
}>()

const open = ref(false)

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})
</script>
