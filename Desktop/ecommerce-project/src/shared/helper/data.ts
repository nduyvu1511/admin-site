export const notifications = [{}]

interface PasswordFormDataProps {
  label: string
  name: "password" | "newPassword" | "reNewPassword"
}

export const passwordFormData: PasswordFormDataProps[] = [
  {
    label: "Mật khẩu cũ",
    name: "password",
  },
  {
    label: "Mật khẩu mới",
    name: "newPassword",
  },
  {
    label: "Xác nhận mật khẩu",
    name: "reNewPassword",
  },
]
