import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { convertViToEn } from "@/helper"
import { Channel } from "@/models"
import {
  reArrangeChannels,
  setChannels,
  setCurrentChannel,
  setLimitMessage,
  setOpenChatMessage,
  setReplyMessage,
  subtractMessagesUnreadCount
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { FiSearch } from "react-icons/fi"
import { IoIosCloseCircle } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import {
  useChatChannel,
  useChatMessage,
  useDebounce,
  useInputText
} from "shared/hook"
import { ChannelItem } from "./channelItem"

export const ChatChannel = () => {
  const dispatch = useDispatch()
  const { onChange, value, clearValue } = useInputText("")
  const val = useDebounce(value, 400)
  const channelScrollRef = useRef<HTMLSpanElement>(null)
  const {
    searchChannel,
    createChannel,
    channelsSearch: {
      channels: channelsSearch = [],
      isLoading: isSeachLoading,
    },
    clearSearchChannelLoading,
    clearMessageUnreadInChannel,
    fetchChannels,
  } = useChatChannel()
  const { getMessagesInChannel } = useChatMessage()
  const { currentChannel, channels, isLoading, shouldFetchChannels } =
    useSelector((state: RootState) => state.channel)
  const { replyMessage } = useSelector((state: RootState) => state.message)

  useEffect(() => {
    if (shouldFetchChannels !== undefined) return
    fetchChannels().then((channels) => dispatch(setChannels(channels || [])))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleSelectChannel = (channel: Channel) => {
    if (!channel?.channel_id) return
    if (currentChannel?.channel_id === channel.channel_id) return

    dispatch(setOpenChatMessage(false))
    dispatch(setCurrentChannel(channel))

    setTimeout(() => {
      dispatch(setOpenChatMessage(true))
      getMessagesInChannel(channel.channel_id)
    }, 0)

    if (replyMessage?.author_id) {
      dispatch(setReplyMessage(undefined))
    }

    dispatch(setLimitMessage(undefined))

    if (
      channel.message_unread_counter > 0 ||
      channel.last_message?.is_read === false
    ) {
      clearMessageUnreadInChannel(channel.channel_id)
      dispatch(subtractMessagesUnreadCount(1))
    }
  }

  const handleCreateChannel = (channel: any) => {
    if (channel?.channel_id) {
      handleSelectChannel(channel as Channel)
      document
        .querySelector(`.chat__channel-item-${channel.channel_id}`)
        ?.scrollIntoView()
      clearValue()
      clearSearchChannelLoading()
    } else {
      createChannel({
        channel: {
          channel_name: channel.channel_name,
          partner_ids: [channel?.partner_id || (0 as number)],
          channel_image: "",
        },
        handleSuccess: (channel: Channel) => {
          handleSelectChannel(channel)
          clearValue()
          clearSearchChannelLoading()
          dispatch(reArrangeChannels(channel))
          channelScrollRef.current?.scrollIntoView()
        },
      })
    }
  }

  useEffect(() => {
    if (!val) return
    searchChannel(convertViToEn(val))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val])

  return (
    <div className="chat__channel">
      <div className="chat__channel-search">
        <div className="chat__channel-search-input">
          <FiSearch className="chat__channel-search-input-icon" />
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Tìm theo tên người dùng..."
          />
          {value ? (
            <button
              onClick={() => clearValue()}
              className="btn-reset chat__channel-search-close-btn"
            >
              <IoIosCloseCircle />
            </button>
          ) : null}
        </div>

        {/* Chat search channel result */}
        {value ? (
          <div className="chat__channel-search-result">
            {isSeachLoading === false && channelsSearch?.length === 0 ? (
              <div className="chat--no-result">
                {cartEmptyIcon}
                <p>Không tìm thấy cuộc hội thoại nào</p>
              </div>
            ) : null}

            <ul className="chat__result-list">
              {channelsSearch.map((item, index) => (
                <li
                  onClick={() => handleCreateChannel(item)}
                  key={index}
                  className="chat__result-list-item"
                >
                  <div className="image-container chat__result-list-item-image">
                    <Image
                      objectFit="cover"
                      src={`${API_URL}${
                        item.channel_image?.image_url || item.channel_image
                      }`}
                      alt={item.channel_name}
                      layout="fill"
                    />
                  </div>

                  <p className="chat__result-list-item-name">
                    {item.channel_name}
                  </p>
                </li>
              ))}

              {isSeachLoading
                ? Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="chat__result-list-item-loading">
                      <div className="chat__result-list-item-loading-avatar"></div>
                      <div className="chat__result-list-item-loading-name"></div>
                    </div>
                  ))
                : null}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="chat__channel-body">
        <ul className="chat__channel-list">
          <span ref={channelScrollRef}></span>

          {isLoading
            ? Array.from({ length: 20 }).map((item: any, index) => (
                <ChannelItem
                  key={index}
                  isLoading={isLoading}
                  type="channel"
                  onClick={(channel) => handleSelectChannel(channel)}
                  channel={item}
                />
              ))
            : null}

          {!isLoading && channels?.length > 0
            ? channels.map((channel, index) => (
                <li key={index} className="chat__channel-list-item">
                  <ChannelItem
                    isLoading={isLoading}
                    type="channel"
                    onClick={(channel) => handleSelectChannel(channel)}
                    channel={channel}
                    active={currentChannel?.channel_id === channel.channel_id}
                  />
                </li>
              ))
            : null}
        </ul>

        {!isLoading && channels?.length === 0 ? (
          <div className="chat--no-result">
            {cartEmptyIcon}
            <p>Không tìm thấy cuộc hội thoại nào</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
