import { Outlet } from 'react-router'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Provider } from 'react-redux'

import AppLayout from '@/components/AppLayout.tsx'
import { store } from '@/config/store.ts'
import AuthContainer from '@/containers/Auth.container.tsx'

import './app.css'

export default function App() {
  return (
    <Theme appearance="dark">
      <Provider store={store}>
        <AppLayout>
          <AuthContainer>
            <Outlet />
          </AuthContainer>
        </AppLayout>
      </Provider>
    </Theme>
  )
}
