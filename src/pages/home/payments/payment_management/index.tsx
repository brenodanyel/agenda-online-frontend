import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';

import style from './payment_management.module.scss';

type PaymentManagementProps = {
  isOpen: boolean;

  customer: string;
  setCustomer(e: any): void;

  installments: number;
  setInstallments(e: any): void;

  price: number;
  setPrice(e: any): void;

  onConfirm(customer: string, installments: number, price: number): void;

  title: string;
  onRequestClose(): void,
};

export function PaymentManagement(props: PaymentManagementProps) {
  const {
    isOpen,
    onConfirm,
    onRequestClose,
    customer,
    setCustomer,
    installments,
    setInstallments,
    price,
    setPrice,
    title,
  } = props;

  const hasCustomerError = () => {
    if (customer.length <= 5) return 'O nome do cliente deve ter pelo menos 5 caracteres';
  };

  const hasInstallmentsError = () => {
    if (installments <= 0) return 'O número de parcelas deve ser maior que zero';
  };

  const hasPriceError = () => {
    if (price <= 0) return 'O preço deve ser maior que zero';
  };

  const closeWindow = () => {
    onRequestClose();
  };

  const isButtonDisabled = () => {
    if (hasCustomerError()) return true;
    if (hasInstallmentsError()) return true;
    if (hasPriceError()) return true;
    return false;
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      overlayClassName={style.payment_management_overlay}
      className={style.payment_management}
      onRequestClose={closeWindow}
    >
      <span className={style.header}>{title}</span>
      <div className={style.form}>
        <label>
          Nome do cliente
          <Input
            onChange={setCustomer}
            value={customer}
            errorLabel={hasCustomerError()}
          />
        </label>
        <label>
          Numero de parcelas
          <Input
            onChange={setInstallments}
            value={String(installments)}
            type="number"
            errorLabel={hasInstallmentsError()}
          />
        </label>
        <label>
          Preço
          <Input
            onChange={setPrice}
            value={String(price)}
            type="number"
            errorLabel={hasPriceError()}
          />
        </label>
        <div className={style.buttonGroup}>
          <Button
            text='Confirmar'
            disabled={isButtonDisabled()}
            onClick={() => { onConfirm(customer, Number(installments), Number(price)); closeWindow(); }}
          />
          <Button
            text='Cancelar'
            variant="outlined"
            onClick={closeWindow}
          />
        </div>
      </div>
    </Modal>
  );
}
