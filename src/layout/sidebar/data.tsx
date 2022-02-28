import { RiHome4Line, RiShoppingCartLine, RiUser3Line } from 'react-icons/ri';
import { FiShoppingBag } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';

interface SubItem {
  id: number | string;
  name: string;
}

export const sidebars = [
  {
    id: 'dashboard',
    icon: <RiHome4Line className="text-xl" />,
    name: 'dashboard',
    child: [] as SubItem[],
  },
  {
    id: 'product',
    icon: <RiShoppingCartLine className="text-xl" />,
    name: 'Product',
    child: [] as SubItem[],
  },
  {
    id: 'category',
    icon: <BiCategory className="text-xl" />,
    name: 'Category',
    child: [] as SubItem[],
  },

  {
    id: 'user',
    icon: <RiUser3Line className="text-xl" />,
    name: 'User',
    child: [] as SubItem[],
  },

  {
    id: 'order',
    icon: <FiShoppingBag className="text-xl" />,
    name: 'Order',
    child: [] as SubItem[],
  },
];
