import { Price } from "@/components"
import { RootState } from "@/core/store"
import {
  DEFAULT_LIMIT_PRODUCT,
  isArrayHasValue,
  isObjectHasValue,
} from "@/helper"
import { Product, ProductParams, TypeGet } from "@/models"
import productApi from "@/services/productApi"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

interface UseQueryProductRes {
  products: Product[]
  handleFilter: (params: ProductParams) => void
  isLoadingMore: boolean
  isLimit: boolean
  setProducts: (props: Product[]) => void
  setLimit: Function
  handleChangePage: Function
  handleSortProducts: Function
  isFetching: boolean
  filterAttribute: (parentId: string, childId: string) => void
  filterPrice: (prices: Price) => void
  filterStarRating: (star: string) => void
}

const useQueryProducts = (): UseQueryProductRes => {
  const router = useRouter()
  const offset = Number(router.query?.offset) || 0
  const limit = Number(router.query?.limit) || DEFAULT_LIMIT_PRODUCT
  const { userInfo: { id: partner_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)

  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)
  const [isFetching, setFetching] = useState<boolean>(false)

  const handleFilter = async (params: ProductParams) => {
    const _limit = Number(params?.limit) || limit
    const offset = Number(params?.offset) || 0
    if (offset >= _limit) {
      setLoadingMore(true)
    } else {
      setFetching(true)
    }

    try {
      const { query } = router
      let productsFetch: Product[] = []
      if (
        Object.keys(query).some(
          (key) =>
            key.includes("attributes_") ||
            key === "star_rating" ||
            key === "price_range"
        )
      ) {
        const res: any = await productApi.filterProducts({
          ...params,
          partner_id,
          limit: _limit + 1,
        })
        productsFetch = res?.result?.data || []
      } else {
        const res: any = await productApi.getProductList({
          ...params,
          partner_id,
          limit: _limit + 1,
        })

        productsFetch = res?.result || []
      }

      // Set limit and loading more status
      setLimit(productsFetch.length <= _limit)

      setLoadingMore(false)
      setFetching(false)

      const newProducts = productsFetch?.slice(0, _limit) || []

      // Assign if offset is smaller than limit otherwise push to array
      if (offset >= _limit) {
        if (
          isArrayHasValue(newProducts) &&
          !products?.some((item) =>
            newProducts?.find(
              (x: Product) => x.product_prod_id === item.product_prod_id
            )
          )
        ) {
          setProducts([...products, ...newProducts])
        }
      } else {
        setProducts(newProducts)
      }
    } catch (error) {
      setLoadingMore(false)
      setFetching(false)
    }
  }

  const filterStarRating = (star: string) => {
    if (router.query?.star_rating === star) return

    router.push(
      {
        query: { ...router.query, offset: 0, star_rating: Number(star) },
      },
      undefined,
      {
        shallow: true,
        scroll: true,
      }
    )
  }

  const filterAttribute = (parentId: string, childId: string) => {
    const attribute = `attributes_${parentId}`
    const attributeIds: any = router.query?.[attribute]

    let query = router.query
    if (!attributeIds) {
      query[attribute] = childId
    } else {
      if (typeof attributeIds === "string") {
        if (attributeIds === childId) {
          delete query[attribute]
        } else {
          query[attribute] = [attributeIds, childId]
        }
      } else if (typeof attributeIds === "object") {
        if (attributeIds?.includes(childId)) {
          query[attribute] = attributeIds.filter(
            (item: string) => item !== childId
          )
        } else {
          query[attribute] = [...attributeIds, childId]
        }
      } else {
        query[attribute] = childId
      }
    }

    router.push(
      {
        query: { ...query, offset: 0 },
      },
      undefined,
      { shallow: true, scroll: true }
    )
  }

  const filterPrice = (prices: Price) => {
    if (!prices || !isObjectHasValue(prices) || prices.min >= prices.max) return

    router.push(
      {
        query: {
          ...router.query,
          offset: 0,
          price_range: [prices.min, prices.max],
        },
      },
      undefined,
      { shallow: true, scroll: true }
    )
  }

  const handleChangePage = () => {
    if (isLoadingMore) return

    router.push(
      {
        query: {
          ...router.query,
          offset: offset + limit,
        },
      },
      undefined,
      { scroll: false, shallow: true }
    )
  }

  const handleSortProducts = (value: TypeGet) => {
    router.push(
      {
        query: {
          ...router.query,
          type_get: value,
          offset: 0,
        },
      },
      undefined,
      { scroll: true, shallow: true }
    )
  }

  return {
    products,
    handleFilter,
    isLimit,
    isLoadingMore,
    setProducts,
    setLimit,
    handleChangePage,
    filterAttribute,
    filterPrice,
    handleSortProducts,
    isFetching,
    filterStarRating,
  }
}

export { useQueryProducts }
