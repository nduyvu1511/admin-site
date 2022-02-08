import { BsCheck } from 'react-icons/bs';

interface InputCheck {
  onCheck: Function;
  isChecked: boolean;
}

const InputCheckbox = ({ onCheck, isChecked }: InputCheck) => {
  return (
    <span
      onClick={() => onCheck && onCheck()}
      className={`input__checkbox ${
        isChecked ? 'input__checkbox-active' : ''
      }`}>
      {isChecked ? <BsCheck /> : null}
    </span>
  );
};

export default InputCheckbox;
