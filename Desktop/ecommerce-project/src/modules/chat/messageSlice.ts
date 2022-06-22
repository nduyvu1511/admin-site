import { createSlice } from "@reduxjs/toolkit"
import {
  MessageGroup,
  MessageRes,
  MessageSliceParams,
  ReplyMessageParams,
} from "models"

const initialState: MessageSliceParams = {
  isLimitMessage: undefined,
  messages: [],
  isMessageLoading: false,
  messageUnreadCount: undefined,
  replyMessage: undefined,
  isFetchingMoreMessages: undefined,
  isSendingMessage: undefined,
  // imagesBase64Preview: undefined,
}

const messageSlice = createSlice({
  name: "chat_message",
  initialState,
  reducers: {
    setMessages: (state, { payload }: { payload: MessageGroup[] }) => {
      state.messages = payload
    },

    addMessage: (state, { payload }: { payload: MessageRes }) => {
      if (!payload) return
      const { group_date = undefined, ...message } = payload

      if (group_date) {
        const newMessage = { group_date, message_ids: [message] }
        if (!state.messages?.length) {
          state.messages = [newMessage]
          return
        }

        state.messages.push(newMessage)
      } else {
        if (!state.messages?.length) {
          state.messages = [
            {
              group_date: group_date || {
                date_value: new Date().getDate() + "",
                hour_value: new Date().getHours() + "",
                name: "",
                time_type: "today",
                date_duration: 0,
              },
              message_ids: [message],
            },
          ]
          return
        }

        state.messages?.[state.messages?.length - 1 || 0]?.message_ids?.push(
          payload
        )
      }
    },

    setMoreMessages: (state, { payload }: { payload: MessageGroup[] }) => {
      state.messages = [...payload, ...(state.messages || [])]
    },

    setMessageLoading: (state, { payload }: { payload: boolean }) => {
      state.isMessageLoading = payload
    },

    setMessageUnreadCount: (state, { payload }: { payload: number }) => {
      state.messageUnreadCount = payload
    },

    setReplyMessage: (
      state,
      { payload }: { payload: ReplyMessageParams | undefined }
    ) => {
      state.replyMessage = payload
    },

    setLimitMessage: (state, { payload }: { payload: boolean | undefined }) => {
      state.isLimitMessage = payload
    },

    setFetchingMoreMessages: (
      state,
      { payload }: { payload: boolean | undefined }
    ) => {
      state.isFetchingMoreMessages = payload
    },

    setSendingMessage: (
      state,
      { payload }: { payload: undefined | boolean }
    ) => {
      state.isSendingMessage = payload
    },

    // setImagesBase64Preview: (
    //   state,
    //   { payload }: { payload: undefined | string[] }
    // ) => {
    //   state.imagesBase64Preview = payload
    // },

    // addImagesBase64: (state, { payload }: { payload: string[] }) => {
    //   if (!state.imagesBase64Preview?.length) {
    //     state.imagesBase64Preview = payload
    //   } else {
    //     state.imagesBase64Preview = [...payload, ...state.imagesBase64Preview]
    //   }
    // },

    // deleteImageBase64: (state, { payload }: { payload: string }) => {
    //   if (!state.imagesBase64Preview?.length) return
    //   state.imagesBase64Preview = [...state.imagesBase64Preview].filter(
    //     (item) => item !== payload
    //   )
    // },
  },
})

export const {
  setMessages,
  addMessage,
  setMessageLoading,
  setMessageUnreadCount,
  setMoreMessages,
  setReplyMessage,
  setLimitMessage,
  setFetchingMoreMessages,
  setSendingMessage,
} = messageSlice.actions

export default messageSlice.reducer
