import { createContext, useEffect, useState, ReactNode } from 'react';
import * as paymentsApi from '../services/payments.service';
import { useAuth } from '../hooks/useAuth';
import { Payment } from '../types/payment';

type PaymentsContextType = {
  payments: Payment[],
  removePayment(id: string): Promise<void>;
};

const defaultValue: PaymentsContextType = {
  payments: [],
  removePayment: async () => { },
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
        setPayments(payments);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllPayments();
  }, []);

  const removePayment = async (id: string) => {
    // todo: await response from server
    setPayments((state) => {
      return state.filter((payment) => payment.id !== id);
    });
  };

  const value = {
    payments,
    removePayment,
  };

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};
