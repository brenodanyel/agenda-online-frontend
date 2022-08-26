import { createContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as auth from '../services/auth.service';

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
    try {
      const { username, password } = params;

      const loginToast = toast.loading('Entrando...');

      const result = await auth.signIn(username, password)
        .then((res) => {
          toast.success('Login efetuado com sucesso!');
          return res;
        })
        .catch((e) => {
          e?.response?.data?.error && toast.error(e.response.data.error);
        })
        .finally(() => {
          toast.remove(loginToast);
        });

      setUser(result.user);
      setToken(result.token);
      navigate('/');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const signUp = async (params: signUpParams) => {
    try {
      const { username, email, password } = params;
      const registerToast = toast.loading('Registrando...');

      const result = await auth.signUp(username, email, password)
        .then((res) => {
          toast.success('Conta criada com sucesso!');
          return res;
        })
        .catch((e) => {
          e?.response?.data?.error && toast.error(e.response.data.error);
        })
        .finally(() => {
          toast.remove(registerToast);
        });

      setUser(result.user);
      setToken(result.token);
      navigate('/');

    } catch (e: any) {
      console.log(e.message);
    }
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