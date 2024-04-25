import { createSlice, isRejected } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(isRejected, (state, action: any) => {
      if (action.payload?.data) {
        state.error = action.payload.data.message
      } else {
        state.error = action.payload.error ? action.payload.error : 'Some error occurred'
      }
    })
  },
  initialState: {
    error: null as null | string,
  },
  name: 'app',
  reducers: {},
})

export const appReducer = slice.reducer
