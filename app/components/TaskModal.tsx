import { createPortal } from 'react-dom'
import type { Task } from '@/types/task'

interface Props {
  task: Task
  onComplete: (task: Task) => void
  onClose: () => void
}

export default function TaskModal({ task, onComplete, onClose }: Props) {
  return createPortal(
    <div className="absolute w-[300px] h-[300px] top-5 left-5 p-3 bg-white z-[9999] text-black">
      <button onClick={onClose} className="absolute right-3 cursor-pointer">
        X
      </button>
      <h2 className="text-xl">{task.title}</h2>
      <h3 className="text-lg">{task.description}</h3>
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
}
