import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: false,
  // adicione outros estados de UI aqui
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    // adicione outros reducers de UI aqui
  },
})

export const { toggleDarkMode } = uiSlice.actions
export default uiSlice.reducer