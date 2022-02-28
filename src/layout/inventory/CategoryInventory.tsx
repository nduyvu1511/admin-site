import InputSearch from '../../shared/components/inputs/InputSearch';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import Modal from '../../shared/components/modal/Modal';
import { useEffect, useState } from 'react';
import TableCategory from '../../shared/components/category/TableCategory';
import { fetchAllCategories } from '../../modules/product/productThunk';
import { toggleCategoryForm } from '../../modules/modal/modalSlice';
import CategoryForm from '../../shared/components/category/CategoryForm';
import FooterPagination from '../../shared/components/pagination/FooterPagination';
import usePagination from '../../shared/hook/usePagination';

const CategoryInventory = () => {
  const dispatch = useDispatch();

  const { isOpenSidebar, isOpenCategoryForm } = useSelector(
    (state: RootState) => state.modal
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);
  const [searchVal, setSearchVal] = useState<string>();

  const { categoryList: _categoryList } = useSelector(
    (state: RootState) => state.product
  );

  const { list: categoryList } = usePagination({
    limit,
    page,
    list: _categoryList,
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // const

  return (
    <section>
      <header className="flex items-center justify-between pb-8">
        <h1 className="text-2xl font-bold dark:text-dark-text-bold text-light-text-bold">
          Category
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
        <TableCategory />
      </div>

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
          list={_categoryList}
        />
      </footer>
      {isOpenCategoryForm ? (
        <Modal
          isShowModal={isOpenCategoryForm}
          direction="center"
          heading="Create New Category"
          unsetSize={true}
          handleClickModal={() => dispatch(toggleCategoryForm(false))}>
          <CategoryForm />
        </Modal>
      ) : null}
    </section>
  );
};

export default CategoryInventory;
