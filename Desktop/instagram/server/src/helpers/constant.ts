export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
export const PHONE_NUMBER_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const NO_SPACE_REGEX = /^\S*$/
export const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
export const DEFAULT_MESSAGE = "Congratulation"
