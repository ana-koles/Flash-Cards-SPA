import { createSlice, isRejected } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(isRejected, (state, action: any) => {
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
  },
  name: 'app',
  reducers: {},
  selectors: {
    selectError: state => state.error,
  },
})

export const appReducer = slice.reducer
export const { selectError } = slice.selectors
