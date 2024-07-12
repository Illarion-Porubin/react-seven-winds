import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contentReducer from './slices/contentSlice';


const rootReducer = combineReducers({
  contentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch']