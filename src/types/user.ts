export interface User {
  id: number
  email: string
  role: UserRole
  username: string
  teamId: number
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
