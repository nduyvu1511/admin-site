import { RootState } from "@/core/store"
import {
  setFetchingMoreMessages,
  setLimitMessage,
  setReplyMessage,
} from "@/modules"
import Image from "next/image"
import React, { useEffect } from "react"
import { CgClose } from "react-icons/cg"
import { RiLoader2Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useAttachment, useChatMessage } from "shared/hook"
import { ChatForm } from "./chatForm"
import MessageList from "./messageList"
import { MessageMentionItem } from "./MessageMentionItem"

export const ChatMessage = () => {
  const dispatch = useDispatch()

  const { messages, isMessageLoading, replyMessage, isSendingMessage } =
    useSelector((state: RootState) => state.message)
  const { currentChannel } = useSelector((state: RootState) => state.channel)
  const { getMoreMessages } = useChatMessage()
  const {
    images: imagesBase64Preview,
    deleteImage,
    getBase64Images,
    setImages: setImagesPreview,
  } = useAttachment({
    limit: 10,
  })

  useEffect(() => {
    return () => {
      dispatch(setLimitMessage(undefined))
      dispatch(setFetchingMoreMessages(undefined))
    }
  }, [])

  const handleChooseImages = (files: FileList) => {
    getBase64Images(files)
  }

  const handleDeleteImage = (image: string) => {
    deleteImage(image)
  }

  const isimagesPreviewHasValue =
    imagesBase64Preview && (imagesBase64Preview?.length || 0) > 0

  return (
    <>
      {isMessageLoading ? (
        <div className="loader-container">
          <RiLoader2Fill className="loader" />
        </div>
      ) : null}

      <div className="chat__message-body">
        {!isMessageLoading && messages && messages?.length > 0 ? (
          <MessageList
            onGetMoreMessages={(offset: number) =>
              currentChannel?.channel_id &&
              getMoreMessages(currentChannel.channel_id, offset)
            }
            messages={messages}
          />
        ) : null}
      </div>

      {isimagesPreviewHasValue || replyMessage?.message_id ? (
        <div
          style={{ pointerEvents: isSendingMessage ? "none" : "unset" }}
          className="chat__message-preview"
        >
          {isimagesPreviewHasValue ? (
            <button
              onClick={() => {
                dispatch(setReplyMessage(undefined))
                setImagesPreview(undefined)
              }}
              className="chat__message-preview-close-btn btn-reset"
            >
              <CgClose />
            </button>
          ) : null}

          {replyMessage?.message_id ? (
            <div
              style={{
                marginBottom: isimagesPreviewHasValue ? "1.4rem" : 0,
                marginTop: isimagesPreviewHasValue ? "2.4rem" : 0,
              }}
              className="chat__message-preview-mention"
            >
              <MessageMentionItem
                message={replyMessage.content}
                name={replyMessage.author_name}
                onClick={() => dispatch(setReplyMessage(undefined))}
              />
            </div>
          ) : null}

          {isimagesPreviewHasValue ? (
            <div className="chat__message-preview-image">
              <p className="chat__message-preview-text">
                <strong>{imagesBase64Preview?.length || 0}</strong> ảnh được
                chọn
              </p>
              <ul className="chat__message-preview-list">
                {imagesBase64Preview?.map((url, index) => (
                  <li key={index} className="chat__message-preview-list-item">
                    <div className="image-container">
                      <Image
                        quality={40}
                        objectFit="cover"
                        src={url}
                        layout="fill"
                        alt=""
                      />
                      <button
                        onClick={() => handleDeleteImage(url)}
                        className="btn-reset chat__message-close-btn"
                      >
                        <CgClose />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="chat__message-form">
        <ChatForm
          clearImagesBase64={() => setImagesPreview(undefined)}
          imagesBase64Preview={imagesBase64Preview}
          onChooseImages={(files) => handleChooseImages(files)}
        />
      </div>
    </>
  )
}
