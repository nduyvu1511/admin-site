import { useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import useClickOutside from '../../hook/useClickOutside';
import { IDropdown, ItemDropdown } from './interface';

const Dropdown = ({
  list,
  handleClick,
  heading,
  reverse,
  inForm,
  itemActive: ItemActiveProps,
}: IDropdown) => {
  const dropdownListRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [itemActive, setItemActive] = useState<ItemDropdown>(() =>
    ItemActiveProps ? ItemActiveProps : list[0]
  );

  useClickOutside([dropdownListRef], () => setOpen(false));

  return (
    <div
      ref={dropdownListRef}
      className="relative rounded-[4px] border border-solid border-[#D3D3D3] dark:border-white-02 z-[1000]">
      <p
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center cursor-pointer ${
          inForm ? 'h-10 justify-between' : 'py-[6px]'
        } px-5 text-sm font-normal capitalize text-light-text-bold
          dark:text-light-bg`}>
        {`${heading ? heading : ''} ${itemActive.name}`}
        <BiChevronDown
          className={`ml-4 transform transition-all ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </p>

      <ul
        ref={listRef}
        className={`absolute bg-[#F8FAFC] dark:bg-[#191E3A] py-2 right-0 ${
          reverse ? `-top-[154px]` : 'top-[calc(100%+6px)]'
        } rounded-[4px] min-w-[150px] shadow-shadow-1 transition-all ${
          !isOpen ? 'invisible opacity-0' : 'visible opacity-100'
        } overflow-y-auto ${inForm ? 'w-full' : ''} ${
          list.length > 6 ? 'max-h-[25vh]' : 'max-h-[70vh]'
        }`}>
        {list.map((item) => (
          <li
            key={item.id || item._id}
            className="py-3 pl-4 pr-8 w-full hover:bg-[#F8F8F8] hover:text-indigo-700 dark:hover:text-light-bg dark:lg:hover:bg-[#282D49] hover:rounded-[4px]
             whitespace-nowrap cursor-pointer text-sm font-normal text-light-text-bold dark:text-light-bg capitalize"
            onClick={() => {
              setItemActive(item);
              setOpen(!isOpen);
              handleClick && handleClick(item.id || item._id);
            }}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
