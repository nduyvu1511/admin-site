import { BsCheck } from "react-icons/bs"

interface InputCheck {
  onCheck: Function
  isChecked: boolean
  type?: "radio" | "checkbox"
}

export const InputCheckbox = ({
  onCheck,
  isChecked,
  type = "checkbox",
}: InputCheck) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`input__checkbox ${
        isChecked ? "input__checkbox-active" : ""
      } input__checkbox-${type} ${
        type === "radio" && isChecked ? "input__checkbox-radio-active" : ""
      }`}
    >
      {isChecked ? <BsCheck /> : null}
    </span>
  )
}
