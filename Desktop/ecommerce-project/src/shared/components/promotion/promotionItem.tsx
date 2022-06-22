/* eslint-disable @next/next/no-img-element */
import { companyIcon } from "@/assets"
import { Promotion } from "@/models"
import Image from "next/image"
import { InputCheckbox } from "../inputs"

interface PromotionItemProps {
  promotion: Promotion
  handleClick?: (coupon_code: string) => void
  isActive?: boolean
}

export const PromotionItem = ({
  promotion,
  handleClick,
  isActive,
}: PromotionItemProps) => {
  const language = "vni"

  return (
    <li
      key={promotion.promotion_id}
      onClick={() => {
        handleClick && handleClick(promotion.coupon_code)
      }}
      className={`promotion__item ${isActive ? "promotion__item-active" : ""}`}
    >
      <div className="promotion__item-image">
        <div className="image-container">
          <Image
            src={promotion.image_url[0] || companyIcon}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="promotion__item-info">
        <p className="promotion__item-info-code">{promotion.name}</p>
        <p className="promotion__item-info-limit">
          {language === "vni"
            ? `Giới hạn ${promotion.max_limit_per_user} mã`
            : `Limit for ${promotion.max_limit_per_user} code`}
        </p>
        <p className="promotion__item-info-expire">
          <span className="expire-from">
            {language === "vni" ? "Từ" : "Từ"}: {promotion.date_start}
          </span>
          <span className="expire-to">
            {language === "vni" ? "Đến" : "Đến"}: {promotion.date_end}
          </span>
        </p>
      </div>

      {handleClick ? (
        <InputCheckbox
          type="radio"
          isChecked={isActive || false}
          onCheck={() => handleClick && handleClick(promotion.coupon_code)}
        />
      ) : null}
    </li>
  )
}
