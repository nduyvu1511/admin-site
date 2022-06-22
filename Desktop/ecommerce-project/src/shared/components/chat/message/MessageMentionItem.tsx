import { RootState } from "@/core/store"
import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux"

interface MessageMentionItemProps {
  name: string
  message: string
  message_parent_id?: number
  onClick?: Function
}

export const MessageMentionItem = ({
  message,
  name,
  onClick,
  message_parent_id,
}: MessageMentionItemProps) => {
  const { messages } = useSelector((state: RootState) => state.message)
  return (
    <div
      style={{ cursor: onClick ? "default" : "pointer" }}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) return
        const messageView = document.querySelector(
          `.message__item-${message_parent_id}`
        )

        if (messageView) {
          messageView?.scrollIntoView({ behavior: "smooth" })
        } else {
          document
            .querySelector(
              `.message__item-${messages?.[0]?.message_ids?.[0]?.message_id}`
            )
            ?.scrollIntoView({ behavior: "smooth" })
        }
      }}
      className="chat__message-mention"
    >
      {onClick ? (
        <button
          onClick={() => onClick()}
          className="chat__message-close-btn btn-reset"
        >
          <CgClose />
        </button>
      ) : null}

      <p className="chat__message-mention-name">
        Trả lời <strong>“{name}”</strong>
      </p>
      <div
        className="chat__message-mention-content"
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      ></div>
    </div>
  )
}
