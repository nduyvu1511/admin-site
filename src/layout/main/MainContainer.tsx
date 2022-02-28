import SideBar from '../sidebar/SideBar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { Route, Routes } from 'react-router-dom';
import DashboardContainer from '../dashboard/DashboardContainer';
import Modal from '../../shared/components/modal/Modal';
import { toggleSidebarSm } from '../../modules/modal/modalSlice';
import ProductInventory from '../inventory/ProductInventory';
import CategoryInventory from '../inventory/CategoryInventory';
import NotFound from '../../view/notFound/NotFound';
import UserInventory from '../inventory/UserInventory';
import OrderInventory from '../inventory/OrderInventory';

const MainContainer = () => {
  const dispatch = useDispatch();

  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);
  const { isOpenSidebarSm } = useSelector((state: RootState) => state.modal);

  return (
    <section className={`max-w-full w-full`}>
      <div
        className={`hidden lg:block w-56 border-r border-solid border-black-007 dark:border-white-007 max-h-screen 
            overflow-y-auto fixed top-[111px] bottom-0 left-0 py-3 dark:bg-dark-primary
            bg-light-bg px-6 transform transition-all ${
              !isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
            }`}>
        <SideBar />
      </div>

      <Modal
        direction="left"
        isShowModal={isOpenSidebarSm}
        handleClickModal={() => dispatch(toggleSidebarSm())}>
        <SideBar />
      </Modal>

      {/* main content */}
      <div
        className={`mt-header-height transition-all px-15px sm:px-30px ${
          isOpenSidebar ? 'lg:ml-0' : 'lg:ml-sidebar-width'
        } py-6`}>
        <Routes>
          <Route path={'dashboard'} element={<DashboardContainer />} />
          <Route path={''} element={<DashboardContainer />} />
          <Route path="product" element={<ProductInventory />} />
          <Route path="category" element={<CategoryInventory />} />
          <Route path="user" element={<UserInventory />} />
          <Route path="order" element={<OrderInventory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default MainContainer;
