import {
  ConfirmCompoundingCar,
  ConfirmTransactionParams,
  CreateCarpoolingCompoundingCar,
  CreateCompoundingCarDriver,
  CreateCompoundingParams,
  CreatePaymentDriverParams,
  CreatePaymentMethodParams,
  CreatePaymentParams,
  DriverConfirmCompoundingCarCustomerParams,
  GetCompoundingCarCustomerList,
  GetCompoundingCarCustomerStateParams,
  GetCompoundingCarDriverStateParams,
  CompoundingListDriverParams,
  GetDetailCompounding,
  GetDetailCompoundingCustomer,
  GetDriverSchedulesParams,
  RidesDraftParams,
  UpdateCompoundingCar,
  UpdateCompoundingCarCustomer,
  UpdateCompoundingCarDriver,
} from "@/models"
import axiosClient from "."

const ridesApi = {
  getCompoundingCarListForCustomer: (params: GetCompoundingCarCustomerList) => {
    return axiosClient.post("/compounding_car_controller/get_compounding_car_by_compounding", {
      params,
    })
  },

  getCompoundingCarListForDriver: (params: CompoundingListDriverParams) => {
    return axiosClient.post("/compounding_car_controller/get_compounding_car_by_no_driver", {
      params,
    })
  },

  createCompoundingCar: (params: CreateCompoundingParams & { token: string }) => {
    return axiosClient.post("/compounding_car_controller/create_compounding_car", {
      params,
    })
  },

  createCompoundingCarCustomer: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post("/compounding_car_controller/create_compounding_car_customer", {
      params,
    })
  },

  confirmCreateCompoundingCar: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post("/compounding_car_controller/confirm_compounding_car", {
      params,
    })
  },

  confirmCarpoolingCompoundingCarCustomer: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post("/compounding_car_controller/confirm_compounding_car_customer", {
      params,
    })
  },

  getDetailCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_controller/get_detail_compounding_car", {
      params,
    })
  },

  getDetailCompoundingCarCustomer: (params: UpdateCompoundingCarCustomer) => {
    return axiosClient.post("/compounding_car_controller/get_detail_compounding_car_customer", {
      params,
    })
  },

  createExistedCarpoolingCompoundingCar: (params: CreateCarpoolingCompoundingCar) => {
    return axiosClient.post("/compounding_car_controller/create_compounding_car_customer", {
      params,
    })
  },

  getPendingCompoundingCar: (params: RidesDraftParams) => {
    return axiosClient.post("/compounding_car_controller/get_pending_compounding_car", {
      params,
    })
  },

  confirmCompoundingCar: (params: ConfirmCompoundingCar) => {
    return axiosClient.post("/compounding_car_controller/confirm_compounding_car", {
      params,
    })
  },

  updateCompoundingCar: (params: UpdateCompoundingCar) => {
    return axiosClient.post("/compounding_car_controller/update_compounding_car", {
      params,
    })
  },

  getHistoryCompoundingCarCustomer: (params: GetCompoundingCarCustomerStateParams) => {
    return axiosClient.post("/compounding_car_controller/get_history_compounding_car_customer", {
      params,
    })
  },

  getHistoryCompoundingCarDrive: (params: GetCompoundingCarDriverStateParams) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/get_history_compounding_car_driver",
      {
        params,
      }
    )
  },

  confirmDepositCompoundingCarCustomer: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post("/compounding_car_controller/deposit_compounding_car_customer", {
      params,
    })
  },

  customerConfirmPayFullCompoundingCar: (params: GetDetailCompoundingCustomer) => {
    return axiosClient.post("/compounding_car_controller/confirm_payment_compounding_car", {
      params,
    })
  },

  getPaymentMethods: (token: string) => {
    return axiosClient.post("/payment_controller/get_payment_method_in_app", {
      params: {
        token,
      },
    })
  },

  createPayment: (params: CreatePaymentParams) => {
    return axiosClient.post("/vpnay_for_compounding_car_app_controller/create_payment", {
      params,
    })
  },

  confirmTransaction: (params: ConfirmTransactionParams) => {
    return axiosClient.post("/payment/vnpay/confirm_transaction", {
      params,
    })
  },

  getDepositCompoundingCarDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_controller/get_deposit_compounding_car_driver", {
      params,
    })
  },

  createPaymentForDriver: (params: CreatePaymentDriverParams) => {
    return axiosClient.post(
      "/vpnay_for_compounding_car_app_controller/create_payment_for_car_driver",
      {
        params,
      }
    )
  },

  confirmDepositForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_controller/confirm_deposit_compounding_car_driver", {
      params,
    })
  },

  cancelDepositForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_controller/cancel_deposit_compounding_car_driver", {
      params,
    })
  },

  getPendingDepositCompoundingList: (token: string) => {
    return axiosClient.post(
      "/compounding_car_controller/get_pending_deposit_compounding_car_driver",
      {
        params: {
          token,
        },
      }
    )
  },

  createCompoundingCarForDriver: (params: CreateCompoundingCarDriver) => {
    return axiosClient.post("/compounding_car_for_driver_controller/create_compounding_car", {
      params,
    })
  },

  confirmCompoundingCarForDriver: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_for_driver_controller/confirm_compounding_car", {
      params,
    })
  },

  updateCompoundingCarForDriver: (params: UpdateCompoundingCarDriver) => {
    return axiosClient.post("/compounding_car_for_driver_controller/update_compounding_car", {
      params,
    })
  },

  startRunningCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/start_running_compounding_car",
      {
        params,
      }
    )
  },

  confirmDoneCompoundingCar: (params: GetDetailCompounding) => {
    return axiosClient.post("/compounding_car_for_driver_controller/confirm_done_compounding_car", {
      params,
    })
  },

  getDriverSchedules: (params: GetDriverSchedulesParams) => {
    return axiosClient.post(
      "/compounding_car_for_driver_controller/get_plan_compounding_car_driver",
      {
        params,
      }
    )
  },

  customerPayForRemainingAmount: (params: CreatePaymentMethodParams) => {
    return axiosClient.post("/compounding_car_controller/payment_compounding_car_customer", {
      params,
    })
  },

  driverConfirmCustomerPayFullForCompoundingCar: (params: ConfirmCompoundingCar) => {
    return axiosClient.post(
      "/compounding_car_controller/confirm_cash_payment_compounding_car_customer",
      {
        params,
      }
    )
  },

  driverConfirmCompoundingCarCustomer: (params: DriverConfirmCompoundingCarCustomerParams) => {
    return axiosClient.post("/compounding_car_controller/confirm_done_compounding_car_customer", {
      params,
    })
  },
}

export { ridesApi }
