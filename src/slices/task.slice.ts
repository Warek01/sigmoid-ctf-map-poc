import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Task } from '@/types/task.ts'
import { RootState } from '@/config/store.ts'
import tasksJson from '@/data/tasks.json'

interface TaskSliceState {
  tasks: Task[]
}

const initialState: TaskSliceState = {
  tasks: tasksJson,
}

export const TASK_SLICE_NAME = 'task'

export const taskSlice = createSlice({
  name: TASK_SLICE_NAME,
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload
    },

    completeTask(state, action: PayloadAction<Task>) {
      const task = state.tasks.find((t) => t.country === action.payload.country)
      if (task) {
        task.completed = true
      }
    },

    resetTask(state, action: PayloadAction<Task>) {
      const task = state.tasks.find((t) => t.country === action.payload.country)
      if (task) {
        task.completed = false
      }
    },
  },
})

export const { setTasks, resetTask, completeTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks

export const selectCompletedTasks = (state: RootState) =>
  state.task.tasks.filter((t) => t.completed)

export const selectUncompletedTasks = (state: RootState) =>
  state.task.tasks.filter((t) => !t.completed)

export const selectTaskByCountry =
  (country: string | null) => (state: RootState) =>
    state.task.tasks.find((t) => t.country === country) ?? null
