import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../core/store';

const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.user);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
