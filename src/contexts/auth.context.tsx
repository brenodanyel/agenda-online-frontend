import { createContext, ReactNode } from 'react';

type signInParams = {
  username: string;
  password: string;
};

type signUpParams = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  signIn(params: signInParams): Promise<void>;
  signUp(params: signUpParams): Promise<void>;
  signOut(): void;
};

const defaultValue: AuthContextType = {
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

  const signIn = async (params: signInParams) => {
    console.log(params);
  };

  const signUp = async (params: signUpParams) => {
    console.log(params);
  };

  const signOut = () => {

  };

  const value = {
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