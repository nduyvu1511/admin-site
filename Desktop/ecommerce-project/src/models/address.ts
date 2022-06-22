import { Payment } from "./order"

export interface WardAddress {
  id: number
  name: string
  district_id: number
  district_name: string
  state_id: number
  state_name: string
  country_id: number
  country_name: string
}

export interface AddressPost {
  id: number
  name: string
  district_id: number
  district_name: string
  state_id: number
  state_name: string
  country_id: number
  country_name: string
}

export interface IShippingAddress {
  country_id: string
  country_name_id: number
  district_id: string
  district_name_id: number
  ward_id: string
  ward_name_id: number
  state_id: string
  state_name_id: number
}

export interface AddressDelete {
  token: string
  adress_id: number
  partner_id: number
}

export interface ShippingAddress extends IShippingAddress {
  id: number
  full_adress: string
  name: string
  phone: string
  street: string
}

export interface Address {
  name: string
  phone: string
  street: string
  ward_id: number
  district_id: number
  state_id: number
  country_id: number
}

export interface AddressAdd {
  token: string
  adress_id?: number | false
  partner_id: number
  address_new: Address
}

export interface StateId {
  state_id: number
}

export interface DistrictId {
  district_id: number
}

export interface AddressId {
  id: number
  name: string
}

export interface AddressSlice {
  currentChooseAddress: {
    state: AddressId[]
    district: AddressId[]
    ward: WardAddress[]
  }
  addressForm: ShippingAddress
  payment: Payment
}
