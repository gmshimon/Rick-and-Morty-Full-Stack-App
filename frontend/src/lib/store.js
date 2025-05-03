import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './Features/userSlice'
import characterSlice from './Features/characterSlice'
import messageSlice from './Features/messageSlice'

const rootReducer = combineReducers({
  user: userSlice,
  character: characterSlice,
  messages: messageSlice
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
