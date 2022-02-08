import * as Yup from 'yup';

export const UserAddressSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    )
    .required('Vui lòng nhập số điện thoại'),
  name: Yup.string()
    .min(2, 'Tên không hợp lệ')
    .required('Vui lòng nhập Họ Tên'),
  street: Yup.string()
    .min(5, 'Địa chỉ không hợp lệ')
    .required('Vui lòng nhập địa chỉ cụ thể'),
});

export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    )
    .required('Vui lòng nhập số điện thoại'),
});

export const OTPSchema = Yup.object().shape({
  OTPInput: Yup.string()
    .length(6, 'OTP không hợp lệ!')
    .required('Vui lòng mã OTP!'),
});

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    )
    .required('Vui lòng nhập số điện thoại'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt'
    )
    .required('Vui lòng nhập mật khẩu'),
});

export const userInfoSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    )
    .required('Vui lòng nhập số điện thoại'),
  email: Yup.string().matches(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    'Vui lòng nhập đúng định dạng email'
  ),
  name: Yup.string()
    .min(5, 'Tên phải có tối thiểu 5 ký tự')
    .max(30, 'Tên không vượt quá 30 ký tự')
    .required('Vui lòng nhập tên'),
  sex: Yup.string()
    .oneOf(['male', 'female'])
    .required('Vui lòng chọn giới tính'),
});
