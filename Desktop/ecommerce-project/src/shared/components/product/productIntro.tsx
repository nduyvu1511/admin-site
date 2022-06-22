import { RootState } from "@/core/store"
import { formatMoneyVND, getPriceProduct } from "@/helper"
import { AttributeWithParentId, Product } from "@/models"
import {
  addProductCompare,
  changeAttributeItem,
  setMessage,
  setOpenChatMobile,
  setOpenScreenLoading,
  toggleShowCompareModal,
} from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { FaShoppingBasket } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import {
  RiArrowUpDownLine,
  RiLoader2Line,
  RiMessage2Fill,
} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useCartOrder } from "shared/hook"
import ButtonWishlist from "../button/buttonAddWishlist"
import ButtonShare from "../button/buttonShare"
import { InputQuantity } from "../inputs"
import { Star } from "../star"
import { ProductVariation } from "./productVariation"

interface IProductIntro {
  product: Product
  type: "detail" | "item" | "modal"
}

export const ProductIntro = ({ product, type }: IProductIntro) => {
  const dispatch = useDispatch()
  const divRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { token = "" } = useSelector((state: RootState) => state.user)
  const { addToCart } = useCartOrder(false)

  const [isAddLoading, setAddLoading] = useState<boolean>(false)
  const [openVariantModal, setOpenVariantModal] = useState<
    "buy" | "cart" | ""
  >()
  const [quantity, setQuantity] = useState<number>(1)

  // Functions
  const handleChangeVariantAttribute = (att: AttributeWithParentId) => {
    dispatch(changeAttributeItem(att))
  }

  const handleAddOrBuyProduct = (type: "buy" | "cart") => {
    if (!token) {
      router.push("/login")
      return
    }

    if (isAddLoading) return

    type === "buy" ? dispatch(setOpenScreenLoading(true)) : setAddLoading(true)

    addToCart(
      {
        product_id: product.product_prod_id,
        product_qty: quantity,
        token,
        uom_id: product.uom.id,
        offer_pricelist: false,
      },
      type !== "buy",
      () => {
        type === "buy"
          ? dispatch(setOpenScreenLoading(false))
          : setAddLoading(false)

        if (type === "buy") {
          setOpenVariantModal("")
          router.push("/cart")
        }
      },
      () => {
        type === "buy"
          ? dispatch(setOpenScreenLoading(false))
          : setAddLoading(false)
      }
    )
  }

  const handleAddToCompareList = () => {
    if (type === "detail" || type === "item") {
      dispatch(toggleShowCompareModal(true))
    } else {
      dispatch(setMessage({ title: "Đã thêm vào danh sách so sánh" }))
    }
    dispatch(addProductCompare(product))
  }

  return (
    <>
      <div
        ref={divRef}
        className={`product__intro ${
          type === "item" ? "product__intro-horizontal" : ""
        }`}
      >
        {type === "detail" ? (
          <div className="modal__product-header">
            <p className="modal__product-title">{product.product_name}</p>

            <div className="modal__product-sub">
              <p className="modal__product-sub-item modal__product-sub-item-star">
                <Star
                  ratingValue={product.star_rating * 20}
                  size={16}
                  readonly
                />
              </p>

              <p className="modal__product-sub-item modal__product-sub-item-rating">
                {product.rating_count} đánh giá
              </p>

              <p className="modal__product-sub-item modal__product-sub-item-comment">
                {product.comment_count} bình luận
              </p>
            </div>
          </div>
        ) : null}
        {type === "item" ? (
          <Link href={`/product/${product.product_tmpl_id}`} passHref>
            <a className="product__intro-title">{product.product_name}</a>
          </Link>
        ) : null}
        {type !== "item" ? (
          <div className="product__intro-price">
            <div className="product__intro-price-wrapper">
              <p
                className={`${
                  product?.daily_deal_promotion?.compute_price
                    ? "product__intro-price-old"
                    : "product__intro-price-current"
                }`}
              >
                {formatMoneyVND(
                  product?.daily_deal_promotion?.compute_price
                    ? product.price * quantity
                    : getPriceProduct(product) * quantity
                )}
              </p>

              {product?.daily_deal_promotion?.compute_price ? (
                <p className="product__intro-price-current">
                  {formatMoneyVND(getPriceProduct(product) * quantity)}
                </p>
              ) : null}

              <span className="product__intro-price-unit">
                / {quantity > 1 ? quantity : ""} {product?.uom?.name}
              </span>
            </div>
          </div>
        ) : null}

        {type !== "item" &&
        product?.attributes &&
        product.attributes.length > 0 ? (
          <div className="product__intro-variation-wrapper">
            {product.attributes.map((att) => (
              <ProductVariation
                onChangeAttribute={(att: AttributeWithParentId) =>
                  handleChangeVariantAttribute(att)
                }
                attribute={att}
                key={att.id}
              />
            ))}
          </div>
        ) : null}

        {type !== "item" ? (
          <div className="product__intro-quantity">
            <p>Số lượng</p>
            <InputQuantity
              quantity={quantity}
              onChangeQuantity={(q: number) => setQuantity(q)}
            />
          </div>
        ) : null}

        {type !== "item" ? (
          <div className="product__intro-shop">
            {type === "detail" ? (
              <>
                <button
                  onClick={() => setOpenVariantModal("buy")}
                  className="btn-primary product__intro-shop-cart-btn show-on-md"
                >
                  <span>Mua ngay</span>
                </button>

                <button
                  onClick={() => handleAddOrBuyProduct("buy")}
                  className="btn-primary product__intro-shop-cart-btn hide-on-md"
                >
                  <span>Mua ngay</span>
                </button>
              </>
            ) : null}

            <button
              onClick={() => handleAddOrBuyProduct("cart")}
              className="product__intro-shop-btn"
            >
              {isAddLoading ? (
                <RiLoader2Line className="loader" />
              ) : (
                <>
                  <FaShoppingBasket />
                  <span>Thêm giỏ hàng</span>
                </>
              )}
            </button>

            {type === "detail" ? (
              <button
                onClick={() => setOpenVariantModal("cart")}
                className="product__intro-shop-btn-sm product__intro-shop-cart-mobile"
              >
                <FaShoppingBasket />
                <span>Thêm giỏ hàng</span>
              </button>
            ) : null}

            {type === "detail" ? (
              <button
                onClick={() => dispatch(setOpenChatMobile(true))}
                className="product__intro-shop-btn-sm product__intro-shop-chat-btn"
              >
                <RiMessage2Fill />
                <span>Nhắn tin</span>
              </button>
            ) : null}
          </div>
        ) : null}

        {type === "item" ? (
          <div className="product__intro-price product__intro-price-sm">
            <p
              className={`${
                product?.daily_deal_promotion?.compute_price
                  ? "product__intro-price-old"
                  : "product__intro-price-current"
              }`}
            >
              {formatMoneyVND(
                product?.daily_deal_promotion?.compute_price
                  ? product.price * quantity
                  : getPriceProduct(product) * quantity
              )}
            </p>

            {product?.daily_deal_promotion?.compute_price ? (
              <p className="product__intro-price-current">
                {formatMoneyVND(getPriceProduct(product) * quantity)}
              </p>
            ) : null}

            <span className="product__intro-price-unit">
              / {quantity > 1 ? quantity : ""} {product?.uom?.name}
            </span>
          </div>
        ) : null}

        <div className="product__intro-bottom">
          <div className="product__intro-sub">
            <ButtonWishlist product={product} />

            <button
              onClick={handleAddToCompareList}
              className="product__intro-sub-item"
            >
              <RiArrowUpDownLine />
            </button>
          </div>

          <div className="product__intro-bottom-separate"></div>

          {type !== "item" ? (
            <ButtonShare
              product_id={product.product_tmpl_id}
              imageUrl={`${process.env.REACT_APP_API_URL}${product.image_url[0]}`}
              name={product.product_name}
              description={product.description}
            />
          ) : null}
        </div>
      </div>

      {openVariantModal && type === "detail" ? (
        <>
          <div className="product__variant-modal">
            <header className="product__variant-modal-header">
              <div className="product__variant-modal-header-left">
                {product?.image_url?.[0] ? (
                  <div className="image-container">
                    <Image
                      src={`${API_URL}${product?.image_url?.[0] || ""}`}
                      alt=""
                      layout="fill"
                      className="image"
                    />
                  </div>
                ) : null}

                <p>
                  {formatMoneyVND((product.price || 0) * quantity)}
                  <span>/</span>
                  <span>
                    {quantity} {product.uom.name}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setOpenVariantModal("")}
                className="btn-reset"
              >
                <IoClose />
              </button>
            </header>

            {product.attributes?.length > 0 ? (
              <div className="product__variant-modal-variants">
                {product.attributes.map((att) => (
                  <ProductVariation
                    onChangeAttribute={(att: AttributeWithParentId) =>
                      handleChangeVariantAttribute(att)
                    }
                    attribute={att}
                    key={att.id}
                  />
                ))}
              </div>
            ) : null}

            <div className="product__variant-modal-quantity">
              <p>Số lượng</p>
              <InputQuantity
                quantity={quantity}
                onChangeQuantity={(q: number) => setQuantity(q)}
              />
            </div>

            <div className="product__variant-modal-btn">
              <button
                onClick={() => handleAddOrBuyProduct(openVariantModal)}
                className="btn-primary"
              >
                {isAddLoading ? (
                  <RiLoader2Line className="loader" />
                ) : (
                  <span>
                    {openVariantModal === "buy" ? "Mua ngay" : "Thêm giỏ hàng"}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div
            onClick={() => setOpenVariantModal("")}
            className="product__variant-modal-overlay"
          ></div>
        </>
      ) : null}
    </>
  )
}
