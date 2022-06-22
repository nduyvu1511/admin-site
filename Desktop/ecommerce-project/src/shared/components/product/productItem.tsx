import { imageBlur } from "@/assets"
import { ProductItemLoading } from "@/components"
import {
  formatMoneyVND,
  getPercentageProductDeal,
  getPriceProduct,
  isArrayHasValue,
  isObjectHasValue,
} from "@/helper"
import { Product } from "@/models"
import {
  addProductCompare,
  setProduct,
  setOpenModalProduct,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { IoExpandOutline } from "react-icons/io5"
import { RiBarChartFill } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { Star } from "../star"

interface IProductItem {
  product: Product
  isLoading?: boolean
}

export const ProductItem = ({ product, isLoading }: IProductItem) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAddToCompareList = () => {
    dispatch(toggleShowCompareModal(true))
    dispatch(addProductCompare(product))
  }

  const handleOpenModalProduct = () => {
    dispatch(setOpenModalProduct(true))
    dispatch(setProduct(product))
  }

  const imageUrls: Array<string> = isArrayHasValue(product.representative_image)
    ? product.representative_image
    : product.image_url

  return (
    <>
      {!isLoading && isObjectHasValue(product) ? (
        <div className="product__card">
          <div className="product__card__img">
            {product?.daily_deal_promotion &&
            getPercentageProductDeal(product) ? (
              <span className="product__card-deal-label">
                {getPercentageProductDeal(product)}%
              </span>
            ) : null}

            {/* Show on hover: wishlist, compare, detail  */}
            <div className="product__card__sub">
              {!router.query.productId ? (
                <button
                  onClick={handleOpenModalProduct}
                  className="product__card__sub-item"
                >
                  <IoExpandOutline />
                  <span
                    className="tool-tip"
                    style={{
                      left: `calc(-100% - 46px)`,
                    }}
                  >
                    Xem chi tiết
                  </span>
                </button>
              ) : null}

              {/* <ButtonWishlist type="item" product={product} /> */}

              <button
                onClick={handleAddToCompareList}
                className="product__card__sub-item"
              >
                <RiBarChartFill />
                <span
                  className="tool-tip"
                  style={{
                    left: `calc(-100% - 75px)`,
                  }}
                >
                  Thêm vào so sánh
                </span>
              </button>
            </div>

            {imageUrls.length === 1 ? (
              <Link passHref href={`/product/${product.product_tmpl_id}`}>
                <div
                  onClick={() => dispatch(setProduct(product))}
                  className="image-container cursor-pointer product__card__img-item cursor-pointer"
                >
                  <Image
                    className="image img-cover"
                    src={`${API_URL}${imageUrls?.[0] || ""}`}
                    alt=""
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={imageBlur}
                  />
                </div>
              </Link>
            ) : (
              <>
                <Link passHref href={`/product/${product.product_tmpl_id}`}>
                  <div
                    onClick={() => dispatch(setProduct(product))}
                    className="image-container cursor-pointer product__card__img-item product__card__img-top product__card__img-top-first"
                  >
                    <Image
                      className="image"
                      src={`${API_URL}${imageUrls?.[0] || ""}`}
                      alt=""
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={imageBlur}
                    />
                  </div>
                </Link>

                {imageUrls?.[1] ? (
                  <Link passHref href={`/product/${product.product_tmpl_id}`}>
                    <div
                      onClick={() => dispatch(setProduct(product))}
                      className="image-container product__card__img-top product__card__img-item product__card__img-top-second cursor-pointer"
                    >
                      <Image
                        className="image"
                        src={`${API_URL}${imageUrls?.[1] || ""}`}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </Link>
                ) : null}
              </>
            )}
          </div>

          <div className="product__card-body">
            <div className="product__card__content">
              <Link href={`/product/${product.product_tmpl_id}`} passHref>
                <a className="product__card__content-title">
                  {product.product_name}
                </a>
              </Link>

              <div className="product__card__content-rating">
                <Star
                  readonly
                  size={15}
                  ratingValue={product.star_rating * 20}
                />

                {/* <p
                  className={`product__card__content-status ${
                    !product.product_available
                      ? "product__card__content-status-out-of-stock"
                      : ""
                  }`}
                >
                  {product.product_available ? "còn hàng" : "hết hàng"}
                </p> */}
                {/* <span className="product__card__content-rating-review">
                  {product.product_available}
                </span> */}
              </div>

              <p className="product__card__content-price">
                <span
                  className={`product__card__content-price ${
                    product?.daily_deal_promotion?.compute_price
                      ? "product__card__content-price-sale"
                      : "product__card__content-price-origin"
                  } `}
                >
                  {formatMoneyVND(product.price)}
                </span>
                {product?.daily_deal_promotion?.compute_price ? (
                  <span className="product__card__content-price product__card__content-price-origin">
                    {formatMoneyVND(getPriceProduct(product))}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <ProductItemLoading />
      )}
    </>
  )
}
