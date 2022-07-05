import { CreatePasswordForm, OTP } from "@/components"
import { usePassword } from "@/hooks"
import { useEffect, useState } from "react"

interface CreatePasswordProps {
  onSuccess?: Function
}

const CreatePassword = ({ onSuccess }: CreatePasswordProps) => {
  const { createPassword } = usePassword()
  const [firebaseToken, setFirebaseToken] = useState<string>()

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement).focus()
  }, [])

  const handleCreatePassword = (params: { password: string; re_password: string }) => {
    if (!firebaseToken) return

    createPassword({
      ...params,
      handleSuccess: () => {
        onSuccess && onSuccess()
      },
    })
  }

  return (
    <div className="">
      <div className="">
        {!firebaseToken ? (
          <OTP
            type="resetPassword"
            onVerifyOTP={(token) => {
              setFirebaseToken(token)
            }}
          />
        ) : (
          <div className="">
            <h1 className="page-heading">Tạo mới mật khẩu</h1>
            <CreatePasswordForm onSubmit={(params) => handleCreatePassword(params)} />
          </div>
        )}
      </div>
    </div>
  )
}

export { CreatePassword }
