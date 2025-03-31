import { lazy, Suspense, useState } from 'react'

import type { Task } from '@/types/task.ts'
import TaskModal from '@/components/TaskModal.tsx'
import { Skeleton } from '@radix-ui/themes'
import { useTasks } from '@/hooks/use-tasks.ts'

const Map = lazy(() => import('@/components/Map'))

export default function MapPage() {
  const { tasks, completeTask } = useTasks()
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleCompleteTask = (task: Task) => {
    completeTask(task)
    setSelectedCountry(null)
  }

  return (
    <div className="flex-1 flex h-screen">
      <Suspense fallback={<Skeleton height="100%" width="100%" />}>
        <Map
          className="flex-1"
          selectedCountry={selectedCountry}
          disabled={!!selectedCountry}
          tasks={tasks}
          onCountrySelect={handleCountrySelect}
        />
      </Suspense>

      <TaskModal
        onClose={() => setSelectedCountry(null)}
        onComplete={handleCompleteTask}
        task={tasks.find((t) => t.country === selectedCountry)!}
      />
    </div>
  )
}
