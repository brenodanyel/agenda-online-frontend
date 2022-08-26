import { createContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

type signInParams = {
  username: string;
  password: string;
};

type signUpParams = {
  username: string;
  email: string;
  password: string;
};

type user = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: user | null;
  token: string | null;
  signIn(params: signInParams): Promise<void>;
  signUp(params: signUpParams): Promise<void>;
  signOut(): void;
};

const defaultValue: AuthContextType = {
  user: null,
  token: localStorage.getItem('token'),
  signIn: async () => { },
  signUp: async () => { },
  signOut: () => { },
};

export const AuthContext = createContext(defaultValue);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(defaultValue.user);
  const [token, setToken] = useState(defaultValue.token);

  const signIn = async (params: signInParams) => {
    console.log(params);
    toast.success('Login efetuado com sucesso');
  };

  const signUp = async (params: signUpParams) => {
    console.log(params);
    toast.success('Conta criada com sucesso');
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (['/login', '/register'].includes(pathname)) return;

    const verifyToken = async () => {
      try {
        if (!token) throw new Error('token is missing');
        // todo: make a request to back-end, verify token and replace the user prop
      } catch (e: any) {
        console.log(e.message);
        setUser(null);
        setToken(null);
        navigate('/login');
      }
    };

    verifyToken();
  }, [location, token]);

  // sync token prop with localStorage
  useEffect(() => {
    token
      ? localStorage.setItem('token', token)
      : localStorage.removeItem('token');
  }, [token]);

  const value = {
    user,
    token,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};