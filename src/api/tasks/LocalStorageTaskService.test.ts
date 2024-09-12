import { LocalStorageTaskService, STORAGE_KEY } from '@/api/tasks/LocalStorageTaskService'
import { mockTask } from '@/components/tasks/taskFixtures'
import { TaskStatus } from '@/lib/types'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/utils', () => ({
  generateRandomId: vi.fn().mockReturnValue('taskId')
}))

describe('LocalStorageTaskService', () => {
  const service = new LocalStorageTaskService()
  const fakeDate = '2024-09-12'

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns all tasks', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockTask()]))

    expect(await service.getAll()).toStrictEqual([mockTask()])
  })

  it('creates a task', async () => {
    const task = {
      title: 'Test',
      description: 'Should work',
      status: TaskStatus.PENDING,
      dueDate: new Date().toISOString()
    }

    await service.create('local', task)

    expect(await service.getAll()).toStrictEqual([
      {
        ...task,
        id: 'taskId',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'local'
      }
    ])
  })

  it('updates a task', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockTask()]))

    const updatedTask = { ...mockTask(), title: 'This changed' }
    await service.update('local', 'testId', updatedTask)

    expect(await service.getAll()).toStrictEqual([
      { ...updatedTask, updatedAt: new Date(fakeDate).toISOString() }
    ])
  })

  it('removes a task', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([mockTask()]))

    await service.remove('local', 'testId')

    expect(await service.getAll()).toStrictEqual([])
  })
})
