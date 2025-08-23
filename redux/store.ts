import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import criaturaSlice from "./slices/criaturaSlice"
import favoritosSlice from "./slices/favoritosSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    criaturas: criaturaSlice,
    favoritos: favoritosSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
