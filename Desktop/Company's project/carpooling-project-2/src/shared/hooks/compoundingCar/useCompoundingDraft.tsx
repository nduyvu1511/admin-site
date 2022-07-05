import { LIMIT_COMPOUNDING_LIST, SWRConfig } from "@/helper"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"

interface UseDraftOrder {
  data: CompoundingCarRes[]
  isValidating: boolean
  isFetching: boolean
  isLimit: boolean
  fetchMore: (offset: number) => void
}

export const useRidesDraft = (limit: number): UseDraftOrder => {
  const [isFetching, setFetching] = useState<boolean>(false)
  const [isLimit, setLimit] = useState<boolean>(false)
  const { data, isValidating, mutate } = useSWR<CompoundingCarRes[]>(
    "customer_draft_order",
    () =>
      ridesApi.getPendingCompoundingCar({ limit }).then((res: any) => {
        const list = res?.result?.data || []
        checkRidesListLength(list.length)
        return list
      }),
    {
      ...SWRConfig,
    }
  )

  const checkRidesListLength = (length: number, limit = LIMIT_COMPOUNDING_LIST) => {
    if (!length || length < limit) {
      setLimit(true)
    } else {
      setLimit(false)
    }
  }

  const fetchMore = async (offset: number) => {
    try {
      setFetching(true)
      const res: any = await ridesApi.getPendingCompoundingCar({
        limit,
        offset,
      })
      const list: Array<any> = res?.result?.data || []
      setFetching(false)
      mutate([...(data || []), ...list], false)
      checkRidesListLength(list.length)
    } catch (error) {
      console.log(error)
      setFetching(false)
    }
  }

  return {
    data: data || [],
    isFetching,
    isValidating,
    fetchMore,
    isLimit,
  }
}
