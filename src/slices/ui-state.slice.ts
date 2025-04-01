import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/config/store.ts'

interface UiState {
  selectedCountry: string | null
}

const initialState: UiState = {
  selectedCountry: null,
}

export const UI_STATE_SLICE_NAME = 'ui-state'

export const uiStateSlice = createSlice({
  name: UI_STATE_SLICE_NAME,
  initialState,
  reducers: {
    selectCountry(state, action: PayloadAction<string | null>) {
      state.selectedCountry = action.payload
    },
  },
})

export const { selectCountry } = uiStateSlice.actions

export const selectSelectedCountry = (state: RootState) =>
  state.ui.selectedCountry
