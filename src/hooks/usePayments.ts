import { useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';

import { PaymentsContext } from '../contexts/payments.context';
import { useAuth } from '../hooks/useAuth';
import * as paymentsApi from '../services/payments.service';

export const usePayments = () => {
  const { token } = useAuth();
  const { payments, setPayments } = useContext(PaymentsContext);

  const fetchAllPayments = async (range?: Range) => {
    if (!token) return;
    try {
      const payments = await paymentsApi.findByUser(token, range);
      setPayments(payments);
    } catch (e) {
      console.log(e);
    }
  };

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

  const addPayment = async (customer: string, date: Date, installments: number, price: number) => {
    if (!token) return;
    try {
      const payment = await paymentsApi.createByUser(token, customer, date, installments, price);
      setPayments((state) => {
        return [...state, payment];
      });
      toast.success('Pagamento adicionado com sucesso!');
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
    }
  };

  const editPayment = async (id: string, customer: string, date: Date, installments: number, price: number) => {
    if (!token) return;
    try {
      const payment = await paymentsApi.editByUser(token, id, customer, date, installments, price);
      setPayments((state) => {
        return state.map((_payment) => _payment.id == id ? payment : _payment);
      });
      toast.success('Pagamento editado com sucesso!');
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
    }
  };

  useEffect(() => {
    fetchAllPayments();
  }, []);

  return {
    payments,
    fetchAllPayments,
    removePayment,
    addPayment,
    editPayment,
  };
};
