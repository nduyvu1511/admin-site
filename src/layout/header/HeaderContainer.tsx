import { useRef, useState } from 'react';
import { RiMenuFill, RiSearchLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logOut } from '../../modules/user/userSlice';
import { toggleSidebar, toggleSidebarSm } from '../../modules/modal/modalSlice';
import { avatar } from '../../shared/assets/images';
import Breadcrumb from '../../shared/components/breadcrumb/Breadcrumb';
import ButtonToggle from '../../shared/components/button/ButtonToggle';
import Dropdown from '../../shared/components/dropdown/Dropdown';
import InputSearch from '../../shared/components/inputs/InputSearch';
import DropdownMenu from '../../shared/components/menu/DropdownMenu';
import useClickOutside from '../../shared/hook/useClickOutside';
import { userOptions } from './data';

const data = [
  { name: 'Settings', id: 1 },
  { name: 'Mails', id: 2 },
  { name: 'Print', id: 3 },
  { name: 'Download', id: 4 },
  { name: 'Share', id: 5 },
];

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const inputSearchRef = useRef<HTMLDivElement>(null);

  useClickOutside([inputSearchRef], () => setSearchOpen(false));

  return (
    <header className="fixed top-0 right-0 left-0 z-[2000] border-b border-solid border-black-007">
      <section className="container flex justify-between items-center py-3 relative h-header-top bg-dark-primary">
        <div className="flex items-center">
          <Link className="text-2xl font-bold text-dark-text-bold mr-8" to="/">
            CORK
          </Link>
          <div className="w-[380px] h-9 hidden md:block rounded-md overflow-hidden">
            <InputSearch />
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setSearchOpen(true)}
            className="block md:hidden mr-4">
            <RiSearchLine className="text-2xl text-light-text dark:text-dark-text" />
          </button>

          <div
            ref={inputSearchRef}
            className={`w-full block md:hidden absolute transform z-[1002] left-0 right-0 h-full transition-all ${
              searchOpen
                ? ' translate-y-0 visible opacity-100'
                : 'translate-y-[-100%] invisible opacity-0'
            }`}>
            <InputSearch />
          </div>

          {/* User option */}
          <div className="flex items-center z-[1001]">
            <ButtonToggle />
            <span className="mx-4"></span>
            <DropdownMenu
              list={userOptions}
              onSelect={(id: number) => id === 4 && dispatch(logOut())}>
              <img
                className="w-7 h-7 object-cover rounded-md"
                src={avatar}
                alt=""
              />
            </DropdownMenu>
          </div>
          {/*  */}
        </div>
      </section>

      <div className="dark:bg-[#1A1C2D] py-2 bg-white-color h-header-bottom flex items-center shadow-sm dark:shadow-shadow-1">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            {/* Show on desktop */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="hidden lg:block mr-3 sm:mr-6">
              <RiMenuFill className="text-lg dark:text-light-bg text-light-text" />
            </button>

            {/* Show on mobile */}
            <button
              onClick={() => dispatch(toggleSidebarSm())}
              className="block lg:hidden mr-3 sm:mr-6">
              <RiMenuFill className="text-lg dark:text-light-bg text-light-text" />
            </button>

            <Breadcrumb
              parentPage="Home"
              childPage={
                pathname.split('/')[1] === ''
                  ? 'Dashboard'
                  : pathname.split('/')[1]
              }
            />
          </div>

          <Dropdown list={data} handleClick={() => console.log('click')} />
        </div>
      </div>
    </header>
  );
};

export default HeaderContainer;
