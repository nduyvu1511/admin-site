import { sidebars } from '../main/data';
import { HiChevronDown } from 'react-icons/hi';
import { ItemActive } from './interface';
import { useState } from 'react';

const SideBar = () => {
  const [sidebarActive, setSidebarActive] = useState<ItemActive>({
    isOpen: false,
    id: '',
  });

  return (
    <ul>
      {sidebars.map((item) => (
        <li key={item.id} className="overflow-hidden">
          <button
            onClick={() =>
              setSidebarActive({
                isOpen:
                  item.id === sidebarActive.id ? !sidebarActive.isOpen : true,
                id: item.id,
              })
            }
            className={`flex items-center justify-between w-full dark:hover:bg-[#374756] dark:text-dark-text 
            text-light-text text-[13px] font-semibold tracking-[0.4px] capitalize py-3 px-3 transition-all duration-100 
              dark:hover:text-light-bg hover:rounded-md cursor-pointer mb-1 last:mb-0`}>
            <div className="flex items-center">
              {item.icon}
              <span className="mx-[6px]"></span>
              <p className="">{item.name}</p>
            </div>

            {item.child.length > 0 ? (
              <HiChevronDown
                className={`text-sm transition-all ${
                  sidebarActive.id === item.id && sidebarActive.isOpen
                    ? 'transform -rotate-90'
                    : ''
                }`}
              />
            ) : null}
          </button>

          {item.child.length > 0 ? (
            <ul
              className={`transition-all duration-200 pl-11 mb-1 ${
                item.id === sidebarActive.id && sidebarActive.isOpen
                  ? 'max-h-screen'
                  : 'max-h-0'
              }`}>
              {item.child.map((subItem) => (
                <li
                  className="dark:text-dark-text py-3 text-[13px] cursor-pointer hover:text-green-400 font-medium"
                  key={subItem.id}>
                  {subItem.name}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
