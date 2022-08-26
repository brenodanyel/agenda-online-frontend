import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
