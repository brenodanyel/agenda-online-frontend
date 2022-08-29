import { createContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import * as paymentsApi from '../services/payments.service';
import { useAuth } from '../hooks/useAuth';
import { Payment } from '../types/payment';

type PaymentsContextType = {
  payments: Payment[],
  fetchAllPayments(): Promise<void>;
  removePayment(id: string): Promise<void>;
};

const defaultValue: PaymentsContextType = {
  payments: [],
  fetchAllPayments: async () => { },
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

  const fetchAllPayments = async () => {
    if (!token) return;
    try {
      const payments = await paymentsApi.findByUser(token);
      setPayments(payments);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const removePayment = async (id: string) => {
    if (!token) return;
    try {
      await paymentsApi.deleteByUser(token, id);
      setPayments((state) => {
        return state.filter((payment) => payment.id !== id);
      });
      toast.success('Pagamento removido com sucesso!');
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
    }
  };

  const value = {
    payments,
    fetchAllPayments,
    removePayment,
  };

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};
