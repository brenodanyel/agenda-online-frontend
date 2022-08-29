import { RiAddLine } from 'react-icons/ri';
import { Button } from '../../../components/button';
import { usePayments } from '../../../hooks/usePayments';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { formatMoney } from '../../../utils/formatMoney';
import { PaymentsTable } from './payments_table';
import style from './payments.module.scss';

export function Payments() {
  useScrollReveal();

  const { payments } = usePayments();

  const total = payments.reduce((previous, current) => {
    return previous + current.price * current.installments;
  }, 0);

  return (
    <div className={`${style.payments} reveal`}>
      <div className={style.headerContainer}>
        <h1 className={style.header}>Pagamentos</h1>
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
