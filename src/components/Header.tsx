import { Button, DropdownMenu, Progress, TabNav } from '@radix-ui/themes'
import { Link, useLocation } from 'react-router'

import { useTasks } from '@/hooks/use-tasks.ts'

const tabs = [
  {
    path: '/',
    text: 'Home',
  },
  {
    path: '/map',
    text: 'Map',
  },
  {
    path: '/tasks',
    text: 'Tasks',
  },
]

export default function Header() {
  const { pathname } = useLocation()
  const { completedTasks, tasks, completeTask, resetTask, uncompletedTasks } =
    useTasks()

  const completePercentage = (completedTasks.length / tasks.length) * 100

  const resetAll = () => {
    completedTasks.forEach((t) => resetTask(t))
  }

  const completeAll = () => {
    uncompletedTasks.forEach((t) => completeTask(t))
  }

  return (
    <header className="flex max-h-10 h-10 w-screen px-4">
      <TabNav.Root>
        {tabs.map(({ text, path }) => (
          <TabNav.Link asChild key={path} active={pathname === path}>
            <Link to={path}>{text}</Link>
          </TabNav.Link>
        ))}
      </TabNav.Root>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <Progress className="w-full max-w-[300px]" value={completePercentage} />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button>
              Options
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={resetAll}>Reset</DropdownMenu.Item>
            <DropdownMenu.Item onClick={completeAll}>
              Complete all
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
