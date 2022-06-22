import { Token } from "./user"

export interface SearchChannelProps extends Token {
  channel_name: string
}

export interface GetMessageProps extends Token {
  channel_id: number
  limit?: number
  offset?: number
}

export interface CreateChannelProps extends SearchChannelProps {
  partner_ids: Array<number>
  channel_image?: string
}

export interface TimeAgo {
  time_value: number
  time_type: TIME_TYPE
}

export interface LastMessageInChannel {
  message_id: number
  author_id: number
  author_name: string
  author_avatar: string
  content: string
  description: string
  create_date: string
  time_duration: string
  is_attachment: boolean
  is_read: boolean
  time_ago: TimeAgo
}

export interface LastMessageInChannelWithChannelId
  extends LastMessageInChannel {
  channel_id: number
}

export interface Channel {
  channel_id: number
  channel_name: string
  channel_type: string
  channel_image: {
    image_url: string
    image_id: number
  }
  channel_partner_ids: ChannelPartnerItem[]
  message_unread_counter: number
  last_message: LastMessageInChannel
  time_ago: TimeAgo
  is_attachment: boolean
  author: ChannelPartnerItem
  is_author: boolean
}

export interface AttachmentRes {
  attachment_id: number
  image_id: number
  image_url: string
}

export interface SendMessagePropsNoToken {
  content: string
  channel_id: number
  parent_message_id?: number | false
  attachment_ids?: number[] | false
}

export interface SendMessageProps extends SendMessagePropsNoToken {
  token: string
}

export interface ChannelSearch {
  channel_id: number
  partner_id: number
  channel_name: string
  channel_image: {
    image_url: string
    image_id: number
  }
}

export type TIME_TYPE =
  | "day"
  | "second"
  | "hour"
  | "minute"
  | "year"
  | "month"
  | "week"

export interface GroupTimeType {
  hour_value: string
  date_value: string
  time_type: "today" | "yesterday" | "day" | "date" | "year"
  name: string
  date_duration?: number
}

export interface Message {
  message_id: number
  is_author: boolean
  date: string
  content: string
  author: {
    partner_id: number
    partner_name: string
    avatar_url: string
  }
  parent_message_id: {
    message_id: number
    date: string
    content: string
    description: string
    author: ChannelPartnerItem
  }
  attachments: {
    attachment_id: number
    stored_attachment_type: "image" | "video"
    attachment_url: string
  }[]
  time_ago: {
    time_value: number
    time_type: TIME_TYPE
  }
  create_date: string
}

export interface MessageRes extends Message {
  group_date?: GroupTimeType
}

export interface MessageGroup {
  group_date: GroupTimeType
  message_ids: Message[]
}

export interface PartnerSearch {
  channel_id: number | false
  partner_id: number
  channel_name: string
  channel_image: string
}

export interface MessagesInChannel {
  channel_id: number
  channel_name: string
  channel_image: {
    image_id: number
    image_url: string
  }
  channel_messages: Message[]
}

export interface ChatSliceProps {
  channel: {
    data: Channel[]
    isLoading: boolean
  }
  messageInChannel: {
    isLoading: boolean
    data: MessagesInChannel
  }
  search: {
    isLoading: boolean
    data: ChannelSearch[]
    initData: ChannelSearch[]
  }
  currentChannelIdActive: number
}

export interface ReplyMessageParams {
  message_id: number
  author_id: number
  author_name: string
  content: string
}

export interface ChannelSliceParams {
  currentChannel: Channel | undefined
  channels: Channel[]
  isLoading: boolean
  shouldFetchChannels: undefined | boolean
  messagesUnreadCount: number
}

export interface MessageSliceParams {
  messages: MessageGroup[]
  // imagesBase64Preview: string[] | undefined
  replyMessage: ReplyMessageParams | undefined
  messageUnreadCount: number | undefined
  isMessageLoading: boolean
  isSendingMessage: undefined | boolean
  isLimitMessage: undefined | boolean
  isFetchingMoreMessages: undefined | boolean
}

export interface ModalChatSliceParams {
  isOpenChatDesktop: boolean
  isOpenChatMobile: boolean
  isExpandChatModal: boolean
  isOpenChatMessage: boolean
}

interface ChannelPartnerItem {
  partner_id: number
  partner_name: string
  avatar_url: string
}

export interface MessageDetail {
  channel: {
    channel_alias: string
    channel_id: number
    channel_name: string
    channel_type: string
    channel_image: {
      image_id: number
      image_url: string
    }
    channel_partner_ids: ChannelPartnerItem[]
    time_ago: TimeAgo
    message_unread_counter: number
    last_message: LastMessageInChannel
  }
  channel_messages: MessageGroup[]
}
