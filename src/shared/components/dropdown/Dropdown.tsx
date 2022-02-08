import { useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import useClickOutside from '../../hook/useClickOutside';
import { IDropdown, ItemDropdown } from './interface';

const Dropdown = ({ list, handleClick, heading }: IDropdown) => {
  const dropdownListRef = useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = useState<boolean>(false);

  const [itemActive, setItemActive] = useState<ItemDropdown>(list[0]);

  useClickOutside([dropdownListRef], () => setOpen(false));

  return (
    <div
      ref={dropdownListRef}
      className="relative rounded-md border border-solid border-[#D3D3D3] dark:border-[#3B3F5C]">
      <p
        onClick={() => setOpen(!isOpen)}
        className="flex items-center cursor-pointer py-[6px] px-5 text-sm font-normal capitalize text-light-text-bold dark:text-light-bg">
        {`${heading ? heading : ''} ${itemActive.title}`}
        <BiChevronDown
          className={`ml-4 transform transition-all ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </p>

      <ul
        className={`absolute bg-light-bg dark:bg-[#191E3A] py-2 right-0 top-[calc(100%+6px)] rounded-[4px] min-w-[150px]
            shadow-shadow-1 transition-all ${
              !isOpen ? 'invisible opacity-0' : 'visible opacity-100'
            }`}>
        {list.map((item) => (
          <li
            key={item.id}
            className="py-3 pl-4 pr-8 w-full hover:bg-[#F8F8F8] hover:text-indigo-700 dark:hover:text-light-bg dark:lg:hover:bg-[#282D49] hover:rounded-[4px]
             whitespace-nowrap cursor-pointer text-sm font-normal text-light-text-bold dark:text-light-bg capitalize"
            onClick={() => {
              setItemActive(item);
              setOpen(!isOpen);
              handleClick && handleClick(item);
            }}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
