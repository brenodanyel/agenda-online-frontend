import { RiDeleteBin6Line, RiEdit2Line, MdOutlineCancel } from 'react-icons/all';
import { Payment } from '../../../../types/payment';
import { Button } from '../../../../components/button';
import { formatMoney } from '../../../../utils/formatMoney';
import { monthDiff, clamp } from '../../../../utils/math';

import style from './payments_table.module.scss';

type PaymentsTableProps = {
  data: Payment[];
  onClickEdit(id: string): void;
  onClickRemove(id: string): void;
};

export function PaymentsTable(props: PaymentsTableProps) {
  const {
    data,
    onClickEdit,
    onClickRemove,
  } = props;

  return (
    <table className={style.table}>
      <colgroup>
        <col style={{ width: 'auto' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>

      <thead>
        <tr>
          <th>Cliente</th>
          <th>Data da primeira parcela</th>
          <th>Parcelas pagas</th>
          <th>Data da última parcela</th>
          <th>Valor da parcela</th>
          <th>Valor Total</th>
          <th>Ação</th>
        </tr>
      </thead>

      <tbody>
        {
          data.map((payment) => {
            const today = new Date();
            const paymentDate = new Date(payment.date);
            const endPaymentDate = new Date(payment.date);
            endPaymentDate.setMonth(endPaymentDate.getMonth() + payment.installments);

            const diff = monthDiff(today, endPaymentDate);

            return (
              <tr key={payment.id}>
                <td>{payment.customer}</td>
                <td>{paymentDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>{`${clamp(payment.installments - diff, 0, payment.installments)}/${payment.installments}`}</td>
                <td>{endPaymentDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>{formatMoney(payment.price)}</td>
                <td>{formatMoney(payment.price * payment.installments)}</td>
                <td>
                  <div className={style.action}>
                    <Button
                      text="Editar"
                      icon={<RiEdit2Line size={22} />}
                      onClick={() => onClickEdit(payment.id)}
                    />
                    <Button
                      text="Excluir"
                      icon={<RiDeleteBin6Line size={22} />}
                      onClick={() => onClickRemove(payment.id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })
        }
      </tbody>

    </table>
  );
}
