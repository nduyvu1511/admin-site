import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { toggleHTMLOverflow } from "@/helper"
import { toggleExpandChatModal, setOpenChatDesktop } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { CgArrowsExpandRight, CgClose, CgCompressRight } from "react-icons/cg"
import { ImFileEmpty } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { ChannelItem } from "./channel/channelItem"
import { ChatChannel } from "./channel/chatChannel"
import { ChatMessage } from "./message/chatMessage"

export const ChatDesktop = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { currentChannel } = useSelector((state: RootState) => state.channel)
  const { isExpandChatModal, isOpenChatMessage } = useSelector(
    (state: RootState) => state.chatModal
  )

  const handleExpandChatModal = () => {
    dispatch(toggleExpandChatModal(!isExpandChatModal))
    toggleHTMLOverflow(!isExpandChatModal ? "hidden" : "unset")
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__header-info">
          <div className="image-container chat__header-info-avatar">
            <Image
              alt=""
              objectFit="cover"
              src={`${API_URL}${userInfo?.avatar}`}
              layout="fill"
              quality={40}
            />
          </div>
          <p className="chat__header-info-name">{userInfo?.name}</p>
        </div>
        <div className="chat__header-actions">
          <button
            onClick={() => handleExpandChatModal()}
            className="btn-reset chat__header-actions-expand-btn"
          >
            {isExpandChatModal ? <CgCompressRight /> : <CgArrowsExpandRight />}
          </button>

          <button
            onClick={() => {
              toggleHTMLOverflow("unset")
              dispatch(setOpenChatDesktop(false))
            }}
            className="btn-reset chat__header-actions-close-btn"
          >
            <CgClose />
          </button>
        </div>
      </header>

      <div className="chat__body">
        <div className="chat__body-channel">
          <ChatChannel />
        </div>

        {currentChannel?.channel_id ? (
          <div className="chat__body-message">
            <div className="chat__message">
              {currentChannel ? (
                <div className="chat__message-channel">
                  <ChannelItem type="message" channel={currentChannel} />
                </div>
              ) : null}
              {isOpenChatMessage ? <ChatMessage /> : null}
            </div>
          </div>
        ) : null}

        {!currentChannel?.channel_id && isExpandChatModal ? (
          <div className="chat__body-message-empty">
            <ImFileEmpty />

            <p>Vui lòng chọn nhóm chat để bắt đầu một cuộc trò chuyện</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
