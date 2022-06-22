import { RootState } from "@/core/store"
import { Message } from "@/models"
import { setPreviewImageUrl, setReplyMessage } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { MessageMentionItem } from "./MessageMentionItem"

interface MessageItemProps {
  message: Message
  isLast?: boolean
  isBreak?: boolean
}

export const MessageItem = ({
  message,
  isLast = false,
  isBreak = false,
}: MessageItemProps) => {
  const dispatch = useDispatch()
  const { isSendingMessage } = useSelector((state: RootState) => state.message)
  const { currentChannel } = useSelector((state: RootState) => state.channel)
  const { isExpandChatModal } = useSelector(
    (state: RootState) => state.chatModal
  )

  return (
    <div
      style={{ pointerEvents: isSendingMessage ? "none" : "unset" }}
      className={`message__item message__item-${message.message_id} ${
        message.is_author ? "message__item-self" : ""
      }`}
    >
      {isBreak ? <br /> : null}
      {isBreak ? (
        !message.is_author ? (
          <div className="message__item-partner">
            <div className="image-container message__item-partner-avatar">
              <Image
                quality={40}
                src={`${API_URL}${message.author.avatar_url}`}
                layout="fill"
                alt=""
                objectFit="cover"
              />
            </div>

            {currentChannel &&
            currentChannel?.channel_partner_ids?.length > 0 ? (
              <p className="message__item-partner-name">
                {" "}
                {message.author.partner_name}
              </p>
            ) : null}
          </div>
        ) : null
      ) : null}

      {message.content ? (
        <div
          onClick={() =>
            !isSendingMessage &&
            dispatch(
              setReplyMessage({
                author_id: message.author.partner_id,
                author_name: message.author.partner_name,
                message_id: message.message_id,
                content: message.content,
              })
            )
          }
          className="message__item-text"
        >
          {message?.parent_message_id?.message_id ? (
            <div style={{ marginBottom: "0.5rem" }} className="">
              <MessageMentionItem
                message_parent_id={message.parent_message_id.message_id}
                message={message.parent_message_id.content}
                name={message.parent_message_id.author.partner_name}
              />
            </div>
          ) : null}

          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: message?.content || "",
            }}
          ></div>

          {isLast ? (
            <p className="message__item-text-date">{message.create_date}</p>
          ) : null}
        </div>
      ) : null}

      {message.attachments?.length > 0 ? (
        <div
          className={`message__item-image-list ${
            !isExpandChatModal ? "message__item-image-list-sm" : ""
          } ${
            message.attachments.length > 2
              ? isExpandChatModal
                ? "message__item-image-list--tripple"
                : "message__item-image-list--double"
              : message.attachments?.length > 1
              ? "message__item-image-list--double"
              : ""
          }`}
        >
          {message.attachments.map((img) => (
            <div
              key={img.attachment_id}
              onClick={() =>
                dispatch(setPreviewImageUrl(`${API_URL}${img.attachment_url}`))
              }
              className="image-container message__item-image-list-image"
            >
              <Image
                src={`${API_URL}${img.attachment_url}`}
                alt=""
                layout="fill"
                objectFit="cover"
                quality={30}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
