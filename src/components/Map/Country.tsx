import { memo } from 'react'
import { Geography } from 'react-simple-maps'

import { cn } from '@/utils/cn.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import {
  selectCountry,
  selectSelectedCountry,
} from '@/slices/ui-state.slice.ts'
import { selectTasks } from '@/slices/task.slice.ts'
import { MapFeature } from '@/components/Map/index.tsx'

interface Props {
  feature: MapFeature
}

function Country(props: Props) {
  const { feature } = props
  const tasks = useAppSelector(selectTasks)
  const selectedCountry = useAppSelector(selectSelectedCountry)
  const dispatch = useAppDispatch()
  const country = feature.properties.name
  const task = tasks.find((t) => t.country === country) ?? null
  const isCompleted = task?.completed
  const isSelected = country === selectedCountry

  const handleCountryClick = () => {
    dispatch(selectCountry(country))
  }

  if (!task) {
    return (
      <Geography
        key={feature.rsmKey}
        geography={feature}
        className="stroke-0 fill-[var(--accent-3)] focus-within:outline-none"
      />
    )
  }

  if (isCompleted) {
    return (
      <Geography
        key={feature.rsmKey}
        geography={feature}
        onClick={handleCountryClick}
        className={cn(
          'focus-within:outline-none duration-150 fill-[var(--gray-5)] stroke-0 cursor-pointer',
          {
            'fill-[var(--accent-10)]': isSelected,
          },
        )}
      />
    )
  }

  return (
    <Geography
      key={feature.rsmKey}
      geography={feature}
      onClick={handleCountryClick}
      className={cn(
        'stroke-1 stroke-[var(--accent-8)] focus-within:outline-none duration-150 fill-[var(--accent-5)] cursor-pointer',
        {
          'hover:fill-[var(--accent-10)]': !isCompleted,
          'fill-[var(--gray-5)] stroke-0': isCompleted,
          'fill-[var(--accent-10)]': isSelected,
        },
      )}
    />
  )
}

export default memo(Country)
