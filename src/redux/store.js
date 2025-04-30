import { configureStore } from "@reduxjs/toolkit"
import booksReducer from "./booksSlice"

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
 
  devTools: process.env.NODE_ENV !== "production",
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
