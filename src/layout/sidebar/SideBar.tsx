import { sidebars } from './data';
import { HiChevronDown } from 'react-icons/hi';
import { ItemActive } from './interface';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sidebarActive, setSidebarActive] = useState<ItemActive>({
    isOpen: false,
    id: '',
  });

  return (
    <ul className="mt-3">
      {sidebars.map((item) => (
        <li key={item.id} className="overflow-hidden my-2">
          <button
            onClick={() => {
              setSidebarActive({
                isOpen:
                  item.id === sidebarActive.id ? !sidebarActive.isOpen : true,
                id: item.id,
              });

              navigate(`/${item.id}`);
            }}
            className={`flex items-center justify-between w-full mb-1 last:mb-0 text-light-text 
                capitalize p-3 tracking-[0.4px] font-semibold text-[13px] 
              hover:bg-[#F8FAFC] dark:hover:bg-[#374756] 
              dark:hover:text-light-bg hover:rounded-md cursor-pointer ${
                pathname.split('/')[1] === item.id
                  ? 'dark:bg-[#374756] rounded-md dark:text-light-bg bg-[#F8FAFC]'
                  : 'dark:text-dark-text'
              }`}>
            <div className="flex items-center">
              {item.icon}
              <span className="mx-[6px]"></span>
              <p className="">{item.name}</p>
            </div>

            {item.child && item.child.length > 0 ? (
              <HiChevronDown
                className={`text-sm transition-all ${
                  sidebarActive.id === item.id && sidebarActive.isOpen
                    ? 'transform -rotate-90'
                    : ''
                }`}
              />
            ) : null}
          </button>

          {item.child && item.child.length > 0 ? (
            <ul
              className={`transition-all duration-200 pl-11 mb-1 list-disc ${
                item.id === sidebarActive.id && sidebarActive.isOpen
                  ? 'max-h-screen'
                  : 'max-h-0'
              }`}>
              {item.child &&
                item.child.map((subItem) => (
                  <li
                    className="dark:text-dark-text py-3 text-[13px] cursor-pointer hover:text-indigo-700 font-medium"
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
