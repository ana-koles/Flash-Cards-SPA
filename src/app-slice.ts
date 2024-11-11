import { PayloadAction, createSlice, isRejected } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(isRejected, (state, action: any) => {
      if (!state.isLoggedIn) {
        return
      }
      if (action.payload?.data?.errorMessages?.[0]?.message) {
        state.error = action.payload.data.errorMessages[0].message
      } else if (action.payload?.data?.message) {
        state.error = action.payload.data.message
      } else {
        state.error = action.payload.error ? action.payload.error : 'Some error occurred'
      }
    })
  },
  initialState: {
    error: null as null | string,
    isLoggedIn: false,
  },
  name: 'app',
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectError: state => state.error,
  },
})

export const appReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
export const { selectError } = slice.selectors
