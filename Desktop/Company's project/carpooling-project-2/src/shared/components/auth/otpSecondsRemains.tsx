import { useEffect, useState } from "react"

const RESEND_OTP_TIMEOUT = 60

interface Props {
  onChange?: Function
}

export const OtpSecondsRemains = ({ onChange }: Props) => {
  const [secondsExpire, setSecondsExprire] = useState<number>(RESEND_OTP_TIMEOUT)

  useEffect(() => {
    if (secondsExpire === 0) return
    const interval = setInterval(() => {
      setSecondsExprire(secondsExpire - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsExpire])

  return (
    <div className="flex justify-center">
      {secondsExpire === 0 ? (
        <>
          <p className="text-[12px]">Bạn không nhận được mã?</p>
          <span
            className="text-[12px] ml-[2px] font-medium text-primary cursor-pointer"
            onClick={() => {
              setSecondsExprire(RESEND_OTP_TIMEOUT)
              onChange && onChange()
            }}
          >
            Gửi lại
          </span>
        </>
      ) : (
        <p className="text-center">Vui lòng chờ {secondsExpire} giây để gửi lại</p>
      )}
    </div>
  )
}
