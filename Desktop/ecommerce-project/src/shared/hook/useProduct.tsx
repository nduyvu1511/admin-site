import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { Product, ProductParams } from "@/models"
import { setSearchingStatus } from "@/modules"
import productApi from "@/services/productApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface Props {
  params?: ProductParams
  key: string
  shouldFetch?: boolean
}

interface ProductSWR {
  data: Product[]
  error: any
  isValidating: boolean
  handleSearchProduct: Function
  clearSearchResult: Function
  toggleWishlistStatus: (id: number) => void
}

const useProduct = ({ params, key, shouldFetch = true }: Props): ProductSWR => {
  const dispatch = useDispatch()

  const { userInfo: { id: partner_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const { data, error, isValidating, mutate } = useSWR(
    key,
    key === "products_search" || !shouldFetch
      ? null
      : () =>
          productApi
            .getProductList({ ...params, partner_id })
            .then((res: any) => res?.result),
    {
      revalidateOnFocus: false,
      dedupingInterval: 12000,
    }
  )

  const toggleWishlistStatus = (product_id: number) => {
    if (isArrayHasValue(data)) {
      mutate(
        [...data].map((item: Product) =>
          item.product_prod_id === product_id
            ? { ...item, wishlist: !item.wishlist }
            : item
        ),
        false
      )
    }
  }

  const handleSearchProduct = async (value: string) => {
    dispatch(setSearchingStatus(true))
    const data: any = await productApi.getProductList({
      keyword: value,
      partner_id: partner_id || 0,
    })
    dispatch(setSearchingStatus(false))
    mutate(data?.result || [], false)
  }

  const clearSearchResult = () => {
    mutate([], false)
  }

  return {
    data,
    error,
    isValidating,
    handleSearchProduct,
    clearSearchResult,
    toggleWishlistStatus,
  }
}

export { useProduct }

