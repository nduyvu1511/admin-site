import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface InputProps {
  isRounded?: boolean;
  isChangedTheme?: boolean;
  onSearch?: Function;
}

const InputSearch = ({ isRounded, isChangedTheme, onSearch }: InputProps) => {
  const navigate = useNavigate();

  const [text, setText] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text) return;

    navigate(`/product?q=${text}`);
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="relative w-full h-full">
      <RiSearchLine className="text-dark-text absolute transform -translate-y-1/2 top-1/2 left-[10px] text-lg" />
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onSearch && onSearch(e.target.value);
        }}
        className={`${
          isChangedTheme
            ? 'dark:bg-[#0E1726] dark:border-[#202837] bg-white'
            : 'bg-[#0E1726] border-[#202837]'
        } px-3 border-[1px] pl-9 outline-none h-full w-full text-sm 
        text-dark-text font-semibold ${isRounded ? 'rounded-[25px]' : ''}`}
        placeholder="Search..."
      />
    </form>
  );
};

export default InputSearch;
