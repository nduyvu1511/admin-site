import { RootState } from "@/core/store"
import {
  reArrangeChannels,
  setFetchingMoreMessages,
  setLastedMessageToChannel,
  setReplyMessage,
} from "@/modules"
import React, { ChangeEvent, useEffect, useRef } from "react"
import { MdOutlineInsertPhoto, MdSend } from "react-icons/md"
import { RiLoader2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useChatMessage, useInputText } from "shared/hook"

interface ChatFormProps {
  onChooseImages?: (files: FileList) => void
  imagesBase64Preview: string[] | undefined
  clearImagesBase64: Function
}

export const ChatForm = ({
  onChooseImages,
  imagesBase64Preview,
  clearImagesBase64,
}: ChatFormProps) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const { value, onChange, clearValue } = useInputText("")
  const { sendMessage } = useChatMessage()
  const { currentChannel, channels } = useSelector(
    (state: RootState) => state.channel
  )
  const { replyMessage, isSendingMessage, isFetchingMoreMessages } =
    useSelector((state: RootState) => state.message)

  useEffect(() => {
    inputRef.current?.focus()
  }, [replyMessage])

  const chooseImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    onChooseImages && onChooseImages(files)
  }

  const handleSendMessage = () => {
    if (!value || isSendingMessage || !currentChannel?.channel_id) return
    sendMessage(
      {
        channel_id: currentChannel.channel_id,
        content: value,
        imagesBase64: imagesBase64Preview,
      },
      (message_id: number) => {
        if (replyMessage?.author_id) {
          dispatch(setReplyMessage(undefined))
        }

        if (currentChannel?.channel_id) {
          document
            .querySelector(`.chat__channel-item-${channels?.[0]?.channel_id}`)
            ?.scrollIntoView()
          if (channels?.[0]?.channel_id !== currentChannel?.channel_id) {
            dispatch(reArrangeChannels(currentChannel))
          }

          dispatch(
            setLastedMessageToChannel({
              author_avatar: "",
              author_id: 0,
              author_name: "",
              channel_id: currentChannel?.channel_id,
              content: `<p>${value}</p>`,
              description: value,
              create_date: "",
              is_attachment: !!imagesBase64Preview?.length,
              is_read: true,
              message_id,
              time_ago: { time_type: "second", time_value: 0 },
              time_duration: "",
            })
          )
        }

        if (imagesBase64Preview && imagesBase64Preview?.length > 0) {
          clearImagesBase64 && clearImagesBase64()
        }
        clearValue()
      }
    )
  }

  return (
    <form
      style={{ pointerEvents: isSendingMessage ? "none" : "unset" }}
      onSubmit={(e) => {
        e.preventDefault()
        handleSendMessage()
      }}
      className="chat__form"
    >
      <input
        onChange={(e) => chooseImages(e)}
        type="file"
        multiple
        hidden
        name=""
        id="input-file"
      />
      <label
        htmlFor="input-file"
        style={{ pointerEvents: isSendingMessage ? "none" : "unset" }}
        className="btn-reset chat__form-image-button"
      >
        <MdOutlineInsertPhoto />
      </label>
      <div className="chat__form-input">
        <input ref={inputRef} value={value} onChange={onChange} type="text" />
        <button type="submit" className="btn-reset">
          {!isSendingMessage ? (
            <MdSend
              className={`chat__form-input-icon ${
                value ? "chat__form-input-icon-active" : ""
              }`}
            />
          ) : (
            <RiLoader2Fill className="chat__form-input-icon loader" />
          )}
        </button>
      </div>
    </form>
  )
}
