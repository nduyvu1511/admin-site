import {
  AttachmentParams,
  CreateChannelProps,
  GetMessageProps,
  SearchChannelProps,
  SendMessageProps,
  Token,
} from "@/models"
import axiosClient from "."

const chatApi = {
  getChannels: (token: string, limit = 50, offset = 0) => {
    return axiosClient.post("/information_channel/get_channel", {
      params: {
        token,
        limit,
        offset,
      },
    })
  },

  searchChannel: (params: SearchChannelProps) => {
    return axiosClient.post("/information_channel/search_channel", {
      params: params,
    })
  },

  createChannel: (params: CreateChannelProps) => {
    return axiosClient.post("/information_channel/create_group_channel", {
      params: params,
    })
  },

  sendMessage: (params: SendMessageProps) => {
    return axiosClient.post("/message/send_message", {
      params: params,
    })
  },

  getMessagesInChannel: (params: GetMessageProps) => {
    return axiosClient.post("/message/get_message_in_channel", {
      params: params,
    })
  },

  confirmReadMessage: (params: { token: string; channel_id: number }) => {
    return axiosClient.post("/message/read_message", {
      params: params,
    })
  },

  getCountUnreadMessageChannel: (token: string) => {
    return axiosClient.post(
      "/information_channel/count_unread_message_channel",
      {
        params: { token },
      }
    )
  },

  createAttachment: (params: AttachmentParams) => {
    return axiosClient.post("/message/create_attachment", {
      params: params,
    })
  },

  getMessagesByIds: (params: { token: string; message_ids: number[] }) => {
    return axiosClient.post("/message/get_detail_message", { params: params })
  },
}

export default chatApi
