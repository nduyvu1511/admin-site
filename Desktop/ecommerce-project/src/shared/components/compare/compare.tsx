import { RootState } from "@/core/store"
import { Product } from "@/models"
import {
  clearProductCompare,
  deleteProductCompare,
  setOpenModalConfirm,
  setProduct,
  setOpenModalProduct,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HiTrash } from "react-icons/hi"
import { TiArrowShuffle } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { formatMoneyVND } from "../../helper/functions"
import { ModalConfirm } from "../modal"

export const Compare = ({ type }: { type?: "page" | "modal" }) => {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()

  const { token = "" } = useSelector((state: RootState) => state.user)
  const { productsCompare } = useSelector((state: RootState) => state.compare)
  const { addToCart } = useCartOrder(false)

  const handleAddToCart = (product: Product) => {
    if (!token) {
      router.push("/login")
      return
    }

    if (product.attributes.length > 0) {
      dispatch(setOpenModalProduct(true))
      dispatch(setProduct(product))
    } else {
      addToCart({
        product_id: product.product_prod_id,
        product_qty: product.qty_available,
        token,
        uom_id: product.uom.id,
        offer_pricelist: false,
      })
    }
  }

  const handleResetCompareList = () => {
    dispatch(clearProductCompare())
  }

  return (
    <div className="compare">
      <ModalConfirm onConfirm={handleResetCompareList} />
      {type === "page" ? (
        <div className="compare__header">
          {productsCompare.length > 0 ? (
            <button
              onClick={() =>
                dispatch(
                  setOpenModalConfirm({
                    isOpen: true,
                    title:
                      "Nếu đồng ý bạn sẽ xóa tất cả sản phẩm trong danh sách so sánh",
                  })
                )
              }
              className="btn-reset btn-primary"
            >
              {language === "vni" ? "Xóa tất cả" : "Reset Compare List"}

              <TiArrowShuffle />
            </button>
          ) : null}
        </div>
      ) : null}
      {productsCompare.length === 0 ? (
        <div className="compare__empty">
          <p className="compare__empty-text">
            Danh sách so sánh của bạn đang trống
          </p>
          <Link href="/" passHref>
            <a className="btn-primary">
              {language === "vni" ? "Tiếp tục mua sắm" : "Continue Shopping"}
            </a>
          </Link>
        </div>
      ) : (
        <div className="compare__table">
          <div className="compare__table-header">
            <div className="compare__table-item-img"></div>
            <div className="compare__table-item compare__table-item-name-wrapper">
              Tên
            </div>
            <div className="compare__table-item">Danh mục</div>
            <div className="compare__table-item">Giá</div>
            <div className="compare__table-item">Đơn vị</div>
            <div className="compare__table-item"></div>
          </div>
          <div className="compare__table-body">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              navigation
              breakpoints={{
                350: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {productsCompare.map((item) => (
                <SwiperSlide key={item.product_tmpl_id}>
                  <div className="compare__table-item-wrapper">
                    <div className="compare__table-item-img">
                      <button
                        onClick={() =>
                          dispatch(deleteProductCompare(item.product_tmpl_id))
                        }
                        className="btn-reset compare__table-item-delete-btn"
                      >
                        <HiTrash />
                      </button>

                      <Link href={`/product/${item.product_tmpl_id}`} passHref>
                        <div
                          onClick={() =>
                            dispatch(toggleShowCompareModal(false))
                          }
                          className="image-container"
                        >
                          <Image
                            src={`${API_URL}${item.image_url?.[0] || ""}`}
                            alt=""
                            layout="fill"
                            className="image"
                            placeholder="blur"
                            objectFit="contain"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="compare__table-item compare__table-item-name-wrapper">
                      <Link href={`/product/${item.product_tmpl_id}`} passHref>
                        <a className="compare__table-item-name">
                          {item.product_name}
                        </a>
                      </Link>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-category">
                        {item.category?.name}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-price">
                        {formatMoneyVND(item.price)}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <p className="compare__table-item-unit">
                        {item.uom.name}
                      </p>
                    </div>

                    <div className="compare__table-item">
                      <button
                        className="btn-primary"
                        onClick={() => handleAddToCart(item)}
                      >
                        {language === "vni" ? "Thêm giỏ hàng" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  )
}
