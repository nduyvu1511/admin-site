import {
  EMAIL_REGEX,
  NO_SPACE_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
  URL_REGEX
} from "./constant"

export const validateEmail = (email: string) => EMAIL_REGEX.test(email)
export const validatePassword = (pw: string) => PASSWORD_REGEX.test(pw)
export const validatePhoneNumber = (phone: string) =>
  PHONE_NUMBER_REGEX.test(phone)
export const validateNoSpace = (val: string) => NO_SPACE_REGEX.test(val)
export const validateUrl = (val: string) => URL_REGEX.test(val)
