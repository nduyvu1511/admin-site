import { formatTimeType } from "@/helper"
import { Channel } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import React from "react"

interface ChannelItemProps {
  channel: Channel
  onClick?: (channel: Channel) => void
  active?: boolean
  type: "channel" | "message"
  isLoading?: boolean
}

export const ChannelItem = ({
  channel,
  onClick,
  active,
  type,
  isLoading = false,
}: ChannelItemProps) => {
  if (isLoading)
    return (
      <div className="chat__channel-item-loading">
        <div className="channel__item-loading-avatar"></div>
        <div className="channel__item-loading-info">
          <div className="channel__item-loading-info-name"></div>
          <div className="channel__item-loading-info-message"></div>
        </div>
      </div>
    )

  return (
    <div
      onClick={() => onClick && onClick(channel)}
      className={`chat__channel-item chat__channel-item-${channel.channel_id} ${
        active ? "chat__channel-item-active" : ""
      }`}
    >
      <div
        className={`image-container chat__channel-item-avatar ${
          type === "message" ? "chat__channel-item-avatar-sm" : ""
        }`}
      >
        <Image
          src={`${API_URL}${channel.channel_image.image_url}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />

        {type === "channel" && channel.message_unread_counter > 0 ? (
          <span className="chat__channel-item-count">
            {channel.message_unread_counter > 9
              ? "9+"
              : channel.message_unread_counter}
          </span>
        ) : null}

        <span className="chat__channel-item-status"></span>
      </div>

      <div className="chat__channel-item-info">
        <p
          className={`chat__channel-item-info-name ${
            type === "message" ? "chat__channel-item-info-name-lg" : ""
          }`}
        >
          {channel.channel_name}
        </p>
        {type === "channel" && channel.last_message?.message_id ? (
          <div className="chat__channel-item-info-bottom">
            <p
              style={{
                color: channel?.last_message?.is_read ? "#9ca7b3" : "#142B42",
              }}
              className="chat__channel-item-info-msg"
            >
              {channel?.last_message?.description || ""}
            </p>
            {channel?.last_message?.time_ago?.time_type ? (
              <p className="chat__channel-item-info-date">
                {channel.last_message?.time_ago?.time_value === 0 ? (
                  "vài giây"
                ) : (
                  <>
                    {channel.last_message?.time_ago?.time_value}{" "}
                    {formatTimeType(
                      channel.last_message?.time_ago?.time_type || ""
                    )}
                  </>
                )}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
