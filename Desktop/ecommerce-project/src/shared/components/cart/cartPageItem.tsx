import { formatMoneyVND } from "@/helper"
import { CartItem, ProductIds } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineTrash } from "react-icons/hi"
import { InputCheckbox, InputQuantity } from "../inputs"

interface ICartPageItem {
  cart: CartItem
  isChecked?: boolean
  disabled?: boolean
  onCheck?: (cart: CartItem) => void
  onDeleteItem?: (cart: CartItem) => void
  onUpdateQuantity?: (cart: CartItem) => void
}

export const CartPageItem = ({
  cart,
  isChecked,
  onCheck,
  onDeleteItem,
  onUpdateQuantity,
  disabled,
}: ICartPageItem) => {
  const handleUpdateQuantity = (quantity: number) => {
    onUpdateQuantity && onUpdateQuantity({ ...cart, product_qty: quantity })
  }

  return (
    <li className="cart__page__item">
      <div className="cart__item-check">
        <InputCheckbox
          onCheck={() => onCheck && onCheck(cart)}
          isChecked={isChecked || false}
        />
      </div>

      <div className="cart__item-img">
        <Link passHref href={`/product/${cart.product_tmpl_id}`}>
          <div className="image-container">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteItem && onDeleteItem(cart)
              }}
              className="btn-reset cart__item-delete-btn"
            >
              <HiOutlineTrash />
            </button>
            <Image
              quality={40}
              layout="fill"
              className="image"
              src={`${API_URL}${cart.product.representative_image}`}
              alt={cart.product.product_name}
            />
          </div>
        </Link>
      </div>

      <div className="cart__item-info">
        <div className="cart__item-info-name">
          <div className="cart__item-info-name-wrapper">
            <Link href={`/product/${cart.product_tmpl_id}`}>
              <a className="cart__item-info-name-title">
                {cart.product.product_name}
              </a>
            </Link>

            {cart.attribute?.attribute_str?.length > 0 ? (
              <p className="cart__item-info-name-type">
                {cart.attribute.attribute_str?.join(", ") || ""}
              </p>
            ) : null}
          </div>

          <InputCheckbox
            onCheck={() => onCheck && onCheck(cart)}
            isChecked={isChecked || false}
          />
        </div>
        <div className="cart__item-info-item cart__item-info-price">
          <p className="cart__item-info-item-title">Giá: </p>
          <p className="info-price-price">{formatMoneyVND(cart.price_unit)}</p>

          <p className="info-price-price-mobile">
            {formatMoneyVND(
              cart.product_qty === 0
                ? cart.price_unit
                : cart.product_qty * cart.price_unit
            )}
          </p>
        </div>

        <div className="cart__item-info-item cart__item-info-quantity">
          <p className="cart__item-info-item-title">Số lượng</p>
          <InputQuantity
            disabled={disabled}
            onChangeQuantity={(q: number) => handleUpdateQuantity(q)}
            quantity={cart.product_qty}
          />
        </div>

        <div className="cart__item-info-item cart__item-info-subtotal">
          <p className="cart__item-info-item-title">Tổng phụ: </p>
          <p className="info-subtotal-price">
            {formatMoneyVND(
              cart.product_qty === 0
                ? cart.price_unit
                : cart.product_qty * cart.price_unit
            )}
          </p>
        </div>

        <div className="cart__item-info-item cart__item-info-btn">
          <button
            onClick={() => onDeleteItem && onDeleteItem(cart)}
            className="btn-reset"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </li>
  )
}
