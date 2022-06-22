/* eslint-disable @next/next/no-img-element */
import { avatar } from "@/assets"
import { formatTimeType } from "@/helper"
import { CommentRating } from "@/models"
import { setPreviewImageUrl } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import React from "react"
import { useDispatch } from "react-redux"
import { Tag } from "../common"
import { Star } from "../star"

interface RatingItemProps {
  rating: CommentRating
  onDelete?: (product_id: number) => void
}

export const RatingItem = ({ rating, onDelete }: RatingItemProps) => {
  const dispatch = useDispatch()

  return (
    <div className="rating__item">
      <div className="rating__item-avatar">
        <div className="image-container">
          <Image
            src={
              rating?.partner_avatar
                ? `${API_URL}${rating?.partner_avatar}`
                : avatar
            }
            alt=""
            layout="fill"
            quality={20}
            className="image"
          />
        </div>
      </div>

      <div className="rating__item-content">
        <div
          className="rating__item-content-name"
          dangerouslySetInnerHTML={{ __html: rating.partner_name }}
        ></div>
        <div className="rating__item-content-rate">
          <Star
            readonly
            size={15}
            ratingValue={(rating.star_rating_int || 0) * 20}
          />
          <p className="rating__item-content-time">
            {rating.time_duration.time_value}{" "}
            {formatTimeType(rating.time_duration.time_type)} trước
          </p>
        </div>

        <div
          className="rating__item-content-desc"
          dangerouslySetInnerHTML={{ __html: rating.content }}
        ></div>

        {rating?.rating_tag?.length > 0 ? (
          <div className="rating__item-content-tags">
            {rating.rating_tag.map((item, index) => (
              <Tag
                key={index}
                size="md"
                disabled={true}
                name={item.tag_content}
                id={index}
              />
            ))}
          </div>
        ) : null}

        {rating.image_urls?.length > 0 ? (
          <div className="rating__item-content-image">
            {rating.image_urls.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  dispatch(setPreviewImageUrl(`${API_URL}${item.image_url}`))
                }
                className="rating__item-content-image-item"
              >
                <div className="image-container">
                  <Image
                    src={`${API_URL}${item.image_url}`}
                    alt=""
                    layout="fill"
                    quality={20}
                    className="image"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RatingItem
