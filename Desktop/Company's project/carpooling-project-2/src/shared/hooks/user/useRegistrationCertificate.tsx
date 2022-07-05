import {
  RegistrationCertificateRes,
  UpdateVehicleDetailFormParams,
  UseParams,
  VehicleDetailFormParams
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseRegistrationCertificateRes {
  data: RegistrationCertificateRes | undefined
  isValidating: boolean
  createRegistrationCertificate: (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
  updateRegistrationCertificate: (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => void
}

const useRegistrationCertificate = (shouldFetch = false): UseRegistrationCertificateRes => {
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<RegistrationCertificateRes>(
    "registration_certificate",
    shouldFetch
      ? () => userApi.getCertificateRegistrationVehicle().then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  )

  const createRegistrationCertificate = async (
    para: UseParams<VehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createCertificateRegistrationVehicle(params)
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

  const updateRegistrationCertificate = async (
    para: UseParams<UpdateVehicleDetailFormParams, RegistrationCertificateRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateCertificateRegistrationVehicle(params)
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

  return {
    data,
    isValidating,
    createRegistrationCertificate,
    updateRegistrationCertificate,
  }
}

export { useRegistrationCertificate }

