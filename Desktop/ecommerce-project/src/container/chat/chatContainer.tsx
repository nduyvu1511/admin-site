import { messageIcon } from "@/assets"
import { ChatDesktop, ChatMobile } from "@/components"
import { RootState } from "@/core/store"
import {
  setMessagesUnreadCount,
  setOpenChatDesktop,
  setOpenLoginModal,
} from "@/modules"
import chatApi from "@/services/chatApi"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAuth } from "shared/hook"

const ChatContainer = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const [isAuth, setAuth] = useState<boolean>(false)
  const { isExpandChatModal, isOpenChatDesktop, isOpenChatMobile } =
    useSelector((state: RootState) => state.chatModal)
  const { currentChannel, messagesUnreadCount } = useSelector(
    (state: RootState) => state.channel
  )
  const { getUserInfo } = useAuth()

  useEffect(() => {
    if (!token) {
      setAuth(false)
      return
    }

    getUserInfo(
      token,
      () => {
        setAuth(true)
      },
      () => {
        setAuth(false)
      }
    )
  }, [token])

  useEffect(() => {
    if (!token) return

    chatApi.getCountUnreadMessageChannel(token).then((res: any) => {
      const messageCount = res?.result?.data?.count_unread_message_channel || 0
      dispatch(setMessagesUnreadCount(messageCount))
    })
  }, [])

  return (
    <section className="chat-container">
      <button
        onClick={() =>
          dispatch(!isAuth ? setOpenLoginModal(true) : setOpenChatDesktop(true))
        }
        className="chat-btn"
      >
        {messageIcon}Chat
        <span className="chat-btn-count">{messagesUnreadCount}</span>
      </button>

      {isOpenChatDesktop ? (
        <div
          className={`chat__modal ${
            currentChannel?.channel_id ? "chat__modal-expand" : ""
          } ${isExpandChatModal ? "chat__modal-full" : ""}`}
        >
          <ChatDesktop />
        </div>
      ) : null}

      {isOpenChatMobile ? <ChatMobile /> : null}
    </section>
  )
}

export default ChatContainer
