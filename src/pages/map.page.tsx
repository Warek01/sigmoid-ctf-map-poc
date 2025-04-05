import { useEffect } from 'react'

import TaskModal from '@/components/TaskModal.tsx'
import { useAppDispatch } from '@/hooks/redux.ts'
import { selectCountry } from '@/slices/ui-state.slice.ts'
import Map from '@/components/Map'

export default function MapPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(selectCountry(null))
    }
  }, [])

  return (
    <div className="flex-1 flex max-h-full">
      <Map />
      <TaskModal />
    </div>
  )
}
