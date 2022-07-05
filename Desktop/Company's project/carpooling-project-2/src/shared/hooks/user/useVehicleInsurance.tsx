import { RootState } from "@/core/store"
import {
  UpdateVehicleInsuranceParams,
  UseParams,
  VehicleInsuranceParams,
  VehicleInsuranceRes,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseVehicleInsuranceRes {
  data: VehicleInsuranceRes | undefined
  isValidating: boolean
  createVehicleInsurance: (para: UseParams<VehicleInsuranceParams, VehicleInsuranceRes>) => void
  updateVehicleInsurance: (
    para: UseParams<UpdateVehicleInsuranceParams, VehicleInsuranceRes>
  ) => void
}

const useVehicleInsurance = (shouldFetch = false): UseVehicleInsuranceRes => {
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<VehicleInsuranceRes>(
    "vehicle_insurance",
    shouldFetch ? () => userApi.getVehicleInsurance().then((res: any) => res?.result?.data) : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  )

  const createVehicleInsurance = async (
    para: UseParams<VehicleInsuranceParams, VehicleInsuranceRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createVehicleInsurance(params)
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

  const updateVehicleInsurance = async (
    para: UseParams<UpdateVehicleInsuranceParams, VehicleInsuranceRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateVehicleInsurance(params)
      dispatch(setScreenLoading(false))

      if (!res?.result?.success) {
        onError && onError()
        dispatch(notify(res?.result?.message, "error"))
        return
      }

      onSuccess(res?.result?.data)
    } catch (error) {
      dispatch(setScreenLoading(false))
      onError && onError()
    }
  }

  return {
    data,
    isValidating,
    createVehicleInsurance,
    updateVehicleInsurance,
  }
}

export { useVehicleInsurance }
