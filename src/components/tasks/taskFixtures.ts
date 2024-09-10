import { TaskStatus, type Task } from '@/lib/types'

export function mockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'testId',
    userId: 'local',
    title: 'Complete project documentation',
    description: 'Write detailed documentation for the new project features.',
    status: TaskStatus.PENDING,
    dueDate: new Date('2024-09-30').toISOString(),
    createdAt: new Date('2024-09-01').toISOString(),
    updatedAt: new Date('2024-09-01').toISOString(),
    ...overrides
  }
}
