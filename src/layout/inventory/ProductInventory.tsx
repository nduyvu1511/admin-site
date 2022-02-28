import InputSearch from '../../shared/components/inputs/InputSearch';
import { FaPlus } from 'react-icons/fa';
import TableProduct from '../../shared/components/product/TableProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import Dropdown from '../../shared/components/dropdown/Dropdown';
import { perPageList } from './data';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Modal from '../../shared/components/modal/Modal';
import ProductForm from '../../shared/components/product/ProductForm';
import { useEffect, useState } from 'react';
import {
  fetchAllCategories,
  fetchGetAllProducts,
} from '../../modules/product/productThunk';
import usePagination, { Pagination } from '../../shared/hook/usePagination';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../../modules/product/productSlice';
import { cartEmptyIcon } from '../../shared/assets/icon';
import { toggleProductForm } from '../../modules/modal/modalSlice';
import FooterPagination from '../../shared/components/pagination/FooterPagination';

const ProductInventory = () => {
  const { search } = useLocation();

  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);
  const { isOpenProductForm } = useSelector((state: RootState) => state.modal);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [searchVal, setSearchVal] = useState<string>();

  const {
    productList: { data: _productList },
  } = useSelector((state: RootState) => state.product);

  const { list: productList }: Pagination = usePagination({
    limit,
    page,
    list: _productList,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      dispatch(searchProducts(search.split('=')[1]));
    }
  }, [dispatch, search]);

  return (
    <section>
      <header className="flex flex-col sm:flex-row items-center justify-between pb-8">
        <h1
          className=" w-full sm:w-auto mb-6 sm:mb-0 text-2xl font-bold dark:text-dark-text-bold
        text-light-text-bold text-left inline-block">
          Inventory
        </h1>
        <div className="flex items-center w-full sm:w-auto">
          <div className="h-10 mr-4">
            <InputSearch
              onSearch={(val: string) => {
                dispatch(searchProducts(val));
                page !== 1 && setPage(1);
                setSearchVal(val);
              }}
              isRounded={true}
              isChangedTheme={true}
            />
          </div>
          <button
            onClick={() => dispatch(toggleProductForm(true))}
            className="btn-primary rounded-[25px]">
            <FaPlus className="mr-[2px] text-xs " />
            Add Product
          </button>
        </div>
      </header>

      <div className="mb-16">
        {productList && productList.length > 0 ? (
          <TableProduct productList={productList} />
        ) : searchVal ? (
          <div className="flex flex-col items-center py-6">
            {cartEmptyIcon}
            <h1 className="mt-4 text-center text-base font-semibold text-red-400">
              There are no products!
            </h1>
          </div>
        ) : null}
      </div>

      {isOpenProductForm ? (
        <Modal
          direction="center"
          isShowModal={isOpenProductForm}
          heading="Create New Product"
          handleClickModal={() => dispatch(toggleProductForm(false))}>
          <ProductForm />
        </Modal>
      ) : null}

      <footer
        className={`h-16 p-7 fixed left-0 transition-all border-t border-solid dark:border-white-01 border-black-01 ${
          !isOpenSidebar ? 'lg:left-[224px]' : ''
        }
             right-0 bottom-0 dark:bg-dark-bg-opacity bg-[#F8FAFC] flex items-center`}>
        <FooterPagination
          limit={limit}
          page={page}
          setLimit={(limit: number) => setLimit(limit)}
          setPage={(page: number) => setPage(page)}
          list={_productList}
        />
      </footer>
    </section>
  );
};

export default ProductInventory;
