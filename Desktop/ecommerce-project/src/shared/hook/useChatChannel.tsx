import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { AttachmentRes, Channel } from "@/models"
import {
  addChannel,
  confirmReadMessageInChannel,
  setChannelLoading
} from "@/modules"
import chatApi from "@/services/chatApi"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface ChannelSearchProps {
  isLoading: boolean | undefined
  channels: Channel[]
}

interface CreateChannelParams {
  channel: {
    channel_name: string
    partner_ids: number[]
    channel_image?: string
  }
  handleSuccess: Function
  handleError?: Function
}

interface ChatRes {
  channelsSearch: ChannelSearchProps
  searchChannel: (val: string) => void
  createChannel: (params: CreateChannelParams) => void
  fetchChannels: () => Promise<Channel[] | undefined>
  uploadImages: (
    attachments: { file: string; type: "image" }[],
    cb: (ids: number[]) => void,
    err?: Function
  ) => void
  clearSearchChannelLoading: Function
  clearMessageUnreadInChannel: (channel_id: number, cb?: Function) => void
}

const useChatChannel = (shouldFetch = true): ChatRes => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const [channelsSearch, setCurrentChannelsSearch] =
    useState<ChannelSearchProps>({
      channels: [],
      isLoading: undefined,
    })

  const clearSearchChannelLoading = () => {
    setCurrentChannelsSearch({ channels: [], isLoading: undefined })
  }

  const fetchChannels = async (): Promise<Channel[] | undefined> => {
    if (!token) return
    try {
      dispatch(setChannelLoading(true))
      const res: any = await chatApi.getChannels(token)
      dispatch(setChannelLoading(false))
      return res?.result?.data || []
    } catch (error) {
      dispatch(setChannelLoading(false))
      console.log(error)
    }

    return []
  }

  const searchChannel = async (channel_name: string) => {
    if (!token) return
    setCurrentChannelsSearch({
      channels: [],
      isLoading: true,
    })
    try {
      const res: any = await chatApi.searchChannel({ channel_name, token })
      if (res?.result?.success) {
        setCurrentChannelsSearch({
          channels: res?.result?.data || [],
          isLoading: false,
        })
      } else {
        setCurrentChannelsSearch({ channels: [], isLoading: false })
      }
    } catch (error) {
      setCurrentChannelsSearch({ channels: [], isLoading: false })
    }
  }

  const clearMessageUnreadInChannel = async (
    channel_id: number,
    cb?: Function
  ) => {
    if (!token || !channel_id) return

    try {
      const res: any = await chatApi.confirmReadMessage({ channel_id, token })
      if (res?.result?.success) {
        dispatch(confirmReadMessageInChannel(channel_id))
        cb && cb()
      }
    } catch (error) {
      console.log(error)
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

  const createChannel = async (params: CreateChannelParams) => {
    if (!token) return
    const {
      channel: { channel_name, partner_ids, channel_image = "" },
      handleSuccess,
      handleError,
    } = params
    try {
      const res: any = await chatApi.createChannel({
        channel_name,
        partner_ids,
        token,
        channel_image,
      })

      if (res?.result?.success) {
        if (!isObjectHasValue(res?.result?.data)) return
        const channel: Channel = res.result.data
        dispatch(addChannel(channel))
        handleSuccess(channel)
      } else {
        handleError && handleError()
      }
    } catch (error) {
      handleError && handleError()
    }
  }

  return {
    channelsSearch,
    searchChannel,
    createChannel,
    clearSearchChannelLoading,
    uploadImages,
    clearMessageUnreadInChannel,
    fetchChannels,
  }
}

export { useChatChannel }

