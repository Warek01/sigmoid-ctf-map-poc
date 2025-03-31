import { Outlet } from 'react-router'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import AppLayout from '@/components/AppLayout.tsx'
import { TaskContextProvider } from '@/context/task.context.tsx'

import './app.css'

export default function App() {
  return (
    <Theme appearance="dark">
      <TaskContextProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </TaskContextProvider>
    </Theme>
  )
}
