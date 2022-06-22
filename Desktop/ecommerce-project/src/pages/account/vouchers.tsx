import { cartEmptyIcon } from "@/assets"
import { PromotionItem } from "@/components"
import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import { RiLoader4Line } from "react-icons/ri"
import { usePromotion } from "shared/hook"

const AccountGeneral = () => {
  const { data: promotionList, isValidating } = usePromotion()

  return (
    <AccountContainer
      headerMobileTitle="Kho voucher"
      breadcrumbList={[{ path: "/account", name: "kho voucher" }]}
      heading="Kho voucher"
    >
      <div className="voucher-container">
        {isValidating && promotionList?.length === 0 ? (
          <div className="loader-container">
            <RiLoader4Line className="loader" />
          </div>
        ) : null}

        {!isValidating && !promotionList?.length ? (
          <div className="voucher--empty">
            {cartEmptyIcon}

            <p>Danh sách voucher của bạn hiện đang trống </p>
          </div>
        ) : null}

        <ul className="voucher__list">
          {promotionList?.length > 0
            ? promotionList.map(
                (promo) =>
                  promo.is_use_promotion && (
                    <PromotionItem promotion={promo} key={promo.promotion_id} />
                  )
              )
            : null}
        </ul>
      </div>
    </AccountContainer>
  )
}

AccountGeneral.Layout = MainAuthLayout

export default AccountGeneral
