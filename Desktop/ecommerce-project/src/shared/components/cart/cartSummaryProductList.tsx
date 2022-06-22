import { formatMoneyVND } from "@/helper"
import { CartItem, PromotionLine } from "@/models"
import React from "react"
import { RiCloseLine } from "react-icons/ri"

interface Props {
  productList?: CartItem[] | undefined
  promotionLineList?: PromotionLine[] | undefined
}

export const CartSummaryProductList = (props: Props) => {
  const { productList, promotionLineList } = props

  return (
    <>
      {productList ? (
        <ul className="cart__total-product-list">
          {productList &&
            productList.map((cart, index) => (
              <li key={index} className="cart__total-product-list-item">
                <p className="cart__total-product-list-item-title">
                  {cart?.product?.product_name || ""}
                </p>

                <ul className="cart__total-price-list">
                  <li className=" cart__total-price-list-item">
                    {formatMoneyVND(cart.price_unit)} <RiCloseLine />{" "}
                    {cart.product_qty}
                  </li>

                  <li className="cart__total-price-list-item-total cart__total-price-list-item">
                    Thành tiền:{" "}
                    {formatMoneyVND(cart.price_unit * cart.product_qty)}
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      ) : null}

      {promotionLineList ? (
        <ul className="cart__total-product-list">
          {promotionLineList &&
            promotionLineList.map((cart, index) => {
              const {
                discount_line,
                id,
                is_line_promotion,
                is_promotion,
                name,
                price_unit,
                product_uom,
                qty,
              } = cart

              return (
                <li key={index} className="cart__total-product-list-item">
                  <p className="cart__total-product-list-item-title">
                    {cart?.name || ""}
                  </p>

                  <ul className="cart__total-price-list">
                    <li className=" cart__total-price-list-item">
                      {formatMoneyVND(cart.price_unit)} <RiCloseLine /> {qty}
                    </li>

                    {discount_line.type === "percentage" &&
                    discount_line.value ? (
                      <li className="cart__total-price-list-item cart__total-price-list-item-deal">
                        Giảm: {cart.discount_line.value}%
                      </li>
                    ) : null}

                    {cart.discount_line.type === "fixed" &&
                    cart.discount_line.value ? (
                      <li className=" cart__total-price-list-item cart__total-price-list-item-deal">
                        Giảm: {formatMoneyVND(cart.discount_line.value)}
                      </li>
                    ) : null}

                    <li className="cart__total-price-list-item-total cart__total-price-list-item">
                      Thành tiền:{" "}
                      {cart.is_promotion
                        ? `0đ`
                        : formatMoneyVND(
                            discount_line.type === "percentage"
                              ? price_unit *
                                  qty *
                                  (1 - discount_line.value / 100)
                              : price_unit * qty - discount_line.value
                          )}
                    </li>

                    {cart.is_promotion ? (
                      <li className=" cart__total-price-list-item">
                        Hàng được tặng
                      </li>
                    ) : null}
                  </ul>
                </li>
              )
            })}
        </ul>
      ) : null}
    </>
  )
}
