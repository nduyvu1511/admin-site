import React, { useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import useClickOutside from '../../hook/useClickOutside';
import useDebounce from '../../hook/useDebounce';

interface QuantityInput {
  quantity: number;
  onChangeQuantity?: Function;
}

function InputQuantity({ quantity, onChangeQuantity }: QuantityInput) {
  const [inputQuantity, setInputQuantity] = useState<number>(quantity);

  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside([inputRef], () => {
    if (inputQuantity === 0) {
      setInputQuantity(1);
      onChangeQuantity && onChangeQuantity(1);
    }
  });

  const handleChangeQuantity = (type: String) => {
    switch (type) {
      case 'Descrease':
        if (inputQuantity > 1) {
          setInputQuantity(inputQuantity - 1);
          onChangeQuantity && onChangeQuantity(inputQuantity - 1);
        }
        break;
      case 'Increase':
        setInputQuantity((prev) => prev + 1);
        onChangeQuantity && onChangeQuantity(inputQuantity + 1);
        break;
    }
  };

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setInputQuantity(+value);
      onChangeQuantity && onChangeQuantity(+value);
    }
  };

  return (
    <div className="input__quantity">
      <button
        onClick={() => handleChangeQuantity('Descrease')}
        className="input__quantity-btn input__quantity-minus">
        <AiOutlineMinus />
      </button>
      <input
        ref={inputRef}
        className="input__quantity-input"
        type="number"
        value={inputQuantity}
        onChange={updateQuantity}
        min={1}
      />
      <button
        onClick={() => handleChangeQuantity('Increase')}
        className="input__quantity-btn input__quantity-plus">
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default InputQuantity;
