import { RootState } from "@/core/store"
import {
  AddressAdd,
  AddressDelete,
  ShippingAddress,
  UserDetail,
} from "@/models"
import { setAddress, setAddressDefault, setMessage } from "@/modules"
import userApi from "@/services/userApi"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface AddAddressHook {
  address: AddressAdd
  addressForm: ShippingAddress
}

interface AccountSWR {
  data: UserDetail
  error: any
  isValidating: boolean
  addAddress: ({ address, addressForm }: AddAddressHook) => Promise<any>
  deleteAddress: (address: AddressDelete) => Promise<any>
}

export const useUserAddress = (shouldFetch = true): AccountSWR => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    addressDefault,
    token,
    userInfo: { id: partner_id = 0 } = { userInfo: undefined },
  } = useSelector((state: RootState) => state.user)
  const { address: orderAddress } = useSelector(
    (state: RootState) => state.order
  )

  const { data, error, isValidating, mutate } = useSWR(
    "user_detail",
    token && shouldFetch
      ? () =>
          userApi
            .getDetailUser({ token })
            .then((res: any) => res.result.data?.info_customer || {})
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const addAddress = async ({ address, addressForm }: AddAddressHook) => {
    if (!token) {
      router.push("/login")
    }

    try {
      const res: any = await userApi.addAddress(address)

      if (res?.result?.success) {
        if (address.adress_id) {
          mutate(
            {
              ...data,
              shipping_adress: [...data.shipping_adress].map(
                (item: ShippingAddress) =>
                  item.id === address.adress_id ? addressForm : item
              ),
            },
            false
          )

          if (addressDefault?.id === addressForm.id) {
            dispatch(setAddressDefault(addressForm))
          }

          if (orderAddress?.id === addressForm.id) {
            dispatch(setAddress(addressForm))
          }

          dispatch(
            setMessage({
              title: "Chỉnh sửa địa chỉ thành công",
            })
          )
        } else {
          mutate(
            {
              ...data,
              shipping_adress: [
                ...data.shipping_adress,
                {
                  ...addressForm,
                  id: res.result.data?.[0]?.partner_shipping_id,
                },
              ],
            },
            false
          )

          if (router.pathname === "/checkout") {
            dispatch(
              setAddress({
                ...addressForm,
                id: res.result.data?.[0]?.partner_shipping_id,
              })
            )
          }

          dispatch(setMessage({ title: "Thêm địa chỉ thành công" }))
        }
      } else {
        dispatch(
          setMessage({
            title: res.result.message as string,
            type: "danger",
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAddress = async (address: AddressDelete) => {
    try {
      const res: any = await userApi.deleteAddress({
        adress_id: address.adress_id,
        partner_id,
        token,
      })
      if (res?.result?.success) {
        mutate(
          {
            ...(data as UserDetail),
            shipping_adress: [...data.shipping_adress].filter(
              (item) => item.id !== address.adress_id
            ),
          },
          false
        )

        if (addressDefault?.id === address.adress_id) {
          dispatch(setAddressDefault(undefined))
        }

        if (orderAddress?.id === address.adress_id) {
          dispatch(setAddress(undefined))
          if (addressDefault?.id !== orderAddress.id) {
            dispatch(setAddress(addressDefault))
          }
        }
      } else {
        dispatch(
          setMessage({
            title: res.result.message as string,
            type: "danger",
            duration: 4000,
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    error,
    isValidating,
    addAddress,
    deleteAddress,
  }
}
