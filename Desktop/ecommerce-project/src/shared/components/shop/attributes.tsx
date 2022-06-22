import { AttributeProduct, AttributeProductValueItem } from "@/models"
import React, { useState } from "react"
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"
import { ProductAttributeItem } from "./productAttributeItem"

interface Attribute {
  attribute: AttributeProduct
  onFilterAttribute: (parentId: string, childId: string) => void
  attributesActive: string | string[] | undefined
}

export const Attribute = ({
  attribute,
  onFilterAttribute,
  attributesActive,
}: Attribute) => {
  const [isLimit, setLimit] = useState<boolean>(
    attribute?.value_ids?.length > 5
  )

  const isActive = (childId: string): boolean => {
    if (!attributesActive) return false

    if (typeof attributesActive === "string") {
      return attributesActive === childId
    } else {
      return !!attributesActive.find((item) => item === childId)
    }
  }

  return (
    <div className="shop__filter-item">
      <h3 className="shop__filter-heading">{attribute.attribute_name}</h3>
      {attribute.value_ids ? (
        <div className="product__attribute-list">
          {(isLimit
            ? attribute.value_ids.slice(0, 5)
            : attribute.value_ids
          ).map((q) => (
            <ProductAttributeItem
              onClick={(_item: AttributeProductValueItem) => {
                onFilterAttribute(attribute.attribute_id + "", q.value_id + "")
              }}
              key={q.value_id}
              type={attribute.display_content}
              valueItem={q}
              itemActive={isActive(q.value_id + "")}
            />
          ))}
        </div>
      ) : null}

      {isLimit && attribute?.value_ids?.length > 5 ? (
        <span
          onClick={() => setLimit(false)}
          className="shop__filter-item-show-btn"
        >
          Xem thêm
          <RiArrowDownSLine />
        </span>
      ) : null}

      {!isLimit && attribute?.value_ids?.length > 5 ? (
        <span
          onClick={() => setLimit(true)}
          className="shop__filter-item-show-btn"
        >
          Ẩn bớt
          <RiArrowUpSLine />
        </span>
      ) : null}
    </div>
  )
}
