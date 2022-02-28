import { IoExpandOutline } from 'react-icons/io5';
import { ImArrowDown2 } from 'react-icons/im';
import { useState } from 'react';
import { tableHeadingList } from './data';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store';

interface CurrentActive {
  status: 'desc' | 'asc';
  id: string;
}

const TableCategory = () => {
  const [currentActive, setCurrentActive] = useState<CurrentActive>(
    {} as CurrentActive
  );

  const { categoryList } = useSelector((state: RootState) => state.product);

  return (
    <table className="w-full border product-table">
      <thead className="shadow-sm   bg-[#F8FAFC] dark:bg-dark-bg-opacity">
        <tr
          className={`border border-solid dark:border-white-01 border-black-01`}>
          <th></th>
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
                onClick={() =>
                  setCurrentActive({
                    status:
                      item.id === currentActive.id
                        ? currentActive.status === 'desc'
                          ? 'asc'
                          : 'desc'
                        : 'asc',
                    id: item.id,
                  })
                }
                className="flex items-center text-sm font-semibold text-light-text p-4 dark:text-dark-text-2">
                {item.title}

                <ImArrowDown2
                  className={`ml-2 transform transition-all ${
                    currentActive.id === item.id
                      ? 'opacity-100'
                      : 'opacity-0 hover:opacity-100'
                  } ${currentActive.status === 'asc' ? 'rotate-180' : ''}`}
                />
              </button>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody className="max-h-screen overflow-auto">
        {categoryList.map((item, index) => (
          <tr
            key={item._id}
            className="border border-solid dark:border-white-01 border-black-01">
            <td className="align-middle text-center text-sm w-12 text-light-text dark:text-dark-text font-medium">
              {index + 1}
            </td>
            <td className="p-4 align-middle border">
              <img className="w-10 h-10 object-cover" src={item.image} alt="" />
            </td>

            <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              {item.name}
            </td>

            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              30
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

export default TableCategory;
