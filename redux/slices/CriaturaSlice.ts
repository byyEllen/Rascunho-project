import { createSlice } from "@reduxjs/toolkit"

interface Criatura {
  id: number
  nome: string
  // outros campos
}

const initialState: Criatura[] = []

const criaturaSlice = createSlice({
  name: "criaturas",
  initialState,
  reducers: {},
})

export default criaturaSlice.reducer