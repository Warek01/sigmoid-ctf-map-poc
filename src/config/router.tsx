import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from 'react-router'

import HomePage from '@/pages/home.page.tsx'
import MapPage from '@/pages/map.page.tsx'
import TasksPage from '@/pages/tasks.page.tsx'
import App from '@/App'
import { AppRoute } from '@/config/app-route.ts'
import LoginPage from '@/pages/login.page.tsx'
import RegisterPage from '@/pages/register.page.tsx'

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: AppRoute.MAP,
        element: <MapPage />,
      },
      {
        path: AppRoute.TASKS,
        element: <TasksPage />,
      },
      {
        path: AppRoute.LOGIN,
        element: <LoginPage />,
      },
      {
        path: AppRoute.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
]

export const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })
