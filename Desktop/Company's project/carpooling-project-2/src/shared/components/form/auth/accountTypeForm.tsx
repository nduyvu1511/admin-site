import { CustomerIcon, DriverIcon } from "@/assets"
import { InputRadio } from "@/components/inputs"
import { CarAccountType } from "@/models"
import { useState } from "react"

interface AccountTypeFormProps {
  onSubmit: (params: CarAccountType) => void
}

const AccountTypeForm = ({ onSubmit }: AccountTypeFormProps) => {
  const [accountType, setAccounType] = useState<CarAccountType | undefined>()

  const handleChooseAccountType = (status: CarAccountType) => {
    setAccounType(status)
  }

  return (
    <div className="">
      <div className="flex items-center mb-[40px]">
        <div
          onClick={() => handleChooseAccountType("car_driver")}
          className="relative flex-1 flex-center flex-col"
        >
          <div className="">
            <InputRadio isChecked={accountType === "car_driver"} onCheck={() => {}} />
          </div>
          <DriverIcon className="w-[80%]" />
          <span className="text-16 font-medium mt-[10px] text-primary">Tài khoản tài xế</span>
        </div>
        <div
          onClick={() => handleChooseAccountType("customer")}
          className="relative flex-1 flex-center flex-col"
        >
          <div className="">
            <InputRadio isChecked={accountType === "customer"} onCheck={() => {}} />
          </div>
          <CustomerIcon className="w-[80%]" />
          <span className="text-16 font-medium mt-[10px] text-primary">Tài khoản khách hàng</span>
        </div>
      </div>

      <div className="flex-center">
        <button
          onClick={() => accountType && onSubmit(accountType)}
          className={`btn-primary ${!accountType ? "btn-disabled" : ""}`}
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}

export { AccountTypeForm }
