import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/config/store.ts'
import { User } from '@/types/user.ts'
import { userMock } from '@/mocks/user.mock.ts'

interface UserSliceState {
  user: User | null
}

const initialState: UserSliceState = {
  user: null,
}

export const USER_SLICE_NAME = 'user'

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
