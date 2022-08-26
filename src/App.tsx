import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/auth.context';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Notfound } from './pages/not_found';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </AuthContextProvider>
      <Toaster position='top-right' />
    </BrowserRouter>
  );
}
