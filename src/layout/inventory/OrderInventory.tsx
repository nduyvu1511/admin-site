import InputSearch from '../../shared/components/inputs/InputSearch';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { useEffect } from 'react';
import { toggleCategoryForm } from '../../modules/modal/modalSlice';
import FooterPagination from '../../shared/components/pagination/FooterPagination';
import TableOrder from '../../shared/components/order/TableOrder';

const OrderInventory = () => {
  const dispatch = useDispatch();

  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);

  useEffect(() => {}, [dispatch]);

  // const

  return (
    <section>
      <header className="flex items-center justify-between pb-8">
        <h1 className="text-2xl font-bold dark:text-dark-text-bold text-light-text-bold">
          Order
        </h1>
        <div className="flex items-center">
          <div className="h-10 mr-4">
            <InputSearch isRounded={true} isChangedTheme={true} />
          </div>
          <button
            onClick={() => dispatch(toggleCategoryForm(true))}
            className="btn-primary rounded-[25px]">
            <FaPlus className="mr-2" />
            Add
          </button>
        </div>
      </header>

      <div className="mb-16">
        <TableOrder />
      </div>

      <footer
        className={`h-16 p-7 fixed left-0 transition-all border-t border-solid dark:border-white-01 border-black-01 ${
          !isOpenSidebar ? 'lg:left-[224px]' : ''
        }
             right-0 bottom-0 dark:bg-dark-bg-opacity bg-[#F8FAFC] flex items-center`}>
        <FooterPagination
          limit={8}
          page={1}
          setLimit={(limit: number) => console.log(limit)}
          setPage={(page: number) => console.log(page)}
          list={[]}
        />
      </footer>
    </section>
  );
};

export default OrderInventory;
