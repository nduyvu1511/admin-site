import { Product } from "@/models"
import { API_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { ProductListLoading } from "../loader"
import { ProductIntro } from "./productIntro"

interface ProductItemListProps {
  product: Product
  isLoading?: boolean
}

export const ProductItemList = ({
  product,
  isLoading,
}: ProductItemListProps) => {
  return (
    <>
      {isLoading ? (
        <ProductListLoading type="large" />
      ) : (
        <div className="product__item-list">
          <div className="product__card__img">
            <Link
              href={`/product/${
                product.attributes.length > 0
                  ? product.product_tmpl_id
                  : product.product_prod_id
              }`}
              passHref
            >
              <a>
                <Image
                  className={`image product__card__img-top product__card__img-top-first ${
                    !product.image_url[0] ? "product__card__img-top-only" : ""
                  }`}
                  src={`${API_URL}${product.image_url[0]}`}
                  alt=""
                  layout="fill"
                />
              </a>
            </Link>
          </div>
          <ProductIntro type="item" product={product} />
        </div>
      )}
    </>
  )
}
