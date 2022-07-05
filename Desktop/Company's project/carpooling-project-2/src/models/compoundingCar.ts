import { OptionModel } from "./common"
import { FromLocation, ProvinceId, StationId, StationParams } from "./location"
import { CarDriverId, GenderType } from "./user"

export type HourWaitTimeType =
  | "01_hour"
  | "02_hour"
  | "03_hour"
  | "04_hour"
  | "05_hour"
  | "06_hour"
  | "07_hour"
  | "08_hour"
  | "09_hour"
  | "10_hour"
  | "11_hour"
  | "12_hour"
export type QualityCarType = "5_star" | "4_star" | "3_star"
export type CompoundingType = "one_way" | "two_way" | "compounding"
export type CompoundingCarDriverState =
  | "draft"
  | "waiting"
  | "waiting_deposit"
  | "confirm_deposit"
  | "confirm"
  | "start_running"
  | "stop_picking"
  | "done"
  | "cancel"

export type CompoundingCarCustomerState =
  | "draft"
  | "confirm"
  | "deposit"
  | "waiting"
  | "assign"
  | "in_process"
  | "done"
  | "customer_pay"
  | "confirm_paid"
  | "cancel"

export interface VehicleTypeParams {
  car_id: number
  name: string
  number_seat: number
}

export interface CarId extends VehicleTypeParams {}

export interface VehicleBrandRes {
  icon: {
    icon_id: number
    icon_url: string
  }
  brand_id: number
  brand_name: string
}

export interface ActivityCarId extends CarId {
  icon: {
    icon_id: string
    icon_url: string
  }
}

export interface GetPriceUnitParams {
  from_province_id: number
  to_province_id: number
  car_id: number
  quality_car?: QualityCarType
}

export interface CarIdType {
  label: string
  value: number
  number_seat: number
}

export interface CreateCommonCompoundingForm {
  from_location: FromLocation
  to_location: FromLocation
  car_id: OptionModel
  note?: string
  expected_going_on_date: string
  distance: number
  is_checked_policy: boolean
}

export interface CreateOneWayCompoundingCarForm extends CreateCommonCompoundingForm {
  price?: number
}

export interface CreateCommonCompoundingForm {
  from_location: FromLocation
  to_location: FromLocation
  car_id: OptionModel
  note?: string
  expected_going_on_date: string
  distance: number
  is_checked_policy: boolean
  price?: number
}

export interface CompoundingCarRes {
  compounding_car_id: number
  compounding_car_code: string
  compounding_car_name: string
  car_driver_id: CarDriverId
  compounding_type: CompoundingType
  from_province: ProvinceId
  to_province: ProvinceId
  expected_going_on_date: string
  expected_picking_up_date: string
  car: ActivityCarId
  quality_car: VehicleTypeParams
  number_seat_in_car: number
  number_available_seat: number
  state: CompoundingCarDriverState
  price_unit: {
    name: string
    price_unit: number
  }
  note: string
  second_remains: number
  from_pick_up_station: StationParams
  from_address: string
  from_longitude: string
  from_latitude: string
  to_pick_up_station: StationParams
  to_address: string
  to_longitude: string
  to_latitude: string
  distance: number
}

export interface CompoundingCarDriverRes extends CompoundingCarRes {
  compounding_car_customers: CompoundingCarCustomer[]
}

export interface CompoundingCarCustomer {
  compounding_car_id: number
  compounding_car_customer_id: number
  from_province: ProvinceId
  from_pick_up_station: StationParams
  is_picking_up_from_start: boolean
  from_address: string
  from_longitude: string
  from_latitude: string
  to_province: ProvinceId
  to_pick_up_station: StationParams
  is_taking_to_final_destination: false
  to_address: string
  to_longitude: string
  to_latitude: string
  partner: PartnerCompoundingCar
  number_seat: number
  fee_final_destination: number
  promotion: string
  sale_order_id: SaleOrderCompoundingCar
  amount_total: number
  down_payment: number
  payment_method: "cash" | "transfer" | false
  amount_due: number
  state: CompoundingCarCustomerState
  compounding_type: CompoundingType
  expected_going_on_date: string
  expected_picking_up_date: string
  car: CarId
  car_driver_id: CarDriverId
  distance: number
  note: string
  hour_of_wait_time: HourWaitTimeType
  is_a_day_tour: boolean
  second_remains: number
  number_available_seat: number
}

export interface PartnerCompoundingCar {
  partner_id: number
  partner_name: string
  avatar_url: {
    image_id: number
    image_url: string
  }
  car_account_type: boolean
  gender: GenderType
  date_of_birth: string
  description: string
}

export interface OrderLineProductCompounding {
  product_id: number
  product_name: string
  representation_image: { image_id: string; image_url: string }
  image_urls: string[]
}

export interface SaleOrderCompoundingCar {
  sale_id: number
  sale_name: string
  partner: PartnerCompoundingCar
  order_line: CompoundingOrderLine[]
  amount_total: number
}

export interface CompoundingOrderLine {
  line_id: number
  line_name: string
  line_product: OrderLineProductCompounding
  line_product_uom: {
    uom_id: number
    uom_name: string
  }
  line_product_qty: number
}

export interface CreateCommonCompounding {
  compounding_type: CompoundingType
  from_province_id: number
  to_province_id: number
  car_id: number
  note?: string
  from_address: string
  to_address: string
  from_longitude: string
  from_latitude: string
  to_latitude: string
  to_longitude: string
  expected_going_on_date: string
  distance: number
}

export interface CreateOneWayCompoundingCar extends CreateCommonCompounding {}

export interface FormModeType {
  mode: "update" | "create"
}

export interface CreateTwoWayCompoundingCarForm extends CreateCommonCompoundingForm {
  is_a_day_tour: boolean
  hour_of_wait_time?: OptionModel
  expected_picking_up_date?: string
  price?: number
}

export interface CreateTwoWayCompoundingCar extends CreateCommonCompounding {
  is_a_day_tour: boolean
  hour_of_wait_time?: HourWaitTimeType | false
  expected_picking_up_date?: string | false
}

export interface CreateCarpoolingCompoundingCar extends CreateCommonCompounding {
  from_pick_up_station_id: number
  to_pick_up_station_id: number
  number_seat: number
  is_picking_up_from_start: boolean
  price_per_passenger?: number
  compounding_car_id?: number
}

export interface CreateCarpoolingCompoundingForm {
  car_id: OptionModel & { number_seat: number }
  price_per_passenger?: number
  number_seat: OptionModel
  from_station: StationId
  to_station: StationId
  from_location?: FromLocation
  note?: string
  expected_going_on_date: string
  distance: number
  is_checked_policy: boolean
}

export type CreateCompoundingParams =
  | CreateCarpoolingCompoundingCar
  | CreateTwoWayCompoundingCar
  | CreateOneWayCompoundingCar

export interface ConfirmCompoundingCar {
  compounding_car_customer_id: number
}

export interface ConfirmTransactionParams {
  sale_order_id: number
}

export interface CreateCompoundingCarDriver {
  compounding_type: CompoundingType
  from_province_id: number
  to_province_id: number
  expected_going_on_date: string
  car_id: number
  note?: string
  from_longitude: string
  from_latitude: string
  to_longitude: string
  to_latitude: string
}

export interface UpdateOneWayCompoundingCar extends CreateOneWayCompoundingCar {
  compounding_car_customer_id: number
}

export interface UpdateTwoWayCompoundingCar extends CreateTwoWayCompoundingCar {
  compounding_car_customer_id: number
}

export interface UpdateCarpoolingCompoundingCar extends CreateCarpoolingCompoundingCar {
  compounding_car_customer_id: number
}

export type UpdateCompoundingCar = (
  | UpdateOneWayCompoundingCar
  | UpdateTwoWayCompoundingCar
  | UpdateCarpoolingCompoundingCar
) & { compounding_car_customer_id: number }

export interface CreatePaymentDriverParams {
  acquirer_id: number
  compounding_car_id: number
  returned_url: string
  payment_id: number
}

export interface DriverConfirmCompoundingCarCustomerParams {
  compounding_car_customer_id: number
  customer_id: number
}

export interface GetCompoundingCarCustomerList {
  from_province_id?: number
  to_province_id?: number
  car_id?: number
  number_seat?: number
  from_expected_going_on_date?: string
  to_expected_going_on_date?: string
  sort_by_lowest_price?: boolean
  sort_by_highest_price?: boolean
  sort_by_distance?: boolean
  current_latitude?: string
  current_longitude?: string
  limit?: number
  offset?: number
}

export interface GetCompoundingCarCustomerStateParams {
  compounding_car_state?: CompoundingCarCustomerState[]
  limit?: number
  offset?: number
}

export interface GetCompoundingCarDriverStateParams {
  compounding_car_state?: CompoundingCarDriverState[]
  limit?: number
  offset?: number
}

export interface CompoundingListDriverParams {
  from_province_id?: number
  to_province_id?: number
  car_id?: number
  from_expected_going_on_date?: string
  to_expected_going_on_date?: string
  compounding_type?: CompoundingType
  sort_by_lowest_price?: boolean
  sort_by_highest_price?: boolean
  sort_by_distance?: boolean
  limit?: number
  offset?: number
  current_latitude?: string
  current_longitude?: string
}

export interface CreatePaymentParams {
  acquirer_id: number
  compounding_car_customer_id: number
  returned_url: string
}

export interface CreatePaymentMethodParams {
  compounding_car_customer_id: number
  payment_method: "cash" | "transfer"
}

export interface GetDetailCompoundingCustomer {
  compounding_car_customer_id: number
}

export interface GetDetailCompounding {
  compounding_car_customer_id: number
}

export interface GetDriverSchedulesParams {
  offset?: number
  limit?: number
}

export interface RidesDraftParams {
  limit?: number
  offset?: number
}

export interface UpdateCompoundingCarCustomer {
  compounding_car_customer_id: number
}

export interface UpdateCompoundingCarDriver extends CreateCompoundingCarDriver {
  compounding_car_id: number
}
