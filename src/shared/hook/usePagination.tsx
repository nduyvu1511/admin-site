import { isArrayHasValue } from '../helper/functions';

interface PaginationProps {
  limit: number;
  page: number;
  list: any;
}

export interface Pagination {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalProduct: number;
  list: Array<any>;
  totalPage: number;
}

const usePagination = ({ limit, page, list }: PaginationProps): Pagination => {
  if (!isArrayHasValue(list)) {
    return {
      currentPage: 0,
      nextPage: 0,
      prevPage: 0,
      totalProduct: 0,
      list: [],
      totalPage: 0,
    };
  }

  const length = list.length;

  const totalPage = Math.ceil(length / limit);

  if (page > totalPage) return {} as Pagination;

  if (limit >= length) {
    return {
      currentPage: 1,
      nextPage: 1,
      prevPage: 1,
      totalProduct: length,
      list,
      totalPage,
    };
  }

  return {
    currentPage: page,
    nextPage: page < totalPage ? page + 1 : page,
    prevPage: page > 1 ? page - 1 : 1,
    totalProduct: length,
    list: list.slice((page - 1) * limit, page * limit),
    totalPage,
  };
};

export default usePagination;
