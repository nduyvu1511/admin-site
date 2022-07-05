import {
  AttachmentParams,
  Auth,
  CertificateInspectionParams,
  ChangePasswordParams,
  CreateNewPasswordParams,
  CreateUserFormParams,
  DrivingLicenseParams,
  IdCardParams,
  IdCardUpdateParams,
  loginFormParams,
  ResetPasswordParams,
  UpdateCertificateInspectionParams,
  UpdateDrivingLicenseParams,
  UpdateUserInfoParams,
  UpdateVehicleInsuranceParams,
  VehicleDetailFormParams,
  VehicleInsuranceParams,
} from "@/models"
import axiosClient from "."

const userApi = {
  login: (data: loginFormParams) => {
    return axiosClient.post("/api/user_information_controller/login", {
      params: data,
    })
  },

  logout: () => {
    return axiosClient.post("/api/logout", {})
  },

  checkHasPassword: () => {
    return axiosClient.post("/api/user_information_controller/check_has_password", {})
  },

  createNewPassword: (params: CreateNewPasswordParams) => {
    return axiosClient.post("user_information_controller/create_new_password", {
      params,
    })
  },

  changePassword: (data: ChangePasswordParams) => {
    return axiosClient.post("/api/user_information_controller/change-password", {
      params: data,
    })
  },

  resetPassword: (data: ResetPasswordParams) => {
    return axiosClient.post("/api/user_information_controller/reset-password", {
      params: data,
    })
  },

  confirmDriverRole: (data: ResetPasswordParams) => {
    return axiosClient.post("/api/user_information_controller/update_user_information", {
      params: data,
    })
  },

  checkPhoneExist: (phone: string) => {
    return axiosClient.post("/api/user_information_controller/check_user_account", {
      params: {
        phone,
      },
    })
  },

  firebaseAuth: (params: Auth) => {
    return axiosClient.post("/api/firebase_auth", {
      params,
    })
  },

  getTokenFromFirebase: (params: Auth) => {
    return axiosClient.post("/api/user_information_controller/auth", {
      params,
    })
  },

  updateUserInfo: (params: UpdateUserInfoParams) => {
    return axiosClient.post("/api/user_information_controller/update_user_information", { params })
  },

  setToken: (token: string) => {
    return axiosClient.post("/api/set_token", { params: { token } })
  },

  createUserInfo: (params: CreateUserFormParams) => {
    return axiosClient.post("/api/user_information_controller/create_user_information", { params })
  },

  createAttachmentCommon: (params: AttachmentParams) => {
    return axiosClient.post("/api/user_information_controller/create_attachment_data", {
      params,
    })
  },

  createAttachmentAvatar: (params: AttachmentParams) => {
    return axiosClient.post("api/detail_data_controller/create_attachment_data", {
      params,
    })
  },

  getUserInfo: () => {
    return axiosClient.post("/api/user_information_controller/get_user_information", {
      params: {},
    })
  },

  createIdentityCard: (params: IdCardParams) => {
    return axiosClient.post("/api/user_information_controller/create_identity_card", {
      params,
    })
  },

  updateIdentityCard: (params: IdCardUpdateParams) => {
    return axiosClient.post("/api/user_information_controller/update_identity_card", {
      params,
    })
  },

  getIdentityCard: () => {
    return axiosClient.post("/api/user_information_controller/get_identity_card", {
      params: {},
    })
  },

  createDrivingLicense: (params: DrivingLicenseParams) => {
    return axiosClient.post("/api/user_information_controller/create_car_driving_license", {
      params,
    })
  },

  updateDrivingLicense: (params: UpdateDrivingLicenseParams) => {
    return axiosClient.post("/api/user_information_controller/update_car_driving_license", {
      params,
    })
  },

  getDrivingLicense: () => {
    return axiosClient.post("/api/user_information_controller/get_car_driving_license", {
      params: {},
    })
  },

  createCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/api/user_information_controller/create_car_registration_certificate",
      {
        params,
      }
    )
  },

  updateCertificateRegistrationVehicle: (params: VehicleDetailFormParams) => {
    return axiosClient.post(
      "/api/user_information_controller/update_car_registration_certificate",
      {
        params,
      }
    )
  },

  getCertificateRegistrationVehicle: () => {
    return axiosClient.post("/api/user_information_controller/get_car_registration_certificate", {
      params: {},
    })
  },

  createVehicleInsurance: (params: VehicleInsuranceParams) => {
    return axiosClient.post("/api/user_information_controller/create_compulsory_car_insurance", {
      params,
    })
  },

  updateVehicleInsurance: (params: UpdateVehicleInsuranceParams) => {
    return axiosClient.post("/api/user_information_controller/update_compulsory_car_insurance", {
      params,
    })
  },

  getVehicleInsurance: () => {
    return axiosClient.post("/api/user_information_controller/get_compulsory_car_insurance", {
      params: {},
    })
  },

  createCertificateInspection: (params: CertificateInspectionParams) => {
    return axiosClient.post(
      "/api/user_information_controller/create_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  updateCertificateInspection: (params: UpdateCertificateInspectionParams) => {
    return axiosClient.post(
      "/api/user_information_controller/update_periodical_inspection_certificate",
      {
        params,
      }
    )
  },

  getCertificateInspection: () => {
    return axiosClient.post(
      "/api/user_information_controller/get_periodical_inspection_certificate",
      {
        params: {},
      }
    )
  },

  getFilledDataFields: () => {
    return axiosClient.post("/api/user_information_controller/get_general_user_information", {
      params: {},
    })
  },
}

export { userApi }
