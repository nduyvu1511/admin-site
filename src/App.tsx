import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RootState } from './core/store';
import MainRoutes from './layout/main/MainRoutes';
import PrivateRoute from './routers/PrivateRoute';
import Login from './view/auth/Login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="*" element={<MainRoutes />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
