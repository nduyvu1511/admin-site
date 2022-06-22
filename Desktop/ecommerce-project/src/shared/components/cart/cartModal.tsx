import { cartEmptyIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { setOpenCartModal } from "@/modules"
import Link from "next/link"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { useCartOrder } from "shared/hook"
import { CartItem } from "./cartItem"

export const CartModal = () => {
  const dispatch = useDispatch()
  const language = "vni"
  const { deleteCartItem, carts, totalMoney, isValidating } =
    useCartOrder(false)

  const handleCloseModal = () => {
    dispatch(setOpenCartModal(false))
  }

  return (
    <div className="cart__modal">
      {isValidating ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      {!isValidating && carts?.length > 0 ? (
        <>
          <div className="cart__modal-list">
            {carts.map((cart, index) => (
              <CartItem
                onDelete={(cart) => deleteCartItem([cart])}
                handleClose={handleCloseModal}
                key={index}
                cart={cart}
              />
            ))}
          </div>
          <div className="cart__modal-bottom">
            <div className="cart__modal-bottom-price">
              <p>{language === "vni" ? "Tổng" : "Total"}:</p>
              <p>{formatMoneyVND(totalMoney)}</p>
            </div>
            <div className="cart__modal-bottom-actions">
              <Link passHref href="/cart">
                <a
                  onClick={() => handleCloseModal && handleCloseModal()}
                  className="cart__modal-bottom-actions-item cursor-pointer"
                >
                  Xem giỏ hàng
                </a>
              </Link>

              <Link href="/cart">
                <a
                  onClick={() => handleCloseModal && handleCloseModal()}
                  className="cart__modal-bottom-actions-item cursor-pointer"
                >
                  Thanh toán
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : null}

      {!isValidating && carts.length === 0 ? (
        <div className="cart__modal-empty">
          {cartEmptyIcon}
          <p className="cart__modal-empty-title">
            {language === "vni"
              ? "Không có sản phẩm nào trong giỏ hàng"
              : "No products in cart"}
          </p>
        </div>
      ) : null}
    </div>
  )
}
