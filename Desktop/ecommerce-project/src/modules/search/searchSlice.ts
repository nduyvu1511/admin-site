import { BooleanType, SearchHistory } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface SearchSliceProps {
  history: {
    isOpen: boolean
    data: SearchHistory[]
  }
}

const initialState: SearchSliceProps = {
  history: {
    isOpen: false,
    data: [],
  },
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // History
    toggleSearchHistory: (state, { payload }: BooleanType) => {
      state.history.isOpen = payload
    },

    addSearchHistory: (state, { payload }: { payload: SearchHistory }) => {
      state.history.data.unshift(payload)
    },

    deleteHistory: (state, { payload }: { payload: SearchHistory }) => {
      state.history.data.filter((item) => item.id !== payload.id)
    },
  },
})

export default searchSlice.reducer

export const { addSearchHistory, deleteHistory, toggleSearchHistory } =
  searchSlice.actions
