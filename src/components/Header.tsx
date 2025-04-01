import { Button, DropdownMenu, Progress, TabNav } from '@radix-ui/themes'
import { Link, useLocation, useNavigate } from 'react-router'

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts'
import {
  completeTask,
  resetTask,
  selectCompletedTasks,
  selectTasks,
  selectUncompletedTasks,
} from '@/slices/task.slice.ts'
import { AppRoute } from '@/config/app-route.ts'
import { selectUser, setUser } from '@/slices/user.slice.ts'
import { userMock } from '@/mocks/user.mock.ts'
import { cn } from '@/utils/cn.ts'

const tabs = [
  {
    path: AppRoute.HOME,
    text: 'Home',
  },
  {
    path: AppRoute.MAP,
    text: 'Map',
  },
  {
    path: AppRoute.TASKS,
    text: 'Tasks',
  },
]

export default function Header() {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  const completedTasks = useAppSelector(selectCompletedTasks)
  const uncompletedTasks = useAppSelector(selectUncompletedTasks)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  const completePercentage = (completedTasks.length / tasks.length) * 100

  const resetAll = () => {
    completedTasks.forEach((t) => dispatch(resetTask(t)))
  }

  const completeAll = () => {
    uncompletedTasks.forEach((t) => dispatch(completeTask(t)))
  }

  const logOut = () => {
    dispatch(setUser(null))
    navigate(AppRoute.REGISTER)
  }

  const logIn = () => {
    dispatch(setUser(userMock))
    navigate(AppRoute.LOGIN)
  }

  return (
    <header className="flex max-h-10 h-10 w-screen px-4">
      <TabNav.Root className={cn(!user && 'pointer-events-none')}>
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
            <DropdownMenu.Item onClick={user ? logOut : logIn}>
              {user ? 'Log out' : 'Log in'}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
