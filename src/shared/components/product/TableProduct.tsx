import { RiCheckFill, RiCloseFill } from 'react-icons/ri';
import { IoExpandOutline } from 'react-icons/io5';
import { ImArrowDown2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { tableHeadingList } from '../../../layout/inventory/data';
import { Product } from '../../../modules/product/interface';
import { useDispatch } from 'react-redux';
import {
  addProductDetail,
  sortProducts,
} from '../../../modules/product/productSlice';
import { toggleProductForm } from '../../../modules/modal/modalSlice';

interface CurrentActive {
  type: 'desc' | 'asc';
  id: string;
}

interface TableProductProps {
  productList: Product[];
}

const TableProduct = ({ productList }: TableProductProps) => {
  const [currentActive, setCurrentActive] = useState<CurrentActive>(
    {} as CurrentActive
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortProducts(currentActive));
  }, [currentActive]);

  return (
    <table className="w-full border product-table">
      <thead className={`shadow-sm bg-[#F8FAFC] dark:bg-dark-bg-opacity`}>
        <tr className="border border-solid dark:border-white-01 border-black-01">
          <th className="w-12"></th>
          <th></th>
          {tableHeadingList.map((item) => (
            <th
              key={item.id}
              className={`${
                item.id === 'name' || item.id === 'stock'
                  ? ''
                  : 'hidden lg:table-cell'
              } ${
                item.id === 'detail' ? 'hidden md:table-cell' : ''
              } text-left`}>
              <button
                onClick={() => {
                  setCurrentActive({
                    type:
                      item.id === currentActive.id
                        ? currentActive.type === 'desc'
                          ? 'asc'
                          : 'desc'
                        : 'asc',
                    id: item.id,
                  });
                }}
                className="flex items-center text-sm font-semibold text-light-text p-4 dark:text-dark-text-2">
                {item.title}

                <ImArrowDown2
                  className={`ml-2 transform transition-all ${
                    currentActive.id === item.id
                      ? 'opacity-100'
                      : 'opacity-0 hover:opacity-100'
                  } ${currentActive.type === 'asc' ? 'rotate-180' : ''}`}
                />
              </button>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody className="max-h-screen overflow-auto">
        {productList.length > 0 &&
          productList
            .map((product, index) => ({ ...product, index: index + 1 }))
            .map((pro) => (
              <tr
                key={pro._id}
                className="border font-semibold border-solid dark:border-white-01 border-black-01">
                <td className="align-middle text-center dark:text-dark-text text-light-text text-sm font-medium">
                  {pro.index}
                </td>
                <td className="p-4 align-middle border">
                  <img
                    className="w-10 h-10 object-cover"
                    src={pro.images[0]}
                    alt=""
                  />
                </td>
                <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  {pro.sku}
                </td>
                <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  {pro.name}
                </td>
                <td className="hidden md:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  ${pro.price.regular_price}
                </td>
                <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  {pro.stock}
                </td>
                <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  {pro.active ? (
                    <RiCheckFill className="text-2xl font-bold text-green-500" />
                  ) : (
                    <RiCloseFill className="text-2xl font-bold text-red-400" />
                  )}
                </td>
                <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
                  <button
                    onClick={() => {
                      dispatch(addProductDetail(pro));
                      dispatch(toggleProductForm(true));
                    }}
                    className="w-10 h-6 border border-solid dark:border-white-01 border-black-01
                 rounded-[25px] flex items-center justify-center">
                    <IoExpandOutline className="text-sm font-bold" />
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default TableProduct;
