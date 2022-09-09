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
  sendPasswordResetCode(username: string): Promise<void>;
  resetPassword(username: string, password: string, code: string): Promise<void>;
};

const defaultValue: AuthContextType = {
  user: null,
  token: localStorage.getItem('token'),
  signIn: async () => { },
  signUp: async () => { },
  signOut: () => { },
  sendPasswordResetCode: async () => { },
  resetPassword: async () => { },
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
          toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
        })
        .finally(() => {
          toast.remove(loginToast);
        });

      if (!result?.user) return;
      if (!result?.token) return;

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
          toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
        })
        .finally(() => {
          toast.remove(registerToast);
        });

      if (!result?.user) return;
      if (!result?.token) return;

      setUser(result.user);
      setToken(result.token);
      navigate('/');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const sendPasswordResetCode = async (username: string) => {
    return auth.sendPasswordResetCode(username);
  };

  const resetPassword = async (username: string, password: string, code: string) => {
    return auth.resetPassword(username, password, code);
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
        const result = await auth.verify(token);
        if (!result?.user) throw new Error('unexpected response');
        setUser(result.user);
      } catch (e: any) {
        console.log(e.message);
        setUser(null);
        setToken(null);
        navigate('/login');
      }
    };

    verifyToken();
  }, [location, token]);

  // sync token state with localStorage
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
    sendPasswordResetCode,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
