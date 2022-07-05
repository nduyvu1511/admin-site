import { CheckCircleIcon } from "@/assets"
import { ReactNode } from "react"

interface ModalConfirmProps {
  heading: string
  onClose: Function
  children: ReactNode
  className?: string
  iconType?: "close" | "back"
  overLayClose?: boolean
}

const ModalConfirm = ({
  heading,
  onClose,
  children,
  className = "",
  iconType = "close",
  overLayClose = false,
}: ModalConfirmProps) => {
  return (
    <div className="fixed inset-[0] z-[3000]">
      <div
        className={`flex flex-col sm:max-w-[448px] w-full absolute-center overflow-hidden bg-white-color sm:rounded-[30px] px-[40px] z-10 ${className}`}
      >
        <div className="flex-1 flex-center flex-col mb-[40px]">
          <CheckCircleIcon className="w-[80px] h-[80px] my-[40px]" />
          <p className="line-clamp-3 text-16 font-medium leading-26 text-center">
            Tài khoản của bạn đã được đăng ký thành công. Hãy hoàn tất quy trình xác minh để sử dụng
            các dịch vụ trên Exxe.
          </p>
        </div>

        <div className="flex-center mb-[40px]">
          <button className="btn bg-success px-[43px] py-[13px] mr-[20px]">Quay lại</button>
          <button className="btn bg-gray-color-1 text-gray-color-4">Xác minh</button>
        </div>
      </div>

      <div
        onClick={() => overLayClose && onClose && onClose()}
        className={`absolute inset-[0] bg-black-60 ${overLayClose ? "cursor-pointer" : ""}`}
      ></div>
    </div>
  )
}

export { ModalConfirm }

