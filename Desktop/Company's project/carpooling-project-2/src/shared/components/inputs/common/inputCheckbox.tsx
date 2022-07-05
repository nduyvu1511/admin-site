import { CheckIcon } from "@/assets"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "circle" | "square"
}

export const InputCheckbox = ({ onCheck, isChecked, type = "square" }: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`w-[24px] h-[24px] border border-solid rounded-[50%] flex-center border-gray-color-4 input__checkbox-${type} ${
        isChecked ? `bg-gray-color-4` : ""
      }`}
    >
      {isChecked ? <CheckIcon className="w-[12px] h-[8px]" /> : null}
    </span>
  )
}
