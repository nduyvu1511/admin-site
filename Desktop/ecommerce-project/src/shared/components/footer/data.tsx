import { AiOutlineDollar } from 'react-icons/ai';
import { FaAirFreshener, FaShippingFast } from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';

export const slogans = [
  {
    id: 1,
    engName: 'Everyday fresh products',
    vniName: 'Sản phẩm tươi mỗi ngày',
    icon: <FaAirFreshener />,
  },
  {
    id: 2,
    engName: 'Free delivery for order over $70',
    vniName: 'Miễn phí vận chuyển cho đơn hàng trên 300k',
    icon: <FaShippingFast />,
  },
  {
    id: 3,
    engName: 'Daily Mega Discounts',
    vniName: 'Mã giảm giá mỗi ngày',
    icon: <RiCoupon3Line />,
  },
  {
    id: 4,
    engName: 'Best price on the market',
    vniName: 'Giá tốt nhất trên thị trường',
    icon: <AiOutlineDollar />,
  },
];
