import { PropsWithChildren } from 'react'

import { useAppSelector } from '@/hooks/redux.ts'
import { selectUser } from '@/slices/user.slice.ts'
import { Navigate, useLocation } from 'react-router'
import { AppRoute } from '@/config/app-route.ts'
import { UserRole } from '@/types/user.ts'

const adminRoutes: string[] = [AppRoute.TASKS]
const unprotectedRoutes: string[] = [AppRoute.LOGIN, AppRoute.REGISTER]

export default function AuthContainer({ children }: PropsWithChildren) {
  const user = useAppSelector(selectUser)
  const { pathname } = useLocation()

  if (adminRoutes.includes(pathname) && user?.role !== UserRole.ADMIN) {
    return <Navigate to={AppRoute.HOME} />
  }
  if (!unprotectedRoutes.includes(pathname) && !user) {
    return <Navigate to={AppRoute.LOGIN} />
  }
  if (unprotectedRoutes.includes(pathname) && !!user) {
    return <Navigate to={AppRoute.HOME} />
  }

  return children
}
