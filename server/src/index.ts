import { generateRandomId } from '@src/lib/utils'
import express from 'express'
import { JSONFilePreset } from 'lowdb/node'
import z from 'zod'
import cors from 'cors'
import { CreateTaskSchema, EditTaskSchema, Task, TaskStatus } from '@src/lib/types'
import { resolve } from 'path'

const app = express()
app.use(cors())
app.use(express.json())

const db = await JSONFilePreset<{ tasks: Task[] }>(resolve(import.meta.dirname, '../db.json'), {
  tasks: []
})

const router = express.Router()

router.get('/', async (_req, res) => {
  await db.read()
  res.json(db.data.tasks)
})

router.post('/', async (req, res) => {
  try {
    const taskData = CreateTaskSchema.parse(req.body)
    const newTask = {
      ...taskData,
      id: generateRandomId(),
      status: TaskStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    db.data.tasks.push(newTask)
    await db.write()

    res.status(201).json(newTask)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors })
    }
    res.status(500).json({ error: 'Failed to create task' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const taskIndex = db.data.tasks.findIndex((t) => t.id === req.params.id)
    if (taskIndex === undefined || taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' })
    }

    const taskData = EditTaskSchema.partial().parse(req.body)

    const updatedTask = {
      ...db.data.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    }

    db.data.tasks[taskIndex] = updatedTask
    await db.write()

    res.json(updatedTask)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors })
    }
    res.status(500).json({ error: 'Failed to update task' })
  }
})

router.delete('/:id', async (req, res) => {
  await db.read()
  const taskIndex = db.data.tasks.findIndex((t) => t.id === req.params.id)

  if (taskIndex === undefined || taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  db.data.tasks.splice(taskIndex, 1)
  await db.write()
  res.status(204).send()
})

app.use('/tasks', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
