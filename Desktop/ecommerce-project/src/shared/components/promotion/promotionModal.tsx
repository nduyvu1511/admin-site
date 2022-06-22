import { cartEmptyIcon } from "@/assets"
import { Modal } from "@/components"
import { RootState } from "@/core/store"
import { setMessage, setOpenModalCoupons } from "@/modules"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useInputText, usePromotion } from "shared/hook"
import { PromotionItem } from "./promotionItem"

export const PromotionModal = () => {
  const dispatch = useDispatch()
  const language = "vni"
  const {
    data: promotionList,
    isValidating,
    applyPromotion,
    cancelPromotion,
  } = usePromotion()

  const { promotion } = useSelector((state: RootState) => state.order)
  const { onChange, value: coupon_code } = useInputText()

  const handleAddPromotion = (coupon_code: string) => {
    if (!promotion) {
      applyPromotion(coupon_code)
    } else {
      if (promotion?.coupon_code === coupon_code) {
        cancelPromotion(() => {
          dispatch(
            setMessage({
              title: "Đã hủy áp dụng voucher",
              direction: "top",
            })
          )
        })
      } else {
        applyPromotion(coupon_code)
      }
    }
  }

  return (
    <Modal
      isShowModal
      disableOverLay
      direction="center"
      heading={language === "vni" ? "Chọn Voucher" : "Choose Voucher"}
      handleClickModal={() => dispatch(setOpenModalCoupons(false))}
    >
      <div className="promotion__modal">
        <div className="promotion__modal-header">
          <input
            onChange={onChange}
            className="promotion__modal-header-search"
            value={coupon_code}
            placeholder={
              language === "vni" ? "Nhập mã giảm giá" : "Add coupon code"
            }
            type="text"
          />
          <button
            onClick={() => coupon_code && handleAddPromotion(coupon_code)}
            className={`btn-primary ${coupon_code ? "" : "btn-disabled"}`}
          >
            Áp dụng
          </button>
        </div>
        <div className="promotion__modal-body">
          {promotionList?.length === 0 ? (
            <div className="promotion__modal-body-empty">
              {cartEmptyIcon}
              <span className="promotion__modal-body-empty-text">
                {language === "vni"
                  ? "Không có mã giảm giá nào được tìm thấy"
                  : "No discount codes found"}
              </span>
            </div>
          ) : null}

          {isValidating && !promotionList ? (
            <div className="promotion__modal-body-loading">
              <RiLoader4Line className="loader" />
            </div>
          ) : null}

          <ul className="promotion__modal-list">
            {promotionList?.length > 0
              ? promotionList.map(
                  (promo) =>
                    promo.is_use_promotion && (
                      <PromotionItem
                        promotion={promo}
                        key={promo.promotion_id}
                        handleClick={handleAddPromotion}
                        isActive={
                          (promotion?.promotion_id || 0) === promo.promotion_id
                        }
                      />
                    )
                )
              : null}
          </ul>
        </div>

        <footer className="promotion__modal-footer">
          <button
            onClick={() => dispatch(setOpenModalCoupons(false))}
            className={`btn-primary ${!promotion ? "btn-secondary" : ""}`}
          >
            {promotion ? "OK" : "Hủy"}
          </button>
        </footer>
      </div>
    </Modal>
  )
}
