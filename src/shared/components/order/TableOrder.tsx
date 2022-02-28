import { ImArrowDown2 } from 'react-icons/im';
import { useState } from 'react';
import {
  orderTableHeadingList,
  userTableHeadingList,
} from '../../../layout/inventory/data';
import { useDispatch } from 'react-redux';
import { IoExpandOutline } from 'react-icons/io5';

interface CurrentActive {
  type: 'desc' | 'asc';
  id: string;
}

const TableOrder = () => {
  const [currentActive, setCurrentActive] = useState<CurrentActive>(
    {} as CurrentActive
  );

  const dispatch = useDispatch();

  return (
    <table className="w-full border product-table">
      <thead className={`shadow-sm bg-[#F8FAFC] dark:bg-dark-bg-opacity`}>
        <tr className="border border-solid dark:border-white-01 border-black-01">
          <th className="w-12"></th>
          {orderTableHeadingList.map((item) => (
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
        {Array.from({ length: 10 }).map((item, index) => (
          <tr
            key={index}
            className="border font-semibold border-solid dark:border-white-01 border-black-01">
            <td className="align-middle text-center dark:text-dark-text text-light-text text-sm font-medium">
              {index + 1}
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              621a62d5896b4058a4102535
            </td>
            <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              28/02/2022
            </td>
            <td className="hidden md:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              Nguyen Van A
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              40 street 8, truong tho Ward, Thu Duc city, ho chi minh city
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              $488
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              Delivery
            </td>
            <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              <button
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

export default TableOrder;
