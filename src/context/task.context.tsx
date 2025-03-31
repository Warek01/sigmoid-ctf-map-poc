import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react'

import tasksJson from '@/data/tasks.json'
import { Task } from '@/types/task.ts'

interface TaskContextProps {
  tasks: Task[]
  completedTasks: Task[]
  uncompletedTasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
  completeTask: (task: Task) => void
  resetTask: (task: Task) => void
}

export const TaskContext = createContext<TaskContextProps>(null!)

export function TaskContextProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(tasksJson)

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks],
  )

  const uncompletedTasks = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks],
  )

  const completeTask = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) => {
        return t.country === task.country ? { ...t, completed: true } : t
      }),
    )
  }

  const resetTask = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) => {
        return t.country === task.country ? { ...t, completed: false } : t
      }),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        completedTasks,
        uncompletedTasks,
        completeTask,
        resetTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
