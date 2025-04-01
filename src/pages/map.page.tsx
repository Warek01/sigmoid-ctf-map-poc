import { lazy, Suspense, useEffect } from 'react'

import TaskModal from '@/components/TaskModal.tsx'
import { Skeleton } from '@radix-ui/themes'
import { useAppDispatch } from '@/hooks/redux.ts'
import { selectCountry } from '@/slices/ui-state.slice.ts'

const Map = lazy(() => import('@/components/Map'))

export default function MapPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(selectCountry(null))
    }
  }, [])

  return (
    <div className="flex-1 flex h-screen">
      <Suspense fallback={<Skeleton height="100%" width="100%" />}>
        <Map className="flex-1" />
      </Suspense>
      <TaskModal />
    </div>
  )
}
