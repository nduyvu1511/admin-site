import { isObjectHasValue } from "@/helper"
import { Product } from "@/models"
import _ from "lodash"
import { RiCloseCircleFill } from "react-icons/ri"
import { ProductDetailLoading } from "../loader"
import ProductImg from "./productImage"
import { ProductIntro } from "./productIntro"

interface ModalProduct {
  handleClickModal?: Function
  type: "detail" | "modal"
  product: Product | null
  isLoading: boolean
}

export const ProductDetail = ({
  handleClickModal,
  type,
  product,
  isLoading,
}: ModalProduct) => {
  return (
    <>
      {isLoading && !isObjectHasValue(product) ? (
        <ProductDetailLoading />
      ) : _.isObject(product) && Object.keys(product).length > 0 ? (
        <div className="modal__product">
          {handleClickModal ? (
            <button
              className="modal__product-btn-close btn-reset"
              onClick={() => handleClickModal && handleClickModal()}
            >
              <RiCloseCircleFill />
            </button>
          ) : null}

          {type === "modal" ? (
            <div className="modal__product-header">
              <h1 className="modal__product-title">{product.product_name}</h1>
            </div>
          ) : null}

          <div className="modal__product-content">
            {_.isArray(product.image_url) && product.image_url.length > 0 ? (
              <ProductImg
                isStock={product.qty_available > 0}
                type={type}
                images={product.image_url}
              />
            ) : null}
            <ProductIntro type={type} product={product} />
          </div>
        </div>
      ) : null}
    </>
  )
}
