import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const InputSearch = () => {
  const navigate = useNavigate();

  const [text, setText] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text) return;

    navigate(`/search?q=${text}`);
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="relative w-full h-full">
      <RiSearchLine className="text-dark-text absolute transform -translate-y-1/2 top-1/2 left-[10px] text-lg" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-[#0E1726] px-3 border-[1px] border-[#202837] pl-9 outline-none h-full w-full text-sm text-dark-text font-semibold"
        placeholder="Search..."
      />
    </form>
  );
};

export default InputSearch;
