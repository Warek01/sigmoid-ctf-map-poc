import { createPortal } from 'react-dom'
import type { Task } from '@/types/task'
import { useEffect, useRef } from 'react'

interface Props {
  task: Task
  onComplete: (task: Task) => void
  onClose: () => void
  isOpen: boolean
}

export default function TaskModal({
  task,
  onComplete,
  onClose,
  isOpen,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as HTMLElement)) {
        onClose()
      }
    }

    const timeout = setTimeout(() =>
      document.body.addEventListener('click', handler),
    )

    return () => {
      clearTimeout(timeout)
      document.body.removeEventListener('click', handler)
    }
  }, [isOpen])

  return (
    isOpen &&
    createPortal(
      <div
        ref={containerRef}
        className="absolute w-[300px] h-[300px] top-5 left-5 p-3 bg-white z-[9999] text-black"
      >
        <button
          onClick={onClose}
          className="absolute right-3 cursor-pointer hover:bg-black/10 p-1"
        >
          x
        </button>
        <h2 className="text-xl font-bold">{task.title}</h2>
        <h3 className="text-lg font-medium">{task.description}</h3>
        <p>Complexity: {task.complexity}</p>
        <button
          onClick={() => onComplete(task)}
          disabled={task.completed}
          className="bg-amber-200 px-2 py-1 cursor-pointer"
        >
          Complete
        </button>
      </div>,
      document.body,
    )
  )
}
