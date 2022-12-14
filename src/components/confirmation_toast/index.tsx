import { useEffect, useRef } from 'react';
import { toast, Toast } from 'react-hot-toast';
import { RiDeleteBin6Line, MdOutlineCancel } from 'react-icons/all';
import { Button } from '../button';

import style from './confirmation_toast.module.scss';

type ConfirmationToastProps = {
  t: Toast,
  title: string,
  onConfirm?(): void,
  onCancel?(): void,
};

export function ConfirmationToast(props: ConfirmationToastProps) {
  const {
    t,
    title,
    onConfirm,
    onCancel,
  } = props;

  const confirmation = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    confirmation?.current?.focus();
  }, [confirmation.current]);

  return (
    <div className={style.confirmationToast}>
      <span>{title}</span>
      <div className={style.buttonsContainer}>
        <Button
          ref={confirmation}
          text='Confirmar'
          icon={<RiDeleteBin6Line />}
          onClick={() => { onConfirm && onConfirm(); toast.dismiss(t.id); }}
        />
        <Button
          text='Cancelar'
          icon={<MdOutlineCancel />}
          onClick={() => { onCancel && onCancel(); toast.dismiss(t.id); }}
        />
      </div>
    </div>
  );
}