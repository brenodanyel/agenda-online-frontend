import { createContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;

  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('token') ?? undefined);

  const value = {
    user, setUser,
    token, setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
