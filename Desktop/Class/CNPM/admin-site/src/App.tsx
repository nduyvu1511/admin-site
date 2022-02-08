import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderContainer from './layout/header/HeaderContainer';
import MainContainer from './layout/main/MainContainer';

function App() {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <MainContainer />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
