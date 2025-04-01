import { configureStore } from '@reduxjs/toolkit'

import { taskSlice } from '@/slices/task.slice.ts'
import { userSlice } from '@/slices/user.slice.ts'
import { uiStateSlice } from '@/slices/ui-state.slice.ts'

export const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    user: userSlice.reducer,
    ui: uiStateSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
