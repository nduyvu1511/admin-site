import { RootState } from "@/core/store"
import { LIMIT_MESSAGES } from "@/helper"
import {
  AttachmentRes,
  MessageDetail,
  MessageGroup,
  MessageSliceParams,
} from "@/models"
import {
  addMessage,
  setFetchingMoreMessages,
  setLimitMessage,
  setMessageLoading,
  setMessages,
  setMoreMessages,
  setSendingMessage,
} from "@/modules"
import chatApi from "@/services/chatApi"
import { useDispatch, useSelector } from "react-redux"

interface SendMessageParams {
  content: string
  channel_id: number
  imagesBase64: string[] | undefined
}

interface ChatMessageRes extends MessageSliceParams {
  sendMessage: (
    params: SendMessageParams,
    handlSuccess: Function,
    handleError?: Function
  ) => void
  uploadImages: (
    attachments: { file: string; type: "image" }[],
    cb: (ids: number[]) => void,
    err?: Function
  ) => void
  getMessagesInChannel: (channel_id: number, limit?: number) => void
  getMoreMessages: (channel_id: number, offset: number) => void
  getMessagesByIds: (
    message_ids: number[]
  ) => Promise<MessageDetail[] | undefined>
}

const fetchMessages = async (token: string, channel_id: number, offset = 0) => {
  try {
    const res: any = await chatApi.getMessagesInChannel({
      channel_id,
      token,
      offset,
      limit: LIMIT_MESSAGES,
    })
    return res?.result?.data?.channel_messages || []
  } catch (error) {
    console.log(error)
  }
}

const useChatMessage = (): ChatMessageRes => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const {
    messages,
    isFetchingMoreMessages,
    isLimitMessage,
    isMessageLoading,
    isSendingMessage,
    messageUnreadCount,
    replyMessage,
  } = useSelector((state: RootState) => state.message)

  const getMoreMessages = async (channel_id: number, offset: number) => {
    try {
      dispatch(setFetchingMoreMessages(true))
      const messagesFetch: MessageGroup[] = await fetchMessages(
        token,
        channel_id,
        offset * LIMIT_MESSAGES
      )
      dispatch(setFetchingMoreMessages(false))
      setTimeout(() => {
        dispatch(setFetchingMoreMessages(undefined))
      }, 0)
      dispatch(setMoreMessages(messagesFetch))

      if (!messagesFetch?.length) {
        dispatch(setLimitMessage(true))
        return
      }

      document
        .querySelector(
          `.message__item-${messages?.[0]?.message_ids?.[0]?.message_id}`
        )
        ?.scrollIntoView()

      if (
        messagesFetch.reduce((a, b) => a + (b.message_ids?.length || 0), 0) <
        LIMIT_MESSAGES
      ) {
        dispatch(setLimitMessage(true))
      }
    } catch (error) {
      console.log(error)
      dispatch(setFetchingMoreMessages(undefined))
    }
  }

  const getMessagesByIds = async (
    message_ids: number[]
  ): Promise<MessageDetail[] | undefined> => {
    try {
      const res: any = await chatApi.getMessagesByIds({ token, message_ids })
      if (res?.result?.success) {
        return res?.result?.data || []
      }
    } catch (error) {
      console.log(error)
    }
    return
  }

  const getMessagesInChannel = async (channel_id: number) => {
    try {
      dispatch(setMessageLoading(true))
      const messages = await fetchMessages(token, channel_id)
      dispatch(setMessageLoading(false))
      dispatch(setMessages(messages || []))
    } catch (error) {
      console.log(error)
      dispatch(setMessageLoading(false))
    }
  }

  const sendMessage = async (
    params: SendMessageParams,
    handleSuccess: Function,
    handleError?: Function
  ) => {
    const { content, channel_id, imagesBase64 } = params
    if (!token || !content || !channel_id) return

    try {
      dispatch(setSendingMessage(true))
      if (!imagesBase64?.length) {
        const res: any = await chatApi.sendMessage({
          token,
          channel_id: channel_id,
          content,
          parent_message_id: replyMessage?.message_id || false,
        })
        dispatch(setSendingMessage(false))
        if (res?.result?.success) {
          dispatch(addMessage(res?.result?.data))
          handleSuccess && handleSuccess(res?.result?.data?.message_id || 0)
        }
        return
      }

      uploadImages(
        imagesBase64.map((url) => ({
          file: url.replace(/^data:image\/\w+;base64,/, ""),
          type: "image",
        })),
        async (ids: number[]) => {
          dispatch(setSendingMessage(false))
          const res: any = await chatApi.sendMessage({
            token,
            channel_id,
            content,
            attachment_ids: ids,
            parent_message_id: replyMessage?.message_id || false,
          })
          if (res?.result?.success) {
            dispatch(addMessage(res?.result?.data))
            handleSuccess && handleSuccess(res?.result?.data?.message_id || 0)
          }
        }
      )
    } catch (error) {
      dispatch(setSendingMessage(false))
      handleError && handleError()
    }
  }

  const uploadImages = async (
    attachments: { file: string; type: "image" }[],
    cb: Function,
    err?: Function
  ) => {
    if (!token) return
    try {
      const res: any = await chatApi.createAttachment({
        token,
        attachments,
      })
      if (res?.result?.success) {
        cb(res.result.data.map((item: AttachmentRes) => item.attachment_id))
      } else {
        err && err()
      }
    } catch (error) {
      err && err()
      console.log(error)
    }
  }

  return {
    sendMessage,
    uploadImages,
    getMoreMessages,
    messages,
    isFetchingMoreMessages,
    isLimitMessage,
    isMessageLoading,
    isSendingMessage,
    messageUnreadCount,
    replyMessage,
    getMessagesInChannel,
    getMessagesByIds,
  }
}

export { useChatMessage }
