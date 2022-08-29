import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line, RiEdit2Line, MdOutlineCancel } from 'react-icons/all';
import { Payment } from '../../../../types/payment';
import { Button } from '../../../../components/button';
import { ConfirmationToast } from '../../../../components/confirmation_toast';
import { usePayments } from '../../../../hooks/usePayments';
import { formatMoney } from '../../../../utils/formatMoney';

import style from './payments_table.module.scss';
import { useEffect } from 'react';

type PaymentsTableProps = {
  data: Payment[];
};

export function PaymentsTable(props: PaymentsTableProps) {
  const { removePayment } = usePayments();

  const {
    data,
  } = props;

  const [activeToast, setActiveToast] = useState<string>();

  const onClickRemove = (id: string) => {
    if (activeToast) {
      toast.dismiss(activeToast);
    }

    const onConfirmRemove = async () => {
      await removePayment(id);
    };

    const t = toast((t) => (
      <ConfirmationToast
        t={t}
        title="Você tem certeza de que deseja remover este pagamento?"
        onConfirm={onConfirmRemove}
      />), { position: 'top-center', duration: 10000 });

    setActiveToast(t);
  };

  useEffect(() => () => {
    if (activeToast) {
      toast.dismiss(activeToast);
    }
  }, [activeToast]);

  return (
    <table className={style.table}>
      <colgroup>
        <col style={{ width: 'auto' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>

      <thead>
        <tr>
          <th>Cliente</th>
          <th>Parcelas Restantes</th>
          <th>Valor Mensal</th>
          <th>Valor Total</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        {
          data.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.customer}</td>
              <td>{payment.installments}</td>
              <td>{formatMoney(payment.price)}</td>
              <td>{formatMoney(payment.price * payment.installments)}</td>
              <td>
                <div className={style.action}>
                  <Button text="Editar" icon={<RiEdit2Line size={22} />} />
                  <Button
                    text="Excluir"
                    icon={<RiDeleteBin6Line size={22} />}
                    onClick={() => onClickRemove(payment.id)}
                  />
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>

    </table>
  );
}
