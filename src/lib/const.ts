import type { Task, TaskStatus } from '@/lib/types'
import { generateRandomId } from '@/lib/utils'

export const statusText: Record<TaskStatus, string> = {
  pending: 'Pending',
  inProgress: 'In progress',
  completed: 'Completed'
}

export const tasks: Task[] = [
  {
    id: generateRandomId(),
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the new project features.',
    status: 'pending',
    dueDate: new Date('2024-09-30'),
    createdAt: new Date('2024-09-01')
  },
  {
    id: generateRandomId(),
    title: 'Team meeting',
    description: 'Weekly sync with the team to review progress and next steps.',
    status: 'inProgress',
    dueDate: new Date('2024-09-10'),
    createdAt: new Date('2024-09-03')
  },
  {
    id: generateRandomId(),
    title: 'Code review',
    description: 'Review the pull requests for the upcoming release.',
    status: 'pending',
    dueDate: new Date('2024-09-12'),
    createdAt: new Date('2024-09-04')
  },
  {
    id: generateRandomId(),
    title: 'Client feedback session',
    description:
      'Organize a feedback session with the client to gather insights on the new features.',
    status: 'pending',
    dueDate: new Date('2024-09-15'),
    createdAt: new Date('2024-09-05')
  },
  {
    id: generateRandomId(),
    title: 'Bug fixing',
    description: 'Address the reported bugs from the QA team.',
    status: 'inProgress',
    dueDate: new Date('2024-09-13'),
    createdAt: new Date('2024-09-02')
  },
  {
    id: generateRandomId(),
    title: 'Release planning',
    description: 'Plan the schedule for the upcoming product release.',
    status: 'completed',
    dueDate: new Date('2024-09-05'),
    createdAt: new Date('2024-08-30')
  }
]
