import { useEffect } from 'react';
import { RiAddLine, IoReload } from 'react-icons/all';
import { Button } from '../../../components/button';
import { usePayments } from '../../../hooks/usePayments';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { formatMoney } from '../../../utils/formatMoney';
import { PaymentsTable } from './payments_table';
import style from './payments.module.scss';

export function Payments() {
  useScrollReveal();

  const { payments, fetchAllPayments } = usePayments();

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const total = payments.reduce((previous, current) => {
    return previous + current.price * current.installments;
  }, 0);

  return (
    <div className={`${style.payments} reveal`}>
      <div className={style.headerContainer}>
        <div className={style.headerTitleContainer}>
          <Button text="" icon={<IoReload size={22} />} onClick={() => fetchAllPayments()} />
          <h1 className={style.headerTitle}>Pagamentos</h1>
        </div>
        <Button text="Criar pagamento" icon={<RiAddLine size={22} />} />
      </div>
      <div className={style.table_wrapper}>
        <PaymentsTable data={payments} />
      </div>
      <h3>
        Total a receber:
        {' '}
        {formatMoney(total)}
      </h3>
    </div>
  );
}
