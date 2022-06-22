import { CartSummary, HeaderMobile } from "@/components"
import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { setOpenOrderSummaryModal } from "@/modules"
import { ReactNode } from "react"
import { VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"

interface IOrderContainer {
  children: ReactNode
  isShowPromotion?: boolean
  isShowOrderSummary?: boolean
  headerTitle: string
}

export const OrderContainer = ({
  children,
  isShowPromotion = true,
  isShowOrderSummary = true,
  headerTitle,
}: IOrderContainer) => {
  const dispatch = useDispatch()
  const { productList } = useSelector((state: RootState) => state.order)
  const { isOpenOrderSummary } = useSelector((state: RootState) => state.common)

  return (
    <>
      <HeaderMobile centerChild={<p>{headerTitle}</p>} />

      <section
        className={`order__container ${
          !isShowOrderSummary ? "order__container--no-margin" : ""
        }`}
      >
        <div className="container">
          <div className="order-wrapper">
            <div className="order__body">
              <div
                className={`order__body-left ${
                  !isShowOrderSummary || !isArrayHasValue(productList)
                    ? "order__body-left-full"
                    : ""
                }`}
              >
                {children}
              </div>
              {isShowOrderSummary && isArrayHasValue(productList) ? (
                <div className="order__body-right">
                  <CartSummary
                    type="desktop"
                    isShowPromotion={isShowPromotion}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Cart summry fixed bottom in mobile */}
      {isShowOrderSummary ? (
        <div className="cart__summary-mobile-wrapper">
          <CartSummary isShowPromotion={isShowPromotion} type="mobile" />
        </div>
      ) : null}

      {isOpenOrderSummary ? (
        <div className="cart__summary-modal">
          <button
            onClick={() => dispatch(setOpenOrderSummaryModal(false))}
            className="btn-reset cart__summary-modal-close-btn"
          >
            <VscChromeClose />
          </button>
          <CartSummary isShowPromotion={isShowPromotion} type="desktop" />
        </div>
      ) : null}
    </>
  )
}
