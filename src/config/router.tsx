import { createBrowserRouter } from 'react-router'

import HomePage from '@/pages/home.page.tsx'
import MapPage from '@/pages/map.page.tsx'
import TasksPage from '@/pages/tasks.page.tsx'
import App from '@/App'

export const router = createBrowserRouter(
  [
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
  ],
  { basename: import.meta.env.BASE_URL },
)
