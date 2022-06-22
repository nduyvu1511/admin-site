import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { DeleteWishlistHook, Product, Wishlist } from "@/models"
import { setMessage } from "@/modules"
import userApi from "@/services/userApi"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface WishlistSWR {
  data: Wishlist[]
  error: any
  isValidating: boolean
  toggleWishlist: (
    props: Product,
    handleSuccess: Function,
    handleError: Function
  ) => void
  handleDeleteWishlist: (
    { product_id, wishlist_id }: DeleteWishlistHook,
    handleSuccess?: Function,
    handleError?: Function
  ) => void
}

const useWishlist = (isFetchData: boolean): WishlistSWR => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.user)

  const { data, error, isValidating, mutate } = useSWR(
    "wishlist",
    isFetchData && token
      ? () => userApi.getWishlists({ token }).then((res: any) => res?.result)
      : null,
    { revalidateOnFocus: false, dedupingInterval: 10 }
  )

  const handleDeleteWishlist = (
    { wishlist_id, product_id }: DeleteWishlistHook,
    handleSuccess?: Function,
    handleError?: Function
  ) => {
    if (!token) return

    userApi
      .deleteWishlist({ token, product_id, wishlist_id })
      .then((res: any) => {
        if (res.result?.[0]) {
          mutate(
            [...data].filter((item) => item.id !== res.result?.[0]),
            false
          )
          handleSuccess && handleSuccess()
        } else {
          handleError && handleError()
        }
      })
      .catch(() => {
        handleError && handleError()
      })
  }

  const toggleWishlist = (
    product: Product,
    handleSuccess: Function,
    handleError: Function
  ) => {
    if (!token) {
      router.push("/login")
      return
    }

    if (!product || Object.keys(product).length === 0) return

    if (!isArrayHasValue(data)) {
      userApi
        .addWishlist({ token, product_id: product.product_tmpl_id })
        .then((res: any) => {
          if (res?.result?.id) {
            mutate([res.result], false)
            handleSuccess()
          } else {
            handleError()
            dispatch(
              setMessage({
                title: res?.result?.message || "Có lỗi khi thêm vào yêu thích",
                type: "danger",
              })
            )
          }
        })
        .catch(() => {
          handleError()
        })
      return
    }

    const wishlist: Wishlist | undefined = (data as Wishlist[]).find(
      (item) =>
        item.product_id === product.product_tmpl_id &&
        item.id_product_att === product.product_prod_id
    )

    if (wishlist) {
      handleDeleteWishlist(
        {
          product_id: product.product_tmpl_id,
          wishlist_id: wishlist.id,
        },
        () => {
          handleSuccess()
        },
        () => {
          handleError()
        }
      )
    } else {
      userApi
        .addWishlist({ token, product_id: product.product_tmpl_id })
        .then((res: any) => {
          if (res?.result?.id) {
            mutate([res.result, ...data], false)
            handleSuccess()
          } else {
            dispatch(
              setMessage({
                title: res?.result?.message || "",
                type: "danger",
              })
            )
            handleError()
          }
        })
        .catch(() => {
          handleError()
        })
    }
  }

  return {
    data,
    error,
    isValidating,
    toggleWishlist,
    handleDeleteWishlist,
  }
}

export { useWishlist }
