<template>
  <div>
    <Separator/>
    <div class="flex items-center gap-2 text-muted-foreground text-sm my-2 px-2">
      <span>{{ issus.reference }}</span>
      <span>·</span>
      <span>{{ issus.repositories.map((item) => item.name).join(', ') }}</span>
    </div>
    <Separator/>
    <div class="flex justify-between pl-5 w-full">
      <div class="w-full">
        <div class="my-5">
          <div
              class="text-3xl font-semibold cursor-text p-2 rounded-md -ml-2"
              @click="startEditingTitle"
          >
            <input
                v-if="isEditingTitle"
                v-model="editableTitle"
                ref="titleInput"
                class="w-full bg-transparent focus:outline-none text-2xl"
                @blur="saveTitle"
                @keydown.enter="saveTitle"
                @keydown.esc="cancelEditTitle"
            />
            <span class="text-2xl" v-else>{{ issus.name }}</span>
          </div>
        </div>

        <div
            class="max-w-none cursor-text p-2 rounded-md -ml-2"
            @click="startEditingDescription"
        >
          <textarea
              v-if="isEditingDescription"
              v-model="editableDescription"
              ref="descriptionTextarea"
              class="w-full bg-transparent focus:outline-none resize-none"
              :rows="getTextareaRows(editableDescription)"
              @blur="saveDescription"
              @keydown.enter.exact.prevent="saveDescription"
              @keydown.esc="cancelEditDescription"
          />
          <div v-else class="whitespace-pre-wrap">
            {{ issus.description || 'No description provided. Click to add one.' }}
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="w-80 shrink-0">
        <div class="border-x h-[89vh] bg-card text-card-foreground shadow-sm sticky top-6">
          <!-- Properties Header -->
          <div class="flex items-center justify-between py-1 px-4 border-b">
            <h3 class="text-sm font-medium">Properties</h3>
            <div class="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" @click="copyIssueLink">
                    <Link />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy issue link</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" @click="copyIssueId">
                    <Hash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy issue ID</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <!-- Properties Content -->
          <div class="p-4 space-y-4">
            <!-- Status -->
            <StatusSelect v-model="issus.status"/>

            <!-- Priority -->
            <PrioritySelect v-model="issus.priority"/>

            <!-- Label -->
            <LabelSelect v-model="issus.labels"/>

            <!-- Project -->
            <ProjectSelect v-model="issus.project"/>

            <!-- Assignee -->
            <AssigneeSelect v-model="issus.owner" label="Owner"/>

            <!-- Sprint -->
            <SprintSelect v-model="issus.sprint"/>

            <div class="mt-5">
              <Label>Story point</Label>
              <Input
                  type="number"
                  v-model="issus.storyPoint as number"
              />
            </div>

          <!--  <div class="mt-5">
              <Label>Dead line</Label>
             <Input type="date" v-model="issus.deadline"/>
            </div> -->

            <Separator/>

            <AssigneeSelect v-model="issus.reviewer" label="Reviewer"/>
            <AssigneeSelect v-model="issus.reporter" label="Reporter"/>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, nextTick, watch} from 'vue'
import {useToast} from '@/components/ui/toast/use-toast'
import {Button} from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {Separator} from '@/components/ui/separator'
import StatusSelect from '@/components/issus/form/StatusSelect.vue'
import PrioritySelect from '@/components/issus/form/PrioritySelect.vue'
import ProjectSelect from '@/components/issus/form/ProjectSelect.vue'
import AssigneeSelect from '@/components/issus/form/AssigneeSelect.vue'
import SprintSelect from '@/components/issus/form/SprintSelect.vue'

import {
  Link,
  Hash,
} from 'lucide-vue-next'
import LabelSelect from "@/components/issus/form/LabelSelect.vue";
import {IssueInterface} from "@/interface/issus.interface.ts";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const props = defineProps<{
  modelValue: IssueInterface
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IssueInterface): void
}>()

const {toast} = useToast()

const issus = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

console.log(issus.value.repositories.map((item) => item.name))

const isEditingTitle = ref(false)
const editableTitle = ref('')
const titleInput = ref<HTMLInputElement>()

function startEditingTitle() {
  if (!isEditingTitle.value) {
    editableTitle.value = issus.value.name
    isEditingTitle.value = true
    nextTick(() => {
      titleInput.value?.focus()
    })
  }
}

function saveTitle() {
  if (editableTitle.value.trim()) {
    issus.value = {...issus.value, name: editableTitle.value.trim()}
  }
  isEditingTitle.value = false
}

function cancelEditTitle() {
  isEditingTitle.value = false
}

const isEditingDescription = ref(false)
const editableDescription = ref('')
const descriptionTextarea = ref<HTMLTextAreaElement>()

function startEditingDescription() {
  if (!isEditingDescription.value) {
    editableDescription.value = issus.value.description ?? ''
    isEditingDescription.value = true
    nextTick(() => {
      descriptionTextarea.value?.focus()
    })
  }
}

function saveDescription() {
  issus.value = {...issus.value, description: editableDescription.value.trim()}
  isEditingDescription.value = false
}

function cancelEditDescription() {
  isEditingDescription.value = false
}

function getTextareaRows(text: string): number {
  const lines = text.split('\n').length
  return Math.max(3, Math.min(10, lines))
}

function copyIssueLink() {
  navigator.clipboard.writeText(`https://your-domain.com/issues/${issus.value.reference}`)
  toast({
    title: 'Link copied',
    description: 'Issue link has been copied to clipboard',
  })
}

function copyIssueId() {
  navigator.clipboard.writeText(issus.value.reference)
  toast({
    title: 'ID copied',
    description: 'Issue ID has been copied to clipboard',
  })
}

// Utility functions
/*function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}*/

watch(issus, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>
