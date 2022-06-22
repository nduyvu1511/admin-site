import { AttributeProductValueItem, DisplayContentAttribute } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import { InputCheckbox } from "../inputs"

interface ProductAttributeItemProps {
  valueItem: AttributeProductValueItem
  onClick: Function
  itemActive?: boolean
  type: DisplayContentAttribute
}

export const ProductAttributeItem = ({
  valueItem,
  onClick,
  itemActive,
  type,
}: ProductAttributeItemProps) => (
  <div
    onClick={() => onClick && onClick(valueItem)}
    className={`product__attribute-list-item ${
      itemActive ? "product__attribute-list-item-active" : ""
    }`}
  >
    <InputCheckbox
      isChecked={itemActive || false}
      onCheck={() => onClick && onClick(valueItem)}
    />
    <div className="product__attribute-list-item-wrapper">
      {type === "text_image" || type === "only_image" ? (
        <div
          className={`image-container ${
            valueItem.value_icon ? "" : "product__attribute-no-image"
          }`}
        >
          {valueItem.value_icon ? (
            <Image
              layout="fill"
              className="image"
              src={`${API_URL}${valueItem.value_icon || ""}`}
              alt=""
            />
          ) : null}
        </div>
      ) : null}

      {type !== "only_image" ? <p>{valueItem.value_name}</p> : null}
    </div>
  </div>
)
