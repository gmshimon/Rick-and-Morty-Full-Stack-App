import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './Features/userSlice'
const rootReducer = combineReducers({
  user: userSlice
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
