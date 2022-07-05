import { setScreenLoading } from "@/modules"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

export interface FetcherHandlerParams<T, V> {
  fetcher: Promise<T>
  onSuccess: (params: V) => void
  onError?: () => void
  config?: {
    showScreenLoading?: boolean
    errorMsg?: boolean
    successMsg?: string
    showErrorMsg?: boolean
  }
}

export interface Res {
  fetcherHandler: <T, V>(params: FetcherHandlerParams<T, V>) => void
}

const useFetcher = () => {
  const dispatch = useDispatch()

  const fetcherHandler = async <T, V>(params: FetcherHandlerParams<T, V>) => {
    const { fetcher, onSuccess, onError, config } = params
    const { showScreenLoading = true, errorMsg, successMsg, showErrorMsg = true } = config || {}
    try {
      showScreenLoading && dispatch(setScreenLoading(true))
      const res: any = await fetcher
      showScreenLoading && dispatch(setScreenLoading(false))
      if (!res?.result?.success) {
        onError?.()
        showErrorMsg && dispatch(notify(res?.result?.message || errorMsg, "error"))
        return
      }
      successMsg && dispatch(notify(successMsg, "success"))
      console.log("after dispatch successMsg")
      onSuccess(res?.result?.data)
      return res?.result?.data
    } catch (error) {
      onError?.()
      showScreenLoading && dispatch(setScreenLoading(false))
    }
  }

  return {
    fetcherHandler,
  }
}

export { useFetcher }
