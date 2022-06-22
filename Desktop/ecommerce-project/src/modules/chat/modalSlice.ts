import { toggleHTMLOverflow } from "@/helper"
import { createSlice } from "@reduxjs/toolkit"
import { ModalChatSliceParams } from "models"

const initialState: ModalChatSliceParams = {
  isOpenChatDesktop: false,
  isOpenChatMobile: false,
  isExpandChatModal: false,
  isOpenChatMessage: false,
}

const chatModalSlice = createSlice({
  name: "chat_modal",
  initialState,
  reducers: {
    setOpenChatDesktop: (state, { payload }: { payload: boolean }) => {
      state.isOpenChatDesktop = payload
      if (state.isExpandChatModal) {
        state.isExpandChatModal = false
      }
    },

    setOpenChatMobile: (state, { payload }: { payload: boolean }) => {
      state.isOpenChatMobile = payload
      toggleHTMLOverflow(payload ? "hidden" : "unset")
      if (state.isExpandChatModal) {
        state.isExpandChatModal = false
      }
    },

    toggleExpandChatModal: (state, { payload }: { payload: boolean }) => {
      state.isExpandChatModal = payload
    },

    setOpenChatMessage: (state, { payload }: { payload: boolean }) => {
      state.isOpenChatMessage = payload
    },
  },
})

export const {
  toggleExpandChatModal,
  setOpenChatDesktop,
  setOpenChatMobile,
  setOpenChatMessage,
} = chatModalSlice.actions

export default chatModalSlice.reducer
