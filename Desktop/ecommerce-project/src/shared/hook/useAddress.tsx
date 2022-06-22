import { AddressId, WardAddress } from "@/models"
import userApi from "@/services/userApi"
import { useEffect, useState } from "react"

interface UseAddressRes {
  getWards: (id: number) => void
  getDistricts: (id: number) => void
  states: AddressId[] | undefined
  districts: AddressId[] | undefined
  wards: WardAddress[] | undefined
  clearDistricts: Function
  clearWards: Function
  clearAddressList: Function
  setDistricts: Function
  setWards: Function
}

export const useAddress = (): UseAddressRes => {
  const [states, setStates] = useState<AddressId[]>()
  const [districts, setDistricts] = useState<AddressId[]>()
  const [wards, setWards] = useState<WardAddress[]>()

  useEffect(() => {
    getStates()
  }, [])

  const getDistricts = (state_id: number) => {
    userApi
      .getAddress({ state_id })
      .then((res: any) => setDistricts(res.result?.data || []))
  }

  const getStates = () => {
    userApi.getAddress({}).then((res: any) => setStates(res.result?.data || []))
  }

  const getWards = (district_id: number) => {
    userApi
      .getAddress({ district_id })
      .then((res: any) => setWards(res.result?.data || []))
  }

  const clearAddressList = () => {
    setDistricts(undefined)
    setDistricts(undefined)
    setWards(undefined)
  }

  const clearDistricts = () => {
    setDistricts(undefined)
  }

  const clearWards = () => {
    setWards(undefined)
  }

  return {
    getWards,
    getDistricts,
    states,
    districts,
    wards,
    clearDistricts,
    clearWards,
    clearAddressList,
    setDistricts,
    setWards,
  }
}
