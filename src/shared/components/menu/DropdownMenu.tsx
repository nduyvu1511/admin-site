import { ReactNode, useRef, useState } from 'react';
import useClickOutside from '../../hook/useClickOutside';

interface IDropdownMenu {
  children: ReactNode;
  list: Array<any>;
  onSelect: Function;
}

const DropdownMenu = ({ children, list, onSelect }: IDropdownMenu) => {
  const [open, setOpen] = useState<boolean>(false);

  const openRef = useRef<HTMLDivElement>(null);
  const openRef2 = useRef<HTMLDivElement>(null);

  useClickOutside([openRef, openRef2], () => setOpen(false));

  return (
    <div className="cursor-pointer relative z-10">
      <div onClick={() => setOpen(!open)} ref={openRef2} className="">
        {children}
      </div>

      {/* child */}
      <div
        ref={openRef}
        className={`bg-white dark:bg-[#1B2E4B] py-4 absolute right-0 top-[calc(100%+8px)] 
            rounded-[4px] shadow-shadow-1 duration-300 transition-all ${
              open
                ? 'visible opacity-100 mt-0'
                : 'invisible opacity-0 mt-5 z-[1001]'
            }`}>
        <ul className="dark:text-dark-text-2 text-light-text font-medium">
          {list.map((item) => (
            <li
              onClick={() => onSelect && onSelect(item.id)}
              key={item.id}
              className="flex items-center py-3 pl-6 pr-8 hover:text-indigo-700 dark:hover:text-dark-text-bold">
              {item.icon}
              <p className="ml-4 whitespace-nowrap text-[13px]">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
