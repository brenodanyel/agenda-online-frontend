import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiAddLine, IoReload } from 'react-icons/all';
import { Range } from 'react-date-range';
import { Button } from '../../../components/button';
import { Checkbox } from '../../../components/checkbox';
import { usePayments } from '../../../hooks/usePayments';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { formatMoney } from '../../../utils/formatMoney';
import { PaymentsTable } from './payments_table';
import { PaymentManagement } from './payment_management';
import { RangeFilter } from './range_filter';
import style from './payments.module.scss';

export function Payments() {
  useScrollReveal();

  const [activeToast, setActiveToast] = useState<string | undefined>();

  const [isManagePaymentVisible, setManagePaymentVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<string | undefined>();

  const [managePaymentCustomer, setManagePaymentCustomer] = useState('');
  const [managePaymentDate, setManagePaymentDate] = useState(new Date());
  const [managePaymentInstallment, setManagePaymentInstallment] = useState(0);
  const [managePaymentPrice, setManagePaymentPrice] = useState(0);

  const [activeFilter, setFilterActive] = useState<Range | undefined>();
  const [isModalFilterActive, setModalFilterActive] = useState(false);

  useEffect(() => {
    fetchAllPayments(activeFilter);
  }, []);

  useEffect(() => () => {
    if (activeToast) {
      toast.dismiss(activeToast);
    }
  }, [activeToast]);

  const onClickAdd = () => {
    setEditingPayment(undefined);
    setManagePaymentCustomer('');
    setManagePaymentDate(new Date());
    setManagePaymentInstallment(0);
    setManagePaymentPrice(0);
    setManagePaymentVisible(true);
  };

  const onConfirmAddPayment = async (customer: string, date: Date, installments: number, price: number) => {
    await addPayment(customer, date, installments, price);
    setManagePaymentVisible(false);
  };

  const onConfirmEditPayment = async (customer: string, date: Date, installments: number, price: number) => {
    if (!editingPayment) return;
    await editPayment(editingPayment, customer, date, installments, price);
    setManagePaymentVisible(false);
  };

  const onClickEdit = (id: string) => {
    const payment = payments.find((payment) => payment.id === id);
    if (!payment) return;
    setManagePaymentCustomer(payment.customer);
    setManagePaymentDate(new Date(payment.date));
    setManagePaymentInstallment(payment.installments);
    setManagePaymentPrice(payment.price);
    setEditingPayment(payment.id);
    setManagePaymentVisible(true);
  };

  const onClickToggleFilter = () => {
    if (activeFilter) return setFilterActive(undefined);
    setModalFilterActive(true);
  };

  const onSelectInterval = (range: Range) => {
    setFilterActive(range);
  };

  const total = payments.reduce((previous, current) => {
    return previous + current.price * current.installments;
  }, 0);

  const getIntervalString = () => {
    if (!activeFilter?.startDate) return;
    if (!activeFilter?.endDate) return;
    const startDate = new Date(activeFilter.startDate).toLocaleDateString('pt-BR');
    const endDate = new Date(activeFilter.endDate).toLocaleDateString('pt-BR');
    return `(${startDate} - ${endDate})`;
  };

  useEffect(() => {
    fetchAllPayments(activeFilter);
  }, [activeFilter?.key]);

  return (
    <div className={`${style.payments} reveal`}>
      <div className={style.headerContainer}>
        <div className={style.headerTitleContainer}>
          <Button
            text=""
            icon={<IoReload size={22} />}
            onClick={() => fetchAllPayments(activeFilter)}
          />
          <div>
            <h1 className={style.headerTitle}>Pagamentos</h1>
            <Checkbox
              checked={!!activeFilter}
              onChange={onClickToggleFilter}
            >
              <span>
                Filtrar por intervalo {getIntervalString()}
              </span>
            </Checkbox>
            <RangeFilter
              isOpen={isModalFilterActive}
              onRequestClose={() => setModalFilterActive(false)}
              onSelectInterval={onSelectInterval}
            />
          </div>
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

        paymentDate={managePaymentDate}
        setPaymentDate={setManagePaymentDate}

        installments={managePaymentInstallment}
        setInstallments={setManagePaymentInstallment}

        price={managePaymentPrice}
        setPrice={setManagePaymentPrice}
      />
    </div>
  );
}
