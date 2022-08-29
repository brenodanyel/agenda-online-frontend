import { useContext } from 'react';
import { PaymentsContext } from '../contexts/payments.context';

export const usePayments = () => useContext(PaymentsContext);
