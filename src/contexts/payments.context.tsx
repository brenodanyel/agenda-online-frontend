import { createContext, useEffect, useState, ReactNode } from 'react';
import * as paymentsApi from '../services/payments.service';
import { useAuth } from '../hooks/useAuth';

type Payment = {
  customer: string,
  date: string,
  installments: number,
};

type PaymentsContextType = {
  payments: Payment[],
};

const defaultValue: PaymentsContextType = {
  payments: [],
};

export const PaymentsContext = createContext(defaultValue);

type PaymentsContextProviderProps = {
  children: ReactNode;
};

export const PaymentsContextProvider = (props: PaymentsContextProviderProps) => {
  const { children } = props;
  const { token } = useAuth();

  const [payments, setPayments] = useState(defaultValue.payments);

  useEffect(() => {
    const fetchAllPayments = async () => {
      if (!token) return;
      try {
        const payments = await paymentsApi.findByUser(token);
        console.log(payments);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllPayments();
  }, []);

  const value = {
    payments,
  };

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};
