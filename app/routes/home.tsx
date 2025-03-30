import 'leaflet/dist/leaflet.css'
import { lazy, Suspense, useState } from 'react'
import type { Task } from '@/types/task'
import TaskModal from '@/components/TaskModal'
import tasksJson from '@/data/tasks.json'

const Map = lazy(() => import('@/components/Map'))

export default function Home() {
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
          selectedCountry={selectedCountry}
          disabled={!!selectedCountry}
          tasks={tasks}
          onCountrySelect={handleCountrySelect}
        />
      </Suspense>
      {selectedCountry && (
        <TaskModal
          onClose={() => setSelectedCountry(null)}
          onComplete={handleCompleteTask}
          task={tasks.find((t) => t.country === selectedCountry)!}
        />
      )}
    </main>
  )
}
