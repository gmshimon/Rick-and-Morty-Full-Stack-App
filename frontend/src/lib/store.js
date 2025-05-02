import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    // auth: authReducer,
    // todos: todosReducer,
    // add other slices here
  })

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  })
  
  export default store