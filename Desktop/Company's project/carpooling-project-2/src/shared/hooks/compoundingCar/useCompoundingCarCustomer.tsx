import { SWRConfig } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { ridesApi } from "@/services"
import useSWR from "swr"

interface Res {
  data: CompoundingCarCustomer | undefined
  isValidating: boolean
  isInitialLoading: boolean
}

interface Props {
  key: string
  type: "once" | "autoFocus"
  compounding_car_customer_id?: number
}

export const useFetchCompoundingCarCustomerDetail = ({
  key,
  type,
  compounding_car_customer_id,
}: Props): Res => {
  const { isValidating, data, error } = useSWR<CompoundingCarCustomer, any>(
    compounding_car_customer_id ? key : null,
    () =>
      ridesApi
        .getDetailCompoundingCarCustomer({
          compounding_car_customer_id: Number(compounding_car_customer_id),
        })
        .then((res: any) => res?.result?.data)
        .catch((err) => console.log(err)),
    type === "once"
      ? {
          dedupingInterval: 0,
          revalidateOnFocus: true,
        }
      : {
          ...SWRConfig,
          dedupingInterval: 10000,
        }
  )

  return {
    isValidating,
    data,
    isInitialLoading: error === undefined && data === undefined,
  }
}
