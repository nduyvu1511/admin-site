import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { perPageList } from '../../../layout/inventory/data';
import usePagination from '../../hook/usePagination';
import Dropdown from '../dropdown/Dropdown';

interface FooterPaginationProps {
  list: Array<any>;
  setLimit: Function;
  limit: number;
  page: number;
  setPage: Function;
}

const FooterPagination = ({
  list,
  page,
  setLimit,
  limit,
  setPage,
}: FooterPaginationProps) => {
  const { prevPage, nextPage } = usePagination({ list, limit, page });

  return (
    <div
      className={`text-[13px] font-normal text-light-text dark:text-dark-text right-0 bottom-0 dark:bg-dark-bg-opacity bg-[#F8FAFC] flex items-center`}>
      <p className="sm:mr-4 hidden sm:block">Items per page:</p>
      <Dropdown
        reverse={true}
        list={perPageList}
        handleClick={(limit: number) => {
          setLimit(limit);
          page !== 1 && setPage(1);
        }}
      />

      <p className="ml-6 font-medium">
        {page * limit - (limit - 1)} <span>-</span>{' '}
        {page * limit <= list.length ? page * limit : list.length}
        <span className="mx-1">of</span> {list.length}
      </p>

      <div className="ml-6 flex items-center">
        <button
          onClick={() => {
            prevPage !== page && setPage(page - 1);
          }}
          className={`transition-all w-8 h-8 rounded-[50%] hover:lg:bg-slate-100 flex items-center justify-center ${
            prevPage === page ? 'pointer-events-none opacity-50' : ''
          }`}>
          <RiArrowLeftSLine className="text-2xl font-bold" />
        </button>

        <button
          onClick={() => {
            nextPage !== page && setPage(page + 1);
          }}
          className={`transition-all ml-6 w-8 h-8 rounded-[50%] hover:lg:bg-slate-100 flex items-center justify-center ${
            nextPage === page ? 'pointer-events-none opacity-50' : ''
          }`}>
          <RiArrowRightSLine className="text-2xl font-bold" />
        </button>
      </div>
    </div>
  );
};

export default FooterPagination;
