import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../core/store';

const PrivateRoute = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
