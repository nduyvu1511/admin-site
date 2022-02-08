import {
  RiLockLine,
  RiLogoutBoxRLine,
  RiMessage2Line,
  RiUser3Line,
} from 'react-icons/ri';

export const userOptions = [
  {
    id: 1,
    icon: <RiUser3Line className="text-lg" />,
    name: 'Profile',
  },
  {
    id: 2,
    icon: <RiMessage2Line className="text-lg" />,
    name: 'Inbox',
  },
  {
    id: 3,
    icon: <RiLockLine className="text-lg" />,
    name: 'Lock Screen',
  },
  {
    id: 4,
    icon: <RiLogoutBoxRLine className="text-lg" />,
    name: 'Sign Out',
  },
];
