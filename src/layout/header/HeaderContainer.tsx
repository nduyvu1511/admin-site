import { useRef, useState } from 'react';
import { RiMenuFill, RiSearchLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../core/store';
import { toggleSidebar } from '../../modules/modal/modalSlice';
import { avatar } from '../../shared/assets/images';
import Breadcrumb from '../../shared/components/breadcrumb/Breadcrumb';
import Dropdown from '../../shared/components/dropdown/Dropdown';
import InputSearch from '../../shared/components/inputs/InputSearch';
import DropdownMenu from '../../shared/components/menu/DropdownMenu';
import useClickOutside from '../../shared/hook/useClickOutside';
import { userOptions } from './data';

const data = [
  { title: 'title 1', value: 'any', id: 1 },
  { title: 'title 2', value: 'any', id: 2 },
  { title: 'title 3', value: 'any', id: 3 },
];

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const inputSearchRef = useRef<HTMLDivElement>(null);

  useClickOutside([inputSearchRef], () => setSearchOpen(false));

  return (
    <header className="fixed top-0 right-0 left-0 z-[1000px]">
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
            <RiSearchLine className="text-2xl" />
          </button>

          <div
            ref={inputSearchRef}
            className={`w-full block md:hidden absolute transform z-10 left-0 right-0 h-full transition-all ${
              searchOpen
                ? ' translate-y-0 visible opacity-100'
                : 'translate-y-[-100%] invisible opacity-0'
            }`}>
            <InputSearch />
          </div>

          {/* User option */}
          <DropdownMenu list={userOptions}>
            <img
              className="w-7 h-7 object-cover rounded-md"
              src={avatar}
              alt=""
            />
          </DropdownMenu>
          {/*  */}
        </div>
      </section>

      <div className="dark:bg-[#1A1C2D] py-2 bg-light-bg h-header-bottom flex items-center">
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleSidebar(!isOpenSidebar))}
              className="mr-3 sm:mr-6">
              <RiMenuFill className="text-lg dark:text-light-bg text-light-text" />
            </button>
            <Breadcrumb parentPage="Dashboard" childPage="Sales" />
          </div>

          <Dropdown list={data} handleClick={() => console.log('click')} />
        </div>
      </div>
    </header>
  );
};

export default HeaderContainer;
