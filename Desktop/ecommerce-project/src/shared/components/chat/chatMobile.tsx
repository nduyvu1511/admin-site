import { RootState } from "@/core/store"
import {
  setCurrentChannel,
  setOpenChatMobile,
  setShouldFetchChannels,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { CgClose } from "react-icons/cg"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { ChannelItem } from "./channel/channelItem"
import { ChatChannel } from "./channel/chatChannel"
import { ChatMessage } from "./message/chatMessage"

export const ChatMobile = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { currentChannel } = useSelector((state: RootState) => state.channel)

  return (
    <div className="chat__mobile">
      {!currentChannel?.channel_id ? (
        <header className="chat__mobile-header">
          <div className="image-container">
            <Image
              src={`${API_URL}${userInfo?.avatar || ""}`}
              layout="fill"
              alt=""
              objectFit="cover"
            />
          </div>
          <p className="chat__mobile-header-title">Chat</p>
          <button
            onClick={() => {
              dispatch(setOpenChatMobile(false))
              dispatch(setShouldFetchChannels(undefined))
            }}
            className="btn-reset chat__mobile-header-btn"
          >
            <CgClose />
          </button>
        </header>
      ) : (
        <div className="chat__mobile-header-channel">
          <button
            onClick={() => {
              dispatch(setCurrentChannel())
              dispatch(setShouldFetchChannels(false))
            }}
            className="btn-reset"
          >
            <IoIosArrowBack />
          </button>
          <div className="chat__mobile-header-channel-info">
            <ChannelItem type="message" channel={currentChannel} />
          </div>
          <button
            onClick={() => {
              dispatch(setOpenChatMobile(false))
              dispatch(setShouldFetchChannels(undefined))
            }}
            className="btn-reset"
          >
            <CgClose />
          </button>
        </div>
      )}

      <div className="chat__mobile-body">
        {currentChannel?.channel_id ? (
          <div className="chat__mobile-body-message">
            <ChatMessage />
          </div>
        ) : (
          <div className="chat__mobile-body-channel">
            <ChatChannel />
          </div>
        )}
      </div>
    </div>
  )
}
