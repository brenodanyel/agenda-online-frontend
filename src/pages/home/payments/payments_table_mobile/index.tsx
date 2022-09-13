import { useState } from 'react';
import { RiDeleteBin6Line, RiEdit2Line, RiArrowDownSLine } from 'react-icons/all';
import { Payment as PaymentType } from '../../../../types/payment';
import { formatMoney } from '../../../../utils/formatMoney';
import { monthDiff, clamp } from '../../../../utils/math';
import { Button } from '../../../../components/button';

import style from './payments_table_mobile.module.scss';

type PaymentsTableMobileProps = {
  data: PaymentType[];
  onClickEdit(id: string): void;
  onClickRemove(id: string): void;
};

type PaymentProps = {
  payment: PaymentType;
  onClickEdit(id: string): void;
  onClickRemove(id: string): void;
};

const Payment = (props: PaymentProps) => {
  const { payment, onClickEdit, onClickRemove } = props;

  const [expanded, setExpanded] = useState(false);

  const today = new Date();
  const paymentDate = new Date(payment.date);
  const endPaymentDate = new Date(payment.date);
  endPaymentDate.setMonth(endPaymentDate.getMonth() + payment.installments);

  const diff = monthDiff(today, endPaymentDate);

  const formatDate = (date: Date) => date.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={style.payment}>
      <div className={style.info}>
        <div className={style.row}>
          <span>Cliente:</span>
          <span>{payment.customer}</span>
        </div>
        <div className={style.row}>
          <span>Parcelas pagas:</span>
          <span>{`${clamp(payment.installments - diff, 0, payment.installments)}/${payment.installments}`}</span>
        </div>
        <div className={style.row}>
          <span>Valor da parcela:</span>
          <span>{formatMoney(payment.price)}</span>
        </div>
        {
          expanded && (
            <>
              <div className={style.row}>
                <span>Data da primeira parcela:</span>
                <span>{formatDate(paymentDate)}</span>
              </div>
              <div className={style.row}>
                <span>Data da última parcela:</span>
                <span>{formatDate(endPaymentDate)}</span>
              </div>
              <div className={style.row}>
                <span>Valor Total:</span>
                <span>{formatMoney(payment.price * payment.installments)}</span>
              </div>
            </>
          )
        }
      </div>
      {
        expanded && (
          <div className={style.action}>
            <>
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
            </>
          </div>
        )
      }
      <Button
        className={style.expand_button}
        text=""
        icon={<RiArrowDownSLine size={22} className={`${style.expand_icon} ${expanded ? style.expanded : ''}`} />}
        onClick={() => setExpanded((state) => !state)}
      />
    </div>
  );
};

export function PaymentsTableMobile(props: PaymentsTableMobileProps) {
  const { data, onClickEdit, onClickRemove } = props;

  return (
    <div className={style.container}>
      {
        data.map((payment) => (
          <Payment
            key={payment.id}
            payment={payment}
            onClickEdit={onClickEdit}
            onClickRemove={onClickRemove}
          />
        ))
      }
    </div>
  );
}