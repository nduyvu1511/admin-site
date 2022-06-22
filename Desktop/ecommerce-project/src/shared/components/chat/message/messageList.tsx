/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from "@/core/store"
import { formatGroupTimeType, LIMIT_MESSAGES } from "@/helper"
import { MessageGroup } from "@/models"
import { useEffect, useRef, useState } from "react"
import { RiLoader2Fill } from "react-icons/ri"
import { useInView } from "react-intersection-observer"
import { useSelector } from "react-redux"
import { MessageItem } from "./messageItem"

interface MessageListProps {
  messages: MessageGroup[]
  onGetMoreMessages?: (offset: number) => void
}

const MessageList = ({ messages, onGetMoreMessages }: MessageListProps) => {
  const chatRef = useRef<HTMLLIElement>(null)
  const chatListRef = useRef<HTMLUListElement>(null)
  const { isLimitMessage, isFetchingMoreMessages } = useSelector(
    (state: RootState) => state.message
  )
  const { isOpenChatMobile } = useSelector(
    (state: RootState) => state.chatModal
  )
  const { ref, inView } = useInView()
  const [offset, setOffset] = useState<number>(0)
  const secondRef = useRef<boolean>(false)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!secondRef.current) {
      if (isOpenChatMobile) {
        secondRef.current = true
      }
      return
    }

    if (!inView) return
    if (isLimitMessage || isFetchingMoreMessages) return
    if (!messages?.length) return
    if (messages.reduce((a, b) => a + b.message_ids.length, 0) < LIMIT_MESSAGES)
      return

    onGetMoreMessages && onGetMoreMessages(offset + 1)
    setOffset(offset + 1)
  }, [inView])

  useEffect(() => {
    if (isFetchingMoreMessages === false) return
    chatRef.current?.scrollIntoView()

    if (!isOpenChatMobile) {
      secondRef.current = true
    }
  }, [messages])

  return (
    <ul ref={listRef} className="chat__message-group-list">
      <div ref={ref}></div>

      {isFetchingMoreMessages ? (
        <div className="chat__message-group-load-more">
          <RiLoader2Fill className="loader" />
        </div>
      ) : null}

      {messages.map((message, index) => {
        const messageChilds = message?.message_ids || []

        return (
          <div key={index}>
            <div className="chat__message-group-date">
              <span></span>
              <p>{formatGroupTimeType(message.group_date)}</p>
              <span></span>
            </div>

            <li className="chat__message-group-list-item">
              <ul ref={chatListRef} className="chat__message-list">
                {messageChilds?.length > 0
                  ? messageChilds.map((item, index) => {
                      const prevMessage = messageChilds[index - 1]
                      const nextMessage = messageChilds[index + 1]
                      const isBreak =
                        !prevMessage ||
                        prevMessage?.author.partner_id !==
                          item.author.partner_id
                      const isLast =
                        !nextMessage ||
                        nextMessage?.author.partner_id !==
                          item.author.partner_id

                      return (
                        <li
                          ref={chatRef}
                          key={index}
                          className="chat__message-item"
                        >
                          <MessageItem
                            message={item}
                            isBreak={isBreak}
                            isLast={isLast}
                          />
                        </li>
                      )
                    })
                  : null}
              </ul>
            </li>
          </div>
        )
      })}
    </ul>
  )
}

export default MessageList
