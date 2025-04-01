import { User, UserRole } from '@/types/user.ts'

export const userMock: User = {
  id: 1,
  email: 'example@example.com',
  role: UserRole.ADMIN,
  teamId: 1,
  username: 'Test User',
}
