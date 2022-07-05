import { RootState } from "@/core/store"
import { DistrictId, OptionModel, ProvinceId, WardId } from "@/models"
import { addressApi } from "@/services"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

interface UseAddress {
  getWards: (id: number) => void
  getDistricts: (id: number) => void
  provinces: ProvinceId[]
  provinceOptions: OptionModel[]
  districts: DistrictId[]
  districtOptions: OptionModel[]
  wards: WardId[]
  wardOptions: OptionModel[]
  clearDistricts: Function
  clearWards: Function
  clearAddressList: Function
  setDistricts: Function
  setWards: Function
  getProvinceId: (stringTerms: string) => number | undefined
  getProvinceOptionById: (id: number) => OptionModel | undefined
}

export const useAddress = (state_id?: number, district_id?: number): UseAddress => {
  const { provinces } = useSelector((state: RootState) => state.compoundingCarData)
  const [districts, setDistricts] = useState<DistrictId[]>([])
  const [wards, setWards] = useState<WardId[]>([])

  useEffect(() => {
    if (state_id) {
      getDistricts(state_id)
    }

    if (district_id) {
      getWards(district_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDistricts = (state_id: number) => {
    addressApi
      .getDistricts([state_id])
      .then((res: any) => setDistricts(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const getWards = (district_id: number) => {
    addressApi
      .getWards([district_id])
      .then((res: any) => setWards(res?.result?.data || []))
      .catch((err) => console.log(err))
  }

  const clearAddressList = () => {
    setDistricts([])
    setDistricts([])
    setWards([])
  }

  const clearDistricts = () => {
    setDistricts([])
  }

  const clearWards = () => {
    setWards([])
  }

  const getProvinceId = (stringTerms: string): number | undefined => {
    if (!provinces?.length) return

    const provinceId = provinces.find(
      (item) => item.province_vietnamese_name === stringTerms
    )?.province_id

    return provinceId
  }

  const getProvinceOptionById = (id: number | undefined): OptionModel | undefined => {
    if (!id) return
    return provinceOptions?.find((item) => item.value === id)
  }

  const provinceOptions: OptionModel[] = useMemo(() => {
    if (!provinces?.length) return []
    return provinces.map((item) => ({
      value: item.province_id,
      label: item.province_name,
    }))
  }, [provinces])

  const districtOptions: OptionModel[] = useMemo(() => {
    if (!districts?.length) return []
    return districts.map((item) => ({
      value: item.district_id,
      label: item.district_name,
    }))
  }, [districts])

  const wardOptions: OptionModel[] = useMemo(() => {
    if (!wards?.length) return []
    return wards.map((item) => ({
      value: item.ward_id,
      label: item.ward_name,
    }))
  }, [wards])

  return {
    getWards,
    getDistricts,
    districts,
    districtOptions,
    wards,
    provinces,
    clearDistricts,
    clearWards,
    clearAddressList,
    setDistricts,
    setWards,
    getProvinceId,
    provinceOptions,
    wardOptions,
    getProvinceOptionById,
  }
}
