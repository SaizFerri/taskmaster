<script lang="ts" setup>
import Badge, { type BadgeProps } from '@/components/ui/Badge.vue'
import { Dropdown, DropdownItem, DropdownList, DropdownTrigger } from '@/components/ui/dropdown'
import { statusText } from '@/lib/const'
import { TaskStatus, type EditTask, type Task } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format, isBefore, startOfDay } from 'date-fns'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import DeleteTaskDialog from './DeleteTaskDialog.vue'
import EditTaskDialog from './EditTaskDialog.vue'

export type TaskProps = {
  task: Task
  showBadge?: boolean
}

withDefaults(defineProps<TaskProps>(), { showBadge: false })
defineEmits<{
  onEdit: [id: Task['id'], task: EditTask]
  onRemove: [id: Task['id']]
}>()

const isEditTaskDialogOpen = ref(false)
const isDeleteTaskDialogOpen = ref(false)

const badgeVariant: Record<TaskStatus, BadgeProps['variant']> = {
  [TaskStatus.PENDING]: 'default',
  [TaskStatus.IN_PROGRESS]: 'info',
  [TaskStatus.COMPLETED]: 'success'
}
</script>

<template>
  <div
    :class="
      cn('rounded-md border border-slate-200 bg-green-100 p-4', {
        'bg-white': task.status === TaskStatus.PENDING,
        'bg-blue-100': task.status === TaskStatus.IN_PROGRESS,
        'bg-green-100': task.status === TaskStatus.COMPLETED
      })
    "
  >
    <div class="mb-2 flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="text font-bold">{{ task.title }}</span>
        <Badge v-if="showBadge" :variant="badgeVariant[task.status]">
          {{ statusText[task.status] }}
        </Badge>
      </div>

      <Dropdown>
        <DropdownTrigger
          as="button"
          class="rounded-md p-1 transition ease-linear hover:bg-gray-100"
        >
          <EllipsisVertical :size="16" />
        </DropdownTrigger>
        <DropdownList>
          <DropdownItem @click="isEditTaskDialogOpen = true">
            <div class="flex items-center gap-2">
              <Pencil :size="12" />
              <span>Edit</span>
            </div>
          </DropdownItem>
          <DropdownItem @click="isDeleteTaskDialogOpen = true">
            <div class="flex items-center gap-2 text-red-600">
              <Trash2 :size="12" />
              <span>Delete</span>
            </div>
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
    <p class="mb-2 text-sm">{{ task.description }}</p>
    <div class="flex items-center gap-2">
      <span class="text-sm">{{ format(task.dueDate, 'MMMM d, yyyy') }}</span>
      <Badge
        v-if="
          isBefore(task.dueDate, startOfDay(new Date())) && task.status !== TaskStatus.COMPLETED
        "
        class="bg-red-200 text-red-600"
        >Overdue</Badge
      >
    </div>
    <div class="mt-2 flex flex-col gap-1">
      <span class="text-xs text-slate-400"
        >Created: {{ format(task.createdAt, 'MMMM d, yyyy') }}</span
      >
      <span class="text-xs text-slate-400"
        >Updated: {{ format(task.updatedAt, 'MMMM d, yyyy') }}</span
      >
    </div>
  </div>
  <EditTaskDialog
    :open="isEditTaskDialogOpen"
    :task="task"
    @onClose="isEditTaskDialogOpen = false"
    @onEditTask="(data: EditTask) => $emit('onEdit', task.id, data)"
  />
  <DeleteTaskDialog
    :open="isDeleteTaskDialogOpen"
    @onClose="isDeleteTaskDialogOpen = false"
    @onDeleteTask="$emit('onRemove', task.id)"
  />
</template>
