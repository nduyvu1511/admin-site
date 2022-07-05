import { VehicleBrandRes } from "@/models"
import { vehicleApi } from "@/services"
import useSWR, { SWRConfig } from "swr"
import { PublicConfiguration } from "swr/dist/types"

interface Res {
  isValidating: boolean
  data: VehicleBrandRes[] | undefined
}

export const useFetchCarBrand = (config?: Partial<PublicConfiguration>): Res => {
  const { data, isValidating } = useSWR<VehicleBrandRes[]>(
    "get_car_brand",
    () =>
      vehicleApi
        .getCarBrands()
        .then((res: any) => res?.result?.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000,
      ...SWRConfig,
      ...config,
    } as any
  )

  return {
    data,
    isValidating,
  }
}
