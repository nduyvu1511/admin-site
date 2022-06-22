import { formatMoneyVND } from "@/helper"
import { CartItem as ICartItem } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { BiTrash } from "react-icons/bi"
import { MdOutlineClose } from "react-icons/md"

interface InterfaceCartItem {
  cart: ICartItem
  handleClose?: Function
  onDelete: (props: ICartItem) => void
}

export const CartItem = ({
  cart,
  handleClose,
  onDelete,
}: InterfaceCartItem) => {
  return (
    <div className="cart__item">
      <div className="cart__item-image">
        <Link passHref href={`/product/${cart.product_tmpl_id}`}>
          <div
            onClick={() => {
              handleClose && handleClose()
            }}
            className="image-container cart__item-image-wrapper cursor-pointer"
          >
            <Image
              src={`${API_URL}${cart.product.representative_image || ""}`}
              alt={cart.product.product_name}
              className="image"
              layout="fill"
              quality={30}
            />
          </div>
        </Link>
      </div>

      <div className="cart__item-info">
        <Link href={`/product/${cart.product_tmpl_id}`} passHref>
          <a
            onClick={() => {
              handleClose && handleClose()
            }}
            className="cart__item-info-name"
          >
            {cart.product.product_name}
          </a>
        </Link>

        {/* {(cart?.attribute_names?.length || 0) > 0 ? (
          <span className="cart__item-info-type">
            ({cart.attribute_names?.join(", ") || ""})
          </span>
        ) : null} */}

        <div className="cart__item-info-bottom">
          <div className="cart__item-info-bottom-content">
            <p className="cart__item-info-bottom-quantity">
              {cart.product_qty}
            </p>
            <MdOutlineClose />
            <p className="cart__item-info-bottom-price">
              {formatMoneyVND(cart.price_unit)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(cart)
            }}
            className="btn-reset cart__item-btn-delete"
          >
            <BiTrash />
          </button>
        </div>
      </div>
    </div>
  )
}
