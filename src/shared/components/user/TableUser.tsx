import { ImArrowDown2 } from 'react-icons/im';
import { useState } from 'react';
import { userTableHeadingList } from '../../../layout/inventory/data';
import { useDispatch } from 'react-redux';
import { IoExpandOutline } from 'react-icons/io5';

interface CurrentActive {
  type: 'desc' | 'asc';
  id: string;
}

const TableUser = () => {
  const [currentActive, setCurrentActive] = useState<CurrentActive>(
    {} as CurrentActive
  );

  const dispatch = useDispatch();

  return (
    <table className="w-full border product-table">
      <thead className={`shadow-sm bg-[#F8FAFC] dark:bg-dark-bg-opacity`}>
        <tr className="border border-solid dark:border-white-01 border-black-01">
          <th className="w-12"></th>
          <th></th>
          {userTableHeadingList.map((item) => (
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
            <td className="p-4 align-middle border">
              <img
                className="w-10 h-10 object-cover"
                src="https://yoolk.ninja/wp-content/uploads/2017/01/Batman5.png"
                alt=""
              />
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              Nguyen Van A
            </td>
            <td className="p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              email@gmail.com
            </td>
            <td className="hidden md:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              $2a$10$oo0rgjDimifz/mNhJUtG1OH7/6fM7ElhK1udW12ue8nxcBzibCcsi
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              28/02/2022
            </td>
            <td className="hidden lg:table-cell p-4 align-middle dark:text-dark-text text-light-text text-sm font-medium">
              $1450
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

export default TableUser;
