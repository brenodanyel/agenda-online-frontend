import { createContext, useState, ReactNode } from 'react';
import { Payment } from '../types/payment';

type PaymentsContextType = {
  payments: Payment[],
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
};

const defaultValue: PaymentsContextType = {
  payments: [],
  setPayments() { },
};

export const PaymentsContext = createContext(defaultValue);

type PaymentsContextProviderProps = {
  children: ReactNode;
};

export const PaymentsContextProvider = (props: PaymentsContextProviderProps) => {
  const { children } = props;

  const [payments, setPayments] = useState(defaultValue.payments);

  const value = {
    payments, setPayments,
  };

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};
