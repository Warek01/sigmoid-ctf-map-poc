import { lazy, Suspense, useState } from 'react'
import type { Task } from '@/types/task'
import TaskModal from '@/components/TaskModal'
import tasksJson from '@/data/tasks.json'
import './app.css'
import { cn } from '@/utils/cn.ts'

const Map = lazy(() => import('@/components/Map'))

export default function App() {
  const [tasks, setTasks] = useState(tasksJson)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const handleCompleteTask = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) => {
        return t.country === task.country ? { ...t, completed: true } : t
      }),
    )
    setSelectedCountry(null)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  return (
    <main className="">
      <Suspense fallback={<h2>Loading map ...</h2>}>
        <Map
          width="70%"
          height="100vh"
          selectedCountry={selectedCountry}
          disabled={!!selectedCountry}
          tasks={tasks}
          onCountrySelect={handleCountrySelect}
        />
      </Suspense>
      <ul className="w-[30%] inline-block h-screen max-h-screen overflow-y-auto">
        {tasks.map((t) => (
          <li
            key={t.country}
            className={cn(
              'cursor-pointer px-3 py-0.5 hover:bg-white/10 duration-150',
              selectedCountry === t.country && 'bg-white/10',
            )}
            onClick={() => setSelectedCountry(t.country)}
          >
            {t.country}
          </li>
        ))}
      </ul>
      <TaskModal
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
        onComplete={handleCompleteTask}
        task={tasks.find((t) => t.country === selectedCountry)!}
      />
    </main>
  )
}
