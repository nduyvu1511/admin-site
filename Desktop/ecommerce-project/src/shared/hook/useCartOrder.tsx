import { RootState } from "@/core/store"
import { isArrayHasValue, isObjectHasValue } from "@/helper"
import { CartItem } from "@/models"
import {
  setAddress,
  setDelivery,
  setMessage,
  setOrderDraft,
  setPayment,
  setProductList,
  setPromotionLineList,
} from "@/modules"
import cartApi, { AddToCartProps } from "@/services/cartApi"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"
import { usePromotion } from "./usePromotion"

interface UseCartOrderProps {
  toggleEachInput: (cart: CartItem) => void
  toggleCheckAllCart: Function
  updateQuantity: (
    cart: CartItem,
    handleSuccess: Function,
    handleError?: Function
  ) => void
  deleteCartItem: (cart: CartItem[]) => void
  findProductFromProductList: (id: number) => CartItem | null | undefined
  handleResetOrderField: Function
  carts: CartItem[]
  totalMoney: number
  isValidating: boolean
  addToCart: (
    cart: AddToCartProps,
    showMessage?: boolean,
    callback?: Function,
    onError?: Function
  ) => void
}

const useCartOrder = (shouldFetch = false): UseCartOrderProps => {
  const dispatch = useDispatch()
  const { cancelPromotion } = usePromotion(false)
  const {
    productList,
    orderDraft,
    address,
    delivery,
    payment,
    promotion,
    promotionLineList,
  } = useSelector((state: RootState) => state.order)
  const { token } = useSelector((state: RootState) => state.user)

  const {
    data = [],
    isValidating,
    mutate,
  } = useSWR(
    "cart_list",
    shouldFetch && token
      ? () =>
          cartApi
            .getCartList({ token })
            .then((res: any) => res?.result?.data || [])
      : null,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      dedupingInterval: 60,
    }
  )

  const handleResetOrderField = () => {
    if (orderDraft) {
      dispatch(setOrderDraft(undefined))
    }
    if (address) {
      dispatch(setAddress(undefined))
    }
    if (delivery) {
      dispatch(setDelivery(undefined))
    }
    if (payment) {
      dispatch(setPayment(undefined))
    }
    if (promotion) {
      cancelPromotion()
    }
    if (promotionLineList) {
      dispatch(setPromotionLineList(undefined))
    }
  }

  const getDiffCartsById = (cartIds: number[]): CartItem[] | undefined => {
    if (!productList || productList?.length === 0) return undefined

    const newCarts = [...productList].filter(
      (item) => !cartIds.includes(item.stored_product_id)
    )

    return newCarts?.length === 0 ? undefined : newCarts
  }

  const findProductFromProductList = (stored_product_id: number) => {
    return productList && productList?.length > 0
      ? productList.find((item) => item.stored_product_id === stored_product_id)
      : undefined
  }

  const toggleEachInput = (cart: CartItem) => {
    handleResetOrderField()
    if (!productList) {
      return dispatch(setProductList([cart]))
    }

    if (findProductFromProductList(cart.stored_product_id)) {
      dispatch(
        setProductList(getDiffCartsById([cart.stored_product_id]) || null)
      )
    } else {
      dispatch(setProductList([cart, ...productList]))
    }
  }

  const toggleCheckAllCart = () => {
    handleResetOrderField()
    if (data?.length === productList?.length) {
      dispatch(setProductList(null))
    } else {
      dispatch(setProductList(data))
    }
  }

  const deleteCartItem = async (carts: CartItem[]) => {
    if (!token) return

    const cartIds = carts.map((item) => item.stored_product_id)
    const res: any = await cartApi.deleteFromCart({
      stored_product_ids: cartIds,
      token,
    })

    if (res?.result?.success) {
      if (isArrayHasValue(data)) {
        mutate(
          [...data].filter(
            (item: CartItem) => !cartIds.includes(item.stored_product_id)
          ),
          false
        )
      }

      if (productList) {
        if (
          productList?.some((item) => cartIds.includes(item.stored_product_id))
        ) {
          handleResetOrderField()
          dispatch(setProductList(getDiffCartsById(cartIds)))
        }

        if (data.length === 1) {
          dispatch(setProductList(undefined))
        }
      }
    } else {
      dispatch(
        setMessage({
          title: res?.result?.message || "Xóa giỏ hàng không thành công",
          type: "danger",
        })
      )
    }
  }

  const addToCart = async (
    cart: AddToCartProps,
    showMessage?: boolean,
    callback?: Function,
    onError?: Function
  ) => {
    if (!token) return

    try {
      const res: any = await cartApi.addToCart(cart)

      if (res?.result?.success) {
        const newCart: CartItem = isObjectHasValue(res?.result?.data)
          ? res.result.data
          : null

        if (!newCart) return

        if (data && data?.length > 0) {
          if (
            data.some(
              (item: CartItem) =>
                item.stored_product_id === newCart.stored_product_id
            )
          ) {
            mutate(
              [...data].map((item: CartItem) =>
                item.stored_product_id === item.stored_product_id
                  ? {
                      ...item,
                      product_qty: item.product_qty + cart.product_qty,
                    }
                  : item
              ),
              false
            )
            showMessage &&
              dispatch(setMessage({ title: "Cập nhật giỏ hàng thành công" }))
          } else {
            mutate([newCart, ...data], false)
            showMessage &&
              dispatch(setMessage({ title: "Thêm giỏ hàng thành công" }))
          }
        } else {
          mutate([newCart], false)
          showMessage &&
            dispatch(setMessage({ title: "Thêm giỏ hàng thành công" }))
        }

        callback && callback()
      } else {
        dispatch(
          setMessage({
            title: res?.result?.message || "Có lỗi khi thêm giỏ hàng",
            type: "warning",
          })
        )
        onError && onError()
      }
    } catch (error) {
      onError && onError()
    }
  }

  const updateQuantity = async (
    cart: CartItem,
    handleSuccess: Function,
    handleError?: Function
  ) => {
    if (!token || !isArrayHasValue(data) || !cart?.product_qty) return

    handleResetOrderField()

    try {
      const res: any = await cartApi.updateCartItem({
        product_qty: cart.product_qty,
        stored_product_id: cart.stored_product_id,
        token,
      })

      if (res?.result?.success) {
        handleSuccess && handleSuccess()
        const newCart = res?.result?.data
        const newCarts = [...data].map((item: CartItem) =>
          item.stored_product_id === cart.stored_product_id
            ? isObjectHasValue(newCart)
              ? newCart
              : { ...item, product_qty: item.product_qty }
            : item
        )
        mutate(newCarts, false)

        if (findProductFromProductList(cart.stored_product_id)) {
          dispatch(setProductList(newCarts))
        }
      } else {
        handleError && handleError()
      }
    } catch (error) {
      handleError && handleError()
    }
  }

  const totalMoney = useMemo(() => {
    return data?.length || 0 > 0
      ? (data as CartItem[]).reduce(
          (a, b) => b.price_unit_discount * b.product_qty + a,
          0
        )
      : 0
  }, [data])

  return {
    toggleEachInput,
    toggleCheckAllCart,
    updateQuantity,
    deleteCartItem,
    findProductFromProductList,
    handleResetOrderField,
    carts: data,
    totalMoney,
    isValidating,
    addToCart,
  }
}

export { useCartOrder }
