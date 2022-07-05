import { SWRConfig } from "@/helper"
import { FilledDataFieldsKey, FilledDataFieldsRes } from "@/models"
import { userApi } from "@/services"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  data: FilledDataFieldsRes | undefined
  setFillDataForm: (key: FilledDataFieldsKey) => void
}

export const useFetchFilledDriverFormFields = (shouldFetch = true): Res => {
  const { data, isValidating, mutate } = useSWR<FilledDataFieldsRes>(
    "get_filled_data_fields",
    shouldFetch ? () => userApi.getFilledDataFields().then((res: any) => res?.result?.data) : null,
    {
      ...SWRConfig,
      dedupingInterval: 30000,
    }
  )

  const setFillDataForm = (key: FilledDataFieldsKey) => {
    if (!data) return
    mutate({ ...data, [key]: true } as FilledDataFieldsRes, false)
  }

  return {
    data,
    isValidating,
    setFillDataForm,
  }
}
