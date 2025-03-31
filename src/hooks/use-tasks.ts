import { useContext } from 'react'

import { TaskContext } from '@/context/task.context.tsx'

export function useTasks() {
  return useContext(TaskContext)
}
