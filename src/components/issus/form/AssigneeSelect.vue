<template>
  <div class="grid gap-2">
    <Label v-if="isLabel" for="assignee">{{ label }}</Label>
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
              <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${modelValue.username}`" />
              <AvatarFallback>{{ modelValue.username }}</AvatarFallback>
            </Avatar>
            {{ modelValue.username }}
          </div>
          <div v-else class="text-muted-foreground">Select assignee...</div>
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
                  value="no-assignee"
                  @select="() => {
                  $emit('update:modelValue', null)
                  isOpen = false
                }"
              >
                <Check
                    :class="[
                    'mr-2 h-4 w-4',
                    !modelValue ? 'opacity-100' : 'opacity-0'
                  ]"
                />
                No assignee
              </CommandItem>
              <CommandItem
                  v-for="user in users"
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
                  <AvatarImage :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`" />
                  <AvatarFallback>{{ user.username }}</AvatarFallback>
                </Avatar>
                {{ user.username }}
                <span class="ml-2 text-sm text-muted-foreground">
                  {{ user.email }}
                </span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
import type { UserInterface } from '@/interface/user.interface'
import { getUserCollection } from '@/services/api/user.service.api'

withDefaults(defineProps<{
  modelValue: UserInterface | null
  isLabel?: boolean
  label: string
}>(), {
  isLabel: true
})

defineEmits<{
  (e: 'update:modelValue', value: UserInterface | null): void
}>()

const open = ref(false)
const users = ref<UserInterface[]>([])
const isLoading = ref(true)

const isOpen = computed({
  get() {
    return open.value
  },
  set(value) {
    open.value = value
  }
})

onMounted(async () => {
  try {
    users.value = await getUserCollection()
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    isLoading.value = false
  }
})
</script>