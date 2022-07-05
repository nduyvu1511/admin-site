import { SWRConfig } from "@/helper"
import { CompoundingCarDriverRes } from "@/models"
import { ridesApi } from "@/services"
import useSWR, { KeyedMutator } from "swr"

interface Res {
  data: CompoundingCarDriverRes | undefined
  isValidating: boolean
  mutate: KeyedMutator<CompoundingCarDriverRes>
  isInitialLoading: boolean
}

interface UseFetchCompoundingCarDetailProps {
  key: string
  type: "autoFocus" | "once"
  compounding_car_id?: number
}

export const useFetchCompoundingCarDetail = ({
  type,
  key,
  compounding_car_id,
}: UseFetchCompoundingCarDetailProps): Res => {
  const { isValidating, data, mutate, error } = useSWR<CompoundingCarDriverRes, any>(
    compounding_car_id ? key : null,
    () =>
      ridesApi
        .getDetailCompoundingCar({
          compounding_car_id: Number(compounding_car_id),
        })
        .then((res: any) => res?.result?.data)
        .catch((err) => console.log(err)),
    type === "once"
      ? { ...SWRConfig, dedupingInterval: 1000 }
      : {
          dedupingInterval: 0,
          revalidateOnFocus: true,
        }
  )

  return {
    isValidating,
    data,
    mutate,
    isInitialLoading: error === undefined && data === undefined,
  }
}
