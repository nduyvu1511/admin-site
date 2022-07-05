import { DistrictId, ProvinceId, WardId } from "./location"

export interface loginFormParams {
  phone: string
  password: string
}

export interface LoginRes {
  car_account_type: CarAccountType
}

export interface UserInfo {
  partner_id: number
  partner_name: string
  avatar_url: {
    image_id: number
    image_url: string
  }
  gender: GenderType
  date_of_birth: string
  car_account_type: CarAccountType
  verified_car_driver_account: DriverAccountStatus
  verified_account_date: string
  description: string
  car_information: any
  phone: string
  address: string
}

export type UserInfoFormKey =
  | "date_of_birth"
  | "description"
  | "avatar_attachment_id"
  | "name"
  | "gender"
export type VehicleKeyType = "brand" | "model" | "type" | "desc"
export type IdCardKeyType = "text" | "select" | "date" | "file"
export type DrivingLicenseKeyType = "text" | "select" | "file" | "date"
export type IdCardName =
  | "front_identity_card_image_url"
  | "back_identity_card_image_url"
  | "identity_number"
  | "date_of_issue"
  | "date_of_expiry"
  | "place_of_issue"
  | "province_id"
  | "district_id"
  | "ward_id"
  | "street"
export type NewPasswordFormKeys = "password" | "re_password" | "old_password"
export type DriverFormKey =
  | "idCard"
  | "info"
  | "license"
  | "vehicleInsuranceImages"
  | "vehicleRegistration"
  | "registrationCertificate"

export type DrivingLicenseFormKey =
  | "front_license_image_url"
  | "back_license_image_url"
  | "identity_number"
  | "license_class"
  | "date_of_issue"
  | "date_of_expiry"
export type CarAccountType = "customer" | "car_driver"
export type VehicleDetailFormKey =
  | "car_brand_id"
  | "car_id"
  | "car_name"
  | "front_car_image_url"
  | "back_car_image_url"
  | "license_plates"
  | "year_of_issue"
export type VehicleInsuranceFormKey =
  | "front_insurance_image_url"
  | "back_insurance_image_url"
  | "identity_number"
  | "date_of_issue"
  | "date_of_expiry"
export type VehicleImageKeyType = "frontImage" | "backImage"
export type CertificateInspectionFormKey =
  | "back_inspection_certificate_image_url"
  | "front_inspection_certificate_image_url"
  | "identity_number"
  | "date_of_expiry"
export type GenderType = "male" | "female"
export type DriverAccountStatus = "inactive_account" | "active_acount" | "blocked_account"
export type DrivingLicenseClassType = "b1" | "b2" | "c" | "d" | "e" | "f"

// Interfaces
export interface Auth {
  firebase_access_token?: string
  google_access_token?: string
  type?: string
  facebook_access_token?: string
  data_in_token?: any
}

export interface NewPasswordParams {
  password: string
  re_password: string
}

export interface ChangePasswordParams extends NewPasswordParams {
  old_password: string
}

export interface ResetPasswordParams {
  firebase_access_token: string
  password: string
  re_password: string
}

export interface UserEdit {
  email: string
  name: string
  gender: "male" | "female" | ""
  image?: string
}

export interface LoginForm {
  phone: string
  password: string
}

export interface ChangePasswordFormParams extends NewPasswordParams {
  old_password: string
}

export interface CreatePasswordFormParams extends NewPasswordParams {}

export interface UserInfo {
  partner_id: number
  partner_name: string
  avatar_url: {
    image_id: number
    image_url: string
  }
  gender: GenderType
  date_of_birth: string
  car_account_type: CarAccountType
  verified_car_driver_account: DriverAccountStatus
  verified_account_date: string
  description: string
  car_information: any
  phone: string
  address: string
}

export interface LoginRes {
  car_account_type: CarAccountType
}

// User form
export interface UserInfoFormParams {
  date_of_birth: string
  description?: string
  avatar_attachment_id: number
  name: string
  gender: GenderType
}

export interface CreateUserFormParams {
  date_of_birth: string
  description?: string
  car_account_type: CarAccountType
  avatar_attachment_id: number
  name: string
  gender: GenderType
}

export interface UpdateUserInfoParams extends CreateUserFormParams {
  token?: string
}

export interface RegisterParams {
  token: string
  car_account_type: CarAccountType
}

export interface IdCardParams {
  front_identity_card_image_url: number
  back_identity_card_image_url: number
  identity_number: string
  date_of_issue: string
  date_of_expiry: string
  place_of_issue: string
  country_id: number
  province_id: number
  district_id: number
  ward_id: number
  street: string
}

export interface IdCardUpdateParams extends IdCardParams {
  identity_card_id: number
}

export interface DrivingLicenseParams {
  front_license_image_url: number
  back_license_image_url: number
  identity_number: string
  license_class: string
  date_of_issue: string
  date_of_expiry: string
}

export interface UpdateDrivingLicenseParams extends DrivingLicenseParams {
  car_driving_license_id: number
}

export interface VehicleDetailFormParams {
  car_brand_id: number
  car_id: number
  car_name: string
  year_of_issue: string
  license_plates: string
  front_car_image_url: number
  back_car_image_url: number
}

export interface RegistrationCertificateRes {
  car_registration_certificate_id: number
  car: { car_id: number; name: string; car_type: string }
  car_name: string
  year_of_issue: string
  license_plates: string
  front_car_image: { id: number; url: string }
  back_car_image: {
    id: number
    url: string
  }
  car_brand: {
    brand_id: number
    brand_name: string
    brand_icon: { icon_id: number; icon_url: string }
  }
}

export interface UpdateVehicleDetailFormParams extends VehicleDetailFormParams {
  car_registration_certificate_id: number
}

export interface VehicleInsuranceParams {
  front_insurance_image_url: number
  back_insurance_image_url: number
  identity_number: string
  date_of_issue: string
  date_of_expiry: string
}

export interface VehicleInsuranceRes {
  compulsory_car_insurance_id: number
  partner: number
  front_insurance_image_url: {
    id: number
    url: string
  }
  back_insurance_image_url: {
    id: number
    url: string
  }
  identity_number: string
  date_of_issue: string
  date_of_expiry: string
}

export interface UpdateVehicleInsuranceParams extends VehicleInsuranceParams {
  compulsory_car_insurance_id: number
}

export interface CertificateInspectionParams {
  front_inspection_certificate_image_url: number
  back_inspection_certificate_image_url: number
  identity_number: string
  date_of_expiry: string
}

export interface CertificateInspectionRes {
  periodical_inspection_certificate_id: number
  front_inspection_certificate_image: {
    id: number
    url: string
  }
  back_inspection_certificate_image: {
    id: number
    url: string
  }
  identity_number: string
  date_of_expiry: string
}

export interface UpdateCertificateInspectionParams extends CertificateInspectionParams {
  periodical_inspection_certificate_id: number
}

export interface AttachmentItem {
  attachment_id: number
  attachment_url: string
}

export interface DriverLicenseForm {
  frontCard: string
  backCard: string
  driversLicenseNumber: string
  driversLicenseClass: string
}

export interface CreateNewPasswordParams extends NewPasswordParams {}

export interface UserInfoParams {
  car_account_type: CarAccountType | false
  name: string
  date_of_birth: string
  gender: GenderType
  description: string
  avatar_attachment_id: number
}

export interface AttachmentChildParams {
  file: string
  type: "image" | "video"
}

export interface AttachmentParams {
  attachments: AttachmentChildParams[]
}

export interface DrivingLicenseFormParams {
  front_license_image_url: number
  back_license_image_url: number
  identity_number: string
  license_class: string
  date_of_issue: string
  date_of_expiry: string
}

export interface DrivingLicenseRes {
  car_driving_license_id: number
  partner: UserInfo
  front_license_image_url: {
    id: number
    url: string
  }
  back_license_image_url: {
    id: number
    url: string
  }
  identity_number: string
  date_of_issue: string
  date_of_expiry: string
  license_class: string
}

export interface IdentityCardRes {
  identity_card_id: number
  partner: UserInfo
  front_identity_card_image_url: {
    id: number
    url: string
  }
  back_identity_card_image_url: {
    id: number
    url: string
  }
  identity_number: string
  date_of_issue: string
  date_of_expiry: string
  place_of_issue: string
  country_id: {
    country_id: number
    country_name: string
    country_vietnamese_name: string
  }
  province_id: ProvinceId
  district_id: DistrictId
  ward_id: WardId
  street: string
}

export type FilledDataFieldsKey =
  | "user_information"
  | "identity_card"
  | "car_driving_license"
  | "car_registration_certificate"
  | "periodical_inspection_certificate"
  | "compulsory_car_insurance"

export interface FilledDataFieldsRes {
  user_information: boolean
  identity_card: boolean
  car_driving_license: boolean
  car_registration_certificate: boolean
  periodical_inspection_certificate: boolean
  compulsory_car_insurance: boolean
}

export interface CarDriverId {
  partner_name: string
  avatar_url: string
  car_account_type: CarAccountType
  gender: string
  date_of_birth: string
  description: string
  car_information: any[]
}
