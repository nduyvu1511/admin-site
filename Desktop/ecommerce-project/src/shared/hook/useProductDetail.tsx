import { RootState } from "@/core/store"
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { ProductDetail, ProductDetailRes } from "@/models"
import productApi from "@/services/productApi"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

interface Props {
  product: ProductDetail
}

interface UseProductDetailProps {
  product: ProductDetail | null
  clearProductDetail: Function
}

const useProductDetail = ({ product }: Props): UseProductDetailProps => {
  const firstRef = useRef<boolean>(false)
  const { listAttribute } = useSelector((state: RootState) => state.product)
  const { userInfo: { id: partner_id = 1 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(() =>
    product?.product_tmpl_id ? product : null
  )

  const toggelWishlistStatus = () => {
    if (productDetail) {
    }
  }

  useEffect(() => {
    if (firstRef.current) {
      if (
        !listAttribute ||
        !isArrayHasValue(listAttribute) ||
        !isObjectHasValue(product)
      )
        return

      productApi
        .getProductDetail({
          product_id: product.product_prod_id,
          partner_id,
          list_products: [
            {
              id: product.product_tmpl_id,
              lst_attributes_id: listAttribute.map((item) => item.id),
            },
          ],
        })
        .then((res: any) => {
          const productDetailFetch: ProductDetailRes = res.result.data.detail
          if (isObjectHasValue(productDetailFetch)) {
            setProductDetail({
              ...product,
              ...productDetail,
              image_url:
                productDetailFetch.image_url?.length > 0
                  ? productDetailFetch.image_url
                  : product.image_url,
              price: productDetailFetch.price,
              product_prod_id: productDetailFetch.id,
              qty_available: productDetailFetch.qty_available,
            })
          }
        })
    } else {
      firstRef.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAttribute])

  const clearProductDetail = () => {
    setProductDetail(null)
  }

  return { product: productDetail, clearProductDetail }
}

export { useProductDetail }
