import { DATE_REGEX, DATE_SCHEMA, PASSWORD_SCHEMA, PHONE_SCHEMA, YEAR_SCHEMA } from "@/helper"
import * as Yup from "yup"

export const phoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
})

export const ratingFormSchema = Yup.object().shape({
  desc: Yup.string().required("Vui lòng nhập trường này"),
  star: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "Vui lòng nhập số từ 1 đến 5")
    .required("Vui lòng nhập số sao"),
})

export const createPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận phải trùng với mật khẩu mới")
    .required("Vui lòng nhập xác nhận mật khẩu"),
})

export const certificateRegistrationSchema = Yup.object().shape({
  front_identity_card_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_identity_card_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  car_brand_id: Yup.string().required("Vui lòng nhập thương hiệu xe"),
  car_id: Yup.string().required("Vui lòng nhập loại xe"),
  car_name: Yup.string().required("Vui lòng nhập tên xe"),
  year_of_issue: Yup.string()
    .matches(YEAR_SCHEMA, "Vui lòng nhập năm hợp lệ")
    .required("Vui lòng nhập năm sản xuất"),
  license_plates: Yup.string().required("Vui lòng nhập biển số xe"),
})

export const inspectionCertificateSchema = Yup.object().shape({
  front_inspection_certificate_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_inspection_certificate_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  identity_number: Yup.string().required("Vui lòng nhập số đăng kiểm"),
  date_of_expiry: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập ngày hợp lệ")
    .required("Vui lòng nhập ngày hết hạn"),
})

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận phải trùng với mật khẩu mới")
    .required("Vui lòng nhập mật khẩu xác nhận"),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().matches(
    PASSWORD_SCHEMA,
    "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt"
  ),
})

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
})

export const userFormSchema = Yup.object().shape({
  avatar_attachment_id: Yup.string().required("Vui lòng chọn ảnh đại diện"),
  date_of_birth: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập ngày sinh hợp lệ")
    .required("Vui lòng nhập ngày sinh"),
  name: Yup.string().required("Vui lòng nhập tên"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Vui lòng chọn giới tính")
    .required("Vui lòng chọn giới tính"),
  description: Yup.string(),
})

export const identityCardSchema = Yup.object().shape({
  front_identity_card_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_identity_card_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  identity_number: Yup.string()
    .min(8, "Phải có ít nhất 8 đến 12 ký tự")
    .max(13, "Phải có ít nhất 8 đến 12 ký tự")
    .required("Vui lòng nhập trường này"),
  date_of_issue: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập ngày hợp lệ")
    .required("Vui lòng nhập ngày cấp"),
  date_of_expiry: Yup.string().matches(DATE_SCHEMA, "Vui lòng nhập ngày hợp lệ"),
  place_of_issue: Yup.string().required("Vui lòng nhập địa chỉ"),
  province_id: Yup.string().required("Vui lòng nhập Tỉnh/Thành Phố"),
  district_id: Yup.string().required("Vui lòng nhập Quận/Huyện"),
  ward_id: Yup.string().required("Vui lòng nhập Phường/Xã"),
  street: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
})

export const insuranceShema = Yup.object().shape({
  front_insurance_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_insurance_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  identity_number: Yup.string()
    .min(8, "Phải có ít nhất 8 đến 12 ký tự")
    .max(13, "Phải có ít nhất 8 đến 12 ký tự")
    .required("Vui lòng nhập số đăng ký bảo hiểm"),
  date_of_issue: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập ngày hợp lệ")
    .required("Vui lòng nhập đăng ký"),
  date_of_expiry: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập ngày hợp lệ")
    .required("Vui lòng nhập ngày hết hạn"),
})

export const drivingLicenseSchema = Yup.object().shape({
  front_license_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_license_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  identity_number: Yup.string()
    .min(8, "Vui lòng nhập đúng số bằng lái xe")
    .max(13, "Vui lòng nhập đúng số bằng lái xe")
    .required("Vui lòng nhập số bằng lái"),
  license_class: Yup.string()
    .oneOf(["b1", "b2", "c", "d", "e", "f"], "Vui lòng chọn loại bằng lái hợp lệ")
    .required("Vui lòng nhập hạng bằng lái"),
  date_of_issue: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng chọn ngày hợp lệ")
    .required("Vui lòng nhập ngày cấp"),
  date_of_expiry: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng chọn ngày hợp lệ")
    .required("Vui lòng nhập ngày hết hạn"),
})

export const vehicleDetailSchema = Yup.object().shape({
  car_brand_id: Yup.string().required("Vui lòng nhập hãng xe"),
  car_id: Yup.string().required("Vui lòng nhập loại xe"),
  car_name: Yup.string().required("Vui lòng nhập tên xe"),
  front_car_image_url: Yup.string().required("Vui lòng chọn ảnh mặt trước"),
  back_car_image_url: Yup.string().required("Vui lòng chọn ảnh mặt sau"),
  license_plates: Yup.string().required("Vui lòng nhập biển số xe"),
  year_of_issue: Yup.string()
    .matches(YEAR_SCHEMA, "Vui lòng nhập năm hợp lệ")
    .required("Vui lòng nhập năm sản xuất xe"),
})

export const departureFormSchema = Yup.object().shape({
  date: Yup.string()
    .matches(DATE_SCHEMA, "Vui lòng nhập đúng định dạng ngày")
    .required("Vui lòng nhập ngày đi"),
  time: Yup.string().required("Vui lòng nhập giờ đi"),
  quality: Yup.string().required("Vui lòng chọn chất lượng xe"),
  numberOfSeats: Yup.string().required("Vui lòng chọn chất lượng xe"),
  vehicleType: Yup.string().required("Vui lòng chọn loại xe"),
  waitingTime: Yup.string().required("Vui lòng chọn thời gian chờ xe"),
})

export const createCompoundingCarSchema = Yup.object().shape({
  compounding_type: Yup.string()
    .oneOf(["one_way", "two_way", "compounding"], "Vui lòng nhập đúng định dạng loại chuyến đi")
    .required("Vuilòng chọn loại chuyến đi"),

  from_province_id: Yup.string().required("Vui lòng nhập tỉnh đi"),
  from_pick_up_station_id: Yup.string().required("Vui lòng nhập điểm đi"),
  to_pick_up_station_id: Yup.string().required("Vui lòng nhập điểm đến"),
  to_province_id: Yup.string().required("Vui lòng nhập tỉnh đến"),
  expected_going_on_date: Yup.string()
    .typeError("Vui lòng đúng định dạng ngày đi")
    .matches(DATE_REGEX, "Vui lòng nhập đúng định dạng giờ")
    .required("Vui lòng nhập ngày đi"),
  quality_car: Yup.string().oneOf(["5_star", "4_star", "3_star"]),
  car_id: Yup.number()
    .typeError("Vui lòng nhập định dạng số cho id của loại xe")
    .required("Vui lòng nhập loại xe"),
  expected_picking_up_date: Yup.string().required("Vui lòng nhập ngày về"),
  number_seat: Yup.number()
    .typeError("Vui lòng nhập định dạng số")
    .required("Vui lòng nhập số chỗ ngồi"),
  is_a_day_tour: Yup.boolean().nullable(),
  hour_of_wait_time: Yup.string().required("Vui lòng chọn số giờ"),
  check_policy: Yup.boolean().required("Vui lòng chấp nhận điều khoản trước khi tiếp tục"),
  description: Yup.string(),
})

export const oneWayCompoundingCarSchema = Yup.object().shape({
  expected_going_on_date: Yup.string()
    .typeError("Vui lòng đúng định dạng ngày đi")
    .matches(DATE_REGEX, "Vui lòng nhập đúng định dạng giờ")
    .required("Vui lòng nhập ngày đi"),
  quality_car: Yup.string().oneOf(["5_star", "4_star", "3_star"]).nullable(),
  from_location: Yup.object()
    .shape({
      lng: Yup.string().required(),
      lat: Yup.string().required(),
      address: Yup.string().required(),
      province_id: Yup.number().required(),
    })
    .required("Vui lòng nhập nơi đi"),
  to_location: Yup.object()
    .shape({
      lng: Yup.string().required(),
      lat: Yup.string().required(),
      address: Yup.string().required(),
      province_id: Yup.number().required(),
    })
    .required("Vui lòng nhập nơi đi"),
  car_id: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.number().required(),
    })
    .required("Vui lòng nhập loại xe"),
  is_checked_policy: Yup.boolean().required("Vui lòng chấp nhận điều khoản trước khi tiếp tục"),
  note: Yup.string().nullable(),
  distance: Yup.number().typeError("Vui lòng nhập khoảng cách").required(),
  price: Yup.number(),
})

export const twoWayCompoundingCarSchema = Yup.object().shape({
  expected_going_on_date: Yup.string()
    .typeError("Vui lòng đúng định dạng ngày đi")
    .matches(DATE_REGEX, "Vui lòng nhập đúng định dạng giờ")
    .required("Vui lòng nhập ngày đi"),
  quality_car: Yup.string().oneOf(["5_star", "4_star", "3_star"]).nullable(),
  from_location: Yup.object()
    .shape({
      lng: Yup.string().required(),
      lat: Yup.string().required(),
      address: Yup.string().required(),
      province_id: Yup.number().required(),
    })
    .required("Vui lòng nhập nơi đi"),
  to_location: Yup.object()
    .shape({
      lng: Yup.string().required(),
      lat: Yup.string().required(),
      address: Yup.string().required(),
      province_id: Yup.number().required(),
    })
    .required("Vui lòng nhập nơi đi"),
  car_id: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.number().required(),
    })
    .required("Vui lòng nhập loại xe"),
  is_checked_policy: Yup.boolean().required("Vui lòng chấp nhận điều khoản trước khi tiếp tục"),
  note: Yup.string().nullable(),
  distance: Yup.number().typeError("Vui lòng nhập khoảng cách").required(),
  is_a_day_tour: Yup.boolean().required(),
  hour_of_wait_time: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required(),
  expected_picking_up_date: Yup.string().required(),
  price: Yup.number(),
})

export const carpoolingCompoundingCarSchema = Yup.object().shape({
  from_station: Yup.object()
    .shape({
      station_name: Yup.string().required(),
      station_id: Yup.number().required(),
      province_id: Yup.number().required(),
      address: Yup.string().required(),
      lat: Yup.string().required(),
      lng: Yup.string().required(),
      province_name: Yup.string(),
    })
    .required("Vui lòng nhập trường này"),
  to_station: Yup.object()
    .shape({
      station_name: Yup.string().required(),
      station_id: Yup.number().required(),
      province_id: Yup.number().required(),
      address: Yup.string().required(),
      lat: Yup.string().required(),
      lng: Yup.string().required(),
      province_name: Yup.string(),
    })
    .required("Vui lòng nhập trường này"),
  from_location: Yup.object()
    .shape({
      lng: Yup.string(),
      lat: Yup.string(),
      address: Yup.string(),
      province_id: Yup.number(),
    })
    .nullable(),
  expected_going_on_date: Yup.string()
    .typeError("Vui lòng đúng định dạng ngày đi")
    .matches(DATE_REGEX, "Vui lòng nhập đúng định dạng giờ")
    .required("Vui lòng nhập ngày đi"),
  quality_car: Yup.string().oneOf(["5_star", "4_star", "3_star"]).nullable(),
  car_id: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.number().required(),
    })
    .required("Vui lòng nhập loại xe"),
  is_checked_policy: Yup.boolean().required("Vui lòng chấp nhận điều khoản trước khi tiếp tục"),
  note: Yup.string().nullable(),
  distance: Yup.number().typeError("Vui lòng nhập khoảng cách").required(),
  number_seat: Yup.object()
    .shape({
      value: Yup.number().required(),
      label: Yup.string().required(),
    })
    .required("Vui lòng nhập trường này"),
  // is_picking_up_from_start: Yup.boolean().nullable(),
  price_per_passenger: Yup.number().nullable(),
})
