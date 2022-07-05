interface InputRadioProps {
  onCheck: Function
  isChecked: boolean
}

export const InputRadio = ({ onCheck, isChecked }: InputRadioProps) => {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        onCheck && onCheck()
      }}
      className={`w-[17px] h-[17px] rounded-[50%] border border-solid border-gray-color-4 flex-center ${
        isChecked ? `input__radio-active` : ""
      }`}
    >
      {isChecked ? <span className="w-[11px] h-[11px] bg-gray-color-4 rounded-[50%]"></span> : null}
    </span>
  )
}
