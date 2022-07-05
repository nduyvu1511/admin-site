import {
  CertificateInspectionParams,
  CertificateInspectionRes,
  UpdateCertificateInspectionParams,
  UseParams,
} from "@/models"
import { setScreenLoading } from "@/modules"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface UseCertificateInspectionRes {
  data: CertificateInspectionRes | undefined
  isValidating: boolean
  createCertificateInspection: (
    para: UseParams<CertificateInspectionParams, CertificateInspectionRes>
  ) => void
  updateCertificateInspection: (
    para: UseParams<UpdateCertificateInspectionParams, CertificateInspectionRes>
  ) => void
}

const useCertificateInspection = (shouldFetch = false): UseCertificateInspectionRes => {
  const dispatch = useDispatch()

  const { data, isValidating } = useSWR<CertificateInspectionRes>(
    "certificate_inspection",
    shouldFetch
      ? () => userApi.getCertificateInspection().then((res: any) => res?.result?.data)
      : null,
    {
      shouldRetryOnError: false,
      dedupingInterval: 1000 * 60 * 60,
      revalidateOnFocus: false,
    }
  )

  const createCertificateInspection = async (
    para: UseParams<CertificateInspectionParams, CertificateInspectionRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.createCertificateInspection(params)
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

  const updateCertificateInspection = async (
    para: UseParams<UpdateCertificateInspectionParams, CertificateInspectionRes>
  ) => {
    const { onSuccess, params, onError } = para
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateCertificateInspection(params)
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
    createCertificateInspection,
    updateCertificateInspection,
  }
}

export { useCertificateInspection }
