import { AccountContainer } from "@/container"
import { MainAuthLayout } from "@/layout"
import Link from "next/link"
import { BsFillHeartFill } from "react-icons/bs"
import { CgCalculator } from "react-icons/cg"
import { FaShoppingCart } from "react-icons/fa"
import { useCartOrder, useOrderHistory, useWishlist } from "shared/hook"

const AccountGeneral = () => {
  const language = "vni"
  const { carts } = useCartOrder(true)
  const { data: wishlists } = useWishlist(false)
  const { data: orderHistoryList } = useOrderHistory()

  return (
    <AccountContainer
      headerMobileTitle="Tài khoản"
      breadcrumbList={[{ path: "/account", name: "Tài khoản" }]}
      heading="Tổng quan"
    >
      <div className="account__general">
        <ul className="account__general-list">
          <li className="account__general-list-item">
            <Link href="/cart" passHref>
              <div>
                <span>
                  <FaShoppingCart />
                </span>
                <h3>
                  {carts?.length || 0}{" "}
                  {language === "vni" ? "Sản Phẩm" : "Product"}
                </h3>
                <p>
                  {language === "vni"
                    ? "Trong giỏ hàng của bạn"
                    : "In your cart"}
                </p>
              </div>
            </Link>
          </li>

          <li className="account__general-list-item">
            <Link href="/wishlist" passHref>
              <div>
                <span>
                  <BsFillHeartFill />
                </span>
                <h3>
                  {wishlists?.length || 0}{" "}
                  {language === "vni" ? "Sản Phẩm" : "Product"}
                </h3>
                <p>
                  {language === "vni"
                    ? "Trong danh sách yêu thích"
                    : "In your Wishlist"}
                </p>
              </div>
            </Link>
          </li>

          <li className="account__general-list-item">
            <Link href="/account/order-history" passHref>
              <div>
                <span>
                  <CgCalculator />
                </span>
                <h3>
                  {orderHistoryList?.list_booking?.length || 0}{" "}
                  {language === "vni" ? "Đơn hàng" : "Product"}
                </h3>
                <p>{language === "vni" ? "Bạn đã đặt hàng" : "You ordered"}</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </AccountContainer>
  )
}

AccountGeneral.Layout = MainAuthLayout

export default AccountGeneral
