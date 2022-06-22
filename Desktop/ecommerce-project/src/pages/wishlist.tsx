/* eslint-disable @next/next/no-img-element */
import { cartEmptyIcon } from "@/assets"
import { Breadcrumb, HeaderMobile } from "@/components"
import { formatMoneyVND, isArrayHasValue, isObjectHasValue } from "@/helper"
import { MainLayout } from "@/layout"
import { Product } from "@/models"
import { setProduct, setOpenModalProduct } from "@/modules"
import { API_URL } from "@/services"
import productApi from "@/services/productApi"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { BiTrash } from "react-icons/bi"
import { BsCheck } from "react-icons/bs"
import { RiCloseLine, RiLoader4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder, useWishlist } from "shared/hook"
import { RootState } from "../core"

const Wishlist = () => {
  const dispatch = useDispatch()
  const language = "vni"
  const router = useRouter()
  const { addToCart } = useCartOrder(false)
  const { token } = useSelector((state: RootState) => state.user)
  const {
    data: wishlists,
    toggleWishlist,
    isValidating,
    handleDeleteWishlist,
  } = useWishlist(true)

  const handleAddSingleCart = (id: number) => {
    if (!token) {
      router.push("/login")
      return
    }

    productApi.getProductList({ product_id: id }).then((res: any) => {
      const product: Product = res.result?.[0]
      if (isObjectHasValue(product)) {
        if (product.attributes.length > 0) {
          dispatch(setProduct(product))
          dispatch(setOpenModalProduct(true))
        } else {
          addToCart(
            {
              product_id: product.product_prod_id,
              product_qty: 1,
              uom_id: product.uom.id,
              token,
              offer_pricelist: false,
            },
            false,
            () => {
              toggleWishlist(
                product,
                () => {},
                () => {}
              )
            }
          )
        }
      }
    })
  }

  const setProductList = (id: number) => {
    productApi
      .getProductList({ product_id: id })
      .then((res) => console.log(res.data.result))
      .catch((err) => console.log(err))
  }

  return (
    <>
      <HeaderMobile centerChild={<p>Yêu thích</p>} />

      <section className="wishlist-container">
        <div className="container">
          <Breadcrumb breadcrumbList={[{ name: "Yêu thích", path: "" }]} />

          {isValidating ? (
            <div className="loader-container">
              <RiLoader4Line className="loader" />
            </div>
          ) : null}

          {!token || (!isArrayHasValue(wishlists) && !isValidating) ? (
            <div className="wishlist__empty">
              <p className="wishlist__empty-text">
                {language === "vni"
                  ? "Danh sách yêu thích của bạn đang trống!"
                  : "Your wishlist list is empty!"}
              </p>

              {cartEmptyIcon}
              <Link passHref href="/products">
                <a className="btn-primary">
                  {language === "vni"
                    ? "Tiếp tục mua sắm"
                    : "Continue Shopping"}
                </a>
              </Link>
            </div>
          ) : null}

          {!isValidating && isArrayHasValue(wishlists) ? (
            <div className="wishlist-wrapper">
              <table className="wishlist-table">
                <tbody>
                  <tr className="table-input-check-all-sm"></tr>
                  <tr className="table-row-heading">
                    <th></th>
                    <th></th>
                    <th>Tên</th>
                    <th>Đơn giá</th>
                    <th>Tình trạng</th>
                    <th></th>
                  </tr>
                  {isArrayHasValue(wishlists) &&
                    wishlists.map((item) => (
                      <tr key={item.id} className="wishlist__list">
                        <td className="wishlist__list-item table-col-center table-col-sm-right">
                          <button
                            onClick={() =>
                              handleDeleteWishlist({
                                product_id: item.product_id,
                                wishlist_id: item.id,
                              })
                            }
                            className="btn-reset btn-delete-wishlist"
                          >
                            <BiTrash />
                          </button>
                        </td>
                        <td className="wishlist__list-item wishlist__list-item-image">
                          <Link href={`/product/${item.product_id}`} passHref>
                            <div
                              onClick={() => setProductList(item.product_id)}
                              className="image-container wishlist__list-item-image"
                            >
                              <Image
                                className="image"
                                src={`${API_URL}${item.image_url?.[0]}`}
                                alt=""
                                layout="fill"
                              />
                            </div>
                          </Link>
                        </td>
                        <td className="wishlist__list-item wishlist__list-item-name">
                          <Link href={`/product/${item.product_id}`} passHref>
                            <a onClick={() => setProductList(item.product_id)}>
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className="wishlist__list-item">
                          {formatMoneyVND(item.price)}
                        </td>

                        <td className="wishlist__list-item">
                          <p className="wishlist__list-item-status">
                            {item.qty_available === 0 ? (
                              <>
                                <RiCloseLine style={{ fill: "#dc3545" }} />
                                {language === "vni"
                                  ? "Hết hàng"
                                  : "Out of Stock"}
                              </>
                            ) : (
                              <>
                                <BsCheck style={{ fill: "#28a745" }} />
                                {language === "vni" ? "Còn hàng" : "In stock"}
                              </>
                            )}
                          </p>
                        </td>
                        <td className="wishlist__list-item">
                          <button
                            onClick={() => handleAddSingleCart(item.product_id)}
                            className="btn-primary btn-add"
                          >
                            {language === "vni"
                              ? "Thêm giỏ hàng"
                              : "Add to Cart"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

Wishlist.Layout = MainLayout

export default Wishlist
