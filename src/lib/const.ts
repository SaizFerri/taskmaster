import { TaskStatus, type Task } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'

export const statusText: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: 'Pending',
  [TaskStatus.IN_PROGRESS]: 'In progress',
  [TaskStatus.COMPLETED]: 'Completed'
}

export const tasks: Task[] = [
  {
    id: generateRandomId(),
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the new project features.',
    status: TaskStatus.PENDING,
    dueDate: new Date('2024-09-30'),
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Team meeting',
    description: 'Weekly sync with the team to review progress and next steps.',
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date('2024-09-10'),
    createdAt: new Date('2024-09-03'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Code review',
    description: 'Review the pull requests for the upcoming release.',
    status: TaskStatus.PENDING,
    dueDate: new Date('2024-09-12'),
    createdAt: new Date('2024-09-04'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Client feedback session',
    description:
      'Organize a feedback session with the client to gather insights on the new features.',
    status: TaskStatus.PENDING,
    dueDate: new Date('2024-09-15'),
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Bug fixing',
    description: 'Address the reported bugs from the QA team.',
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date('2024-09-13'),
    createdAt: new Date('2024-09-02'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Release planning',
    description: 'Plan the schedule for the upcoming product release.',
    status: TaskStatus.COMPLETED,
    dueDate: new Date('2024-09-05'),
    createdAt: new Date('2024-08-30'),
    updatedAt: new Date('2024-09-01')
  }
]
