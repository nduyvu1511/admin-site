import { createSlice } from "@reduxjs/toolkit"
import {
  Channel,
  ChannelSliceParams,
  LastMessageInChannelWithChannelId,
} from "models"

const initialState: ChannelSliceParams = {
  currentChannel: undefined,
  channels: [],
  isLoading: false,
  shouldFetchChannels: undefined,
  messagesUnreadCount: 0,
}

const chatSlice = createSlice({
  name: "chat_channel",
  initialState,
  reducers: {
    setCurrentChannel: (
      state,
      { payload }: { payload: Channel | undefined }
    ) => {
      state.currentChannel = payload
    },

    setChannels: (state, { payload }: { payload: Channel[] }) => {
      state.channels = payload
    },

    setLastedMessageToChannel: (
      state,
      { payload }: { payload: LastMessageInChannelWithChannelId }
    ) => {
      state.channels = [...state.channels]?.map((channel) =>
        channel.channel_id === payload.channel_id
          ? { ...channel, last_message: payload }
          : channel
      )
    },

    confirmReadMessageInChannel: (state, { payload }: { payload: number }) => {
      if (!state?.channels?.length) return

      state.channels = state.channels.map((item) =>
        item.channel_id === payload
          ? {
              ...item,
              message_unread_counter: 0,
              last_message: {
                ...item.last_message,
                is_read: true,
              },
            }
          : item
      )

      if (state?.currentChannel?.message_unread_counter) {
        state.currentChannel = {
          ...state.currentChannel,
          message_unread_counter: 0,
        }
      }
    },

    reArrangeChannels: (state, { payload }: { payload: Channel }) => {
      if (!state?.channels?.length) return

      state.channels = [
        payload,
        ...state.channels.filter(
          (item) => item.channel_id !== payload.channel_id
        ),
      ]
    },

    addChannel: (state, { payload }: { payload: Channel }) => {
      state.channels?.push(payload)
    },

    setChannelLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload
    },

    setShouldFetchChannels: (
      state,
      { payload }: { payload: boolean | undefined }
    ) => {
      state.shouldFetchChannels = payload
    },

    setMessagesUnreadCount: (state, { payload }: { payload: number }) => {
      state.messagesUnreadCount = payload
    },

    subtractMessagesUnreadCount: (state, { payload }: { payload: number }) => {
      state.messagesUnreadCount -= payload
    },
  },
})

export const {
  setCurrentChannel,
  setChannels,
  setLastedMessageToChannel,
  reArrangeChannels,
  confirmReadMessageInChannel,
  addChannel,
  setChannelLoading,
  setShouldFetchChannels,
  setMessagesUnreadCount,
  subtractMessagesUnreadCount,
} = chatSlice.actions

export default chatSlice.reducer
