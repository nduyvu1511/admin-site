import { IdCardParams, IdCardUpdateParams, IdentityCardRes, UseParams } from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseIdentityCardRes {
  data: IdentityCardRes | undefined
  isValidating: boolean
  createIdentityCard: (para: UseParams<IdCardParams, IdentityCardRes>) => void
  updateIdentityCard: (para: UseParams<IdCardUpdateParams, IdentityCardRes>) => void
}

const useIdentityCard = (shouldFetch = false): UseIdentityCardRes => {
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<IdentityCardRes>(
    "identity_card",
    shouldFetch ? () => userApi.getIdentityCard().then((res: any) => res?.result?.data) : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  )

  const createIdentityCard = async (para: UseParams<IdCardParams, IdentityCardRes>) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createIdentityCard(params)
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  const updateIdentityCard = async (para: UseParams<IdCardUpdateParams, IdentityCardRes>) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateIdentityCard(params)
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      onError && onError()
      dispatch(setScreenLoading(false))
    }
  }

  return { data, isValidating, createIdentityCard, updateIdentityCard }
}

export { useIdentityCard }
