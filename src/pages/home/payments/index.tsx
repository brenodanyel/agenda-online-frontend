import { useEffect, useState } from 'react';
import { RiAddLine, IoReload } from 'react-icons/all';
import { Button } from '../../../components/button';
import { usePayments } from '../../../hooks/usePayments';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { formatMoney } from '../../../utils/formatMoney';
import { PaymentsTable } from './payments_table';
import { PaymentManagement } from './payment_management';
import style from './payments.module.scss';

export function Payments() {
  useScrollReveal();

  const { payments, fetchAllPayments, addPayment, editPayment } = usePayments();
  const [isManagePaymentVisible, setManagePaymentVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<string | undefined>();

  const [managePaymentCustomer, setManagePaymentCustomer] = useState('');
  const [managePaymentInstallment, setManagePaymentInstallment] = useState(0);
  const [managePaymentPrice, setManagePaymentPrice] = useState(0);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const onClickAdd = () => {
    setEditingPayment(undefined);
    setManagePaymentCustomer('');
    setManagePaymentInstallment(0);
    setManagePaymentPrice(0);
    setManagePaymentVisible(true);
  };

  const onConfirmAddPayment = async (customer: string, installments: number, price: number) => {
    await addPayment(customer, installments, price);
    setManagePaymentVisible(false);
  };

  const onConfirmEditPayment = async (customer: string, installments: number, price: number) => {
    if (!editingPayment) return;
    await editPayment(editingPayment, customer, installments, price);
    setManagePaymentVisible(false);
  };

  const onClickEdit = (id: string) => {
    const payment = payments.find((payment) => payment.id === id);
    if (!payment) return;
    setManagePaymentCustomer(payment.customer);
    setManagePaymentInstallment(payment.installments);
    setManagePaymentPrice(payment.price);
    setEditingPayment(payment.id);
    setManagePaymentVisible(true);
  };

  const total = payments.reduce((previous, current) => {
    return previous + current.price * current.installments;
  }, 0);

  return (
    <div className={`${style.payments} reveal`}>
      <div className={style.headerContainer}>
        <div className={style.headerTitleContainer}>
          <Button
            text=""
            icon={<IoReload size={22} />}
            onClick={() => fetchAllPayments()}
          />
          <h1 className={style.headerTitle}>Pagamentos</h1>
        </div>
        <Button
          text="Criar pagamento"
          icon={<RiAddLine size={22} />}
          onClick={onClickAdd}
        />
      </div>
      <div className={style.table_wrapper}>
        <PaymentsTable
          data={payments.sort((a, b) => new Date(b.date).getMilliseconds() - new Date(a.date).getMilliseconds())}
          onClickEdit={onClickEdit}
        />
      </div>
      <h3>
        Total a receber:
        {' '}
        {formatMoney(total)}
      </h3>
      <PaymentManagement
        isOpen={isManagePaymentVisible}
        onRequestClose={() => setManagePaymentVisible(false)}
        onConfirm={editingPayment ? onConfirmEditPayment : onConfirmAddPayment}

        title={editingPayment ? 'Editar pagamento' : 'Adicionar pagamento'}

        customer={managePaymentCustomer}
        setCustomer={setManagePaymentCustomer}

        installments={managePaymentInstallment}
        setInstallments={setManagePaymentInstallment}

        price={managePaymentPrice}
        setPrice={setManagePaymentPrice}
      />
    </div>
  );
}
