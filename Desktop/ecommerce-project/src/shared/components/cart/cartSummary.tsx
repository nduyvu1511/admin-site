import { RootState } from "@/core/store"
import { formatMoneyVND, getTotalPrice, isArrayHasValue } from "@/helper"
import {
  setMessage,
  setOpenModalCoupons,
  setOpenOrderSummaryModal,
} from "@/modules"
import { useRouter } from "next/router"
import { RiArrowUpSLine, RiCoupon3Fill, RiCoupon3Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useOrder, useScrollTop } from "shared/hook"
import { CartSummaryProductList } from "./cartSummaryProductList"

interface CartTotalProps {
  isShowPromotion?: boolean
  type: "mobile" | "desktop"
}

export const CartSummary = ({ isShowPromotion, type }: CartTotalProps) => {
  const language = "vni"
  const router = useRouter()
  const height = useScrollTop()
  const dispatch = useDispatch()
  const { createOrderDraft, createOrderDone } = useOrder()

  const {
    delivery,
    productList,
    promotionLineList,
    orderDraft,
    payment,
    address,
  } = useSelector((state: RootState) => state.order)

  const handleOpenPromotionModal = () => {
    dispatch(setOpenModalCoupons(true))
    if (!orderDraft) {
      createOrderDraft()
    }
  }

  // const getPromotionLineMoney = (promotion: PromotionLine) => {
  //   const { type } = promotion.discount_line
  //   if (type === "percentage") {
  //     return (
  //       promotion.qty *
  //       promotion.price_unit *
  //       (1 - promotion.discount_line.value / 100)
  //     )
  //   }

  //   if (type === "fixed") {
  //     return (
  //       promotion.qty * promotion.price_unit * -promotion.discount_line.value
  //     )
  //   }

  //   return promotion.qty * promotion.price_unit
  // }

  const handleRedirectToCheckout = () => {
    if (!productList) {
      dispatch(
        setMessage({
          title: "Vui lòng chọn sản phẩm để tiếp tục",
          type: "warning",
        })
      )
    } else {
      if (!orderDraft) {
        createOrderDraft({
          handleSuccess: () => {
            router.push("/checkout")
          },
          showLoading: true,
        })
      } else {
        router.push("/checkout")
      }
    }
  }

  const handleCreateOrder = () => {
    if (!delivery) {
      dispatch(
        setMessage({
          title: "Bạn cần phải chọn phương thức vận chuyển trước!",
          type: "warning",
        })
      )
      return
    }
    if (!payment) {
      dispatch(
        setMessage({
          title: "Bạn cần phải chọn phương thức thanh toán trước!",
          type: "warning",
        })
      )
      return
    }

    createOrderDone(() => {
      router.push("/order-confirmed")
    })
  }

  const getTotalPromotion = (): number => {
    let total = 0
    promotionLineList
      ? promotionLineList.forEach((val) => {
          if (val.discount_line.type === "percentage") {
            total += (val.discount_line.value / 100) * val.price_unit
          } else if (val.discount_line.type === "fixed") {
            total += val.discount_line.value
          }

          return total
        })
      : 0
    return total
  }

  return (
    <>
      {type === "desktop" ? (
        <div className="cart__summary-container">
          <div
            className={`cart__body-total 
      ${height >= 210 ? "cart__body-total-sticky" : ""}
    `}
          >
            <div className="cart__body-total-title">
              <h3 className="cart__body-total-title-heading">
                {!productList
                  ? language === "vni"
                    ? "1 chọn sản phẩm"
                    : "Please choose a product"
                  : language === "vni"
                  ? "Sản phẩm"
                  : "Products"}
              </h3>

              {(productList?.length || 0) > 0 ? (
                <span className="cart__body-total-title-quantity">
                  ({productList?.length || 0})
                </span>
              ) : null}
            </div>

            {isShowPromotion && productList ? (
              <div className="cart__body-total-coupons">
                {productList ? (
                  <button
                    onClick={handleOpenPromotionModal}
                    className={`cart__body-total-coupons-btn ${
                      !productList ? "opacity-50" : ""
                    }`}
                  >
                    <RiCoupon3Line />
                    {language === "vni"
                      ? "Chọn hoặc nhập Khuyến mãi khác"
                      : "Add discount code"}
                  </button>
                ) : null}
              </div>
            ) : null}

            <div className="cart__body-total-product">
              {productList ? (
                <CartSummaryProductList
                  promotionLineList={promotionLineList}
                  productList={promotionLineList ? undefined : productList}
                />
              ) : null}
            </div>

            {productList ? (
              <div className="cart__body-total-summary">
                <div className="cart__body-total-subtotal">
                  <p className="cart__body-total-subtotal-title">
                    {language === "vni"
                      ? "Tổng phụ phí"
                      : "Merchandise Subtotal"}
                    :{" "}
                  </p>
                  <span>{formatMoneyVND(getTotalPrice(productList))}</span>
                </div>

                {(orderDraft?.promo_price || 0) > 0 ? (
                  <div className="cart__body-total-subtotal">
                    <p className="cart__body-total-subtotal-title">
                      {language === "vni"
                        ? "Tổng Voucher giảm giá"
                        : "Voucher Discount"}
                      :
                    </p>
                    <p className="cart__body-total-subtotal-price">
                      {formatMoneyVND(orderDraft?.promo_price || 0)}
                    </p>
                  </div>
                ) : null}

                {/* {(orderDraft?.amount_tax || 0) > 0 ? (
                  <div className="cart__body-total-subtotal">
                    <p className="cart__body-total-subtotal-title">
                      {language === "vni" ? "Thuế" : "Tax"}:
                    </p>
                    <p className="cart__body-total-subtotal-price">
                      {formatMoneyVND(orderDraft?.amount_tax || 0)}
                    </p>
                  </div>
                ) : null} */}

                {delivery?.shipping_fee !== undefined ? (
                  <div className="cart__body-total-subtotal">
                    <p className="cart__body-total-subtotal-title">
                      {language === "vni" ? "Phí vận chuyển" : "Shipping fee"}:
                    </p>
                    <span className="cart__body-total-subtotal-price">
                      {formatMoneyVND(delivery?.shipping_fee || 0)}
                    </span>
                  </div>
                ) : null}

                <div
                  style={{ borderBottom: !isShowPromotion ? 0 : "" }}
                  className="cart__body-total-subtotal cart__summary-total"
                >
                  <p className="cart__body-total-subtotal-title">
                    {language === "vni" ? "Tổng" : "Total Payment"}:
                  </p>
                  <span className="cart__body-total-price">
                    {formatMoneyVND(
                      getTotalPrice(productList) +
                        (delivery?.shipping_fee || 0) -
                        getTotalPromotion()
                    )}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="cart__summary-footer">
              {router.pathname === "/cart" ? (
                <button
                  onClick={handleRedirectToCheckout}
                  className={`btn-primary cart__summary-footer-btn ${
                    !productList || !isArrayHasValue(productList)
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  Mua hàng
                  {(productList?.length || 0) > 0 ? (
                    <span>({productList?.length})</span>
                  ) : null}
                </button>
              ) : (
                <button
                  onClick={handleCreateOrder}
                  className={`btn-primary cart__summary-footer-btn ${
                    !address || !delivery || !payment ? "opacity-50" : ""
                  }`}
                >
                  Đặt hàng
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="cart__summary-mobile">
          <div className="cart__summary-mobile-item cart__summary-mobile-promotion">
            {isShowPromotion ? (
              <button
                onClick={handleOpenPromotionModal}
                className="btn-reset cart__summary-mobile-promotion-btn"
              >
                <RiCoupon3Fill /> Chọn mã giảm giá
              </button>
            ) : null}

            <button
              onClick={() => dispatch(setOpenOrderSummaryModal(true))}
              className="btn-reset"
            >
              Xem chi tiết <RiArrowUpSLine />
            </button>
          </div>
          <div className="cart__summary-mobile-item cart__summary-mobile-body">
            <p className="cart__summary-mobile-body-price">
              <span className="cart__summary-mobile-body-price-title">
                Tổng tiền:
              </span>
              <span className="cart__summary-mobile-body-price-value">
                {formatMoneyVND(
                  getTotalPrice(productList || []) +
                    (delivery?.shipping_fee || 0) -
                    getTotalPromotion()
                )}
              </span>
            </p>
            {router.pathname === "/cart" ? (
              <button
                onClick={handleRedirectToCheckout}
                className={`btn-primary ${
                  (productList?.length || 0) === 0 ? "opacity-50" : ""
                }`}
              >
                Mua hàng
                {(productList?.length || 0) > 0 ? (
                  <span>({productList?.length})</span>
                ) : null}
              </button>
            ) : (
              <button
                onClick={handleCreateOrder}
                className={`btn-primary ${
                  !address || !delivery || !payment ? "opacity-50" : ""
                }`}
              >
                Đặt hàng
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
