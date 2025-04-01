import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from 'react-router'

import HomePage from '@/pages/home.page.tsx'
import MapPage from '@/pages/map.page.tsx'
import TasksPage from '@/pages/tasks.page.tsx'
import App from '@/App'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
    ],
  },
]

export const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })
