import { useState } from 'react';
import Modal from 'react-modal';

import { SendPasswordResetForm } from './send_password_reset_form';
import { PasswordResetForm } from './password_reset_form';
import style from './password_reset.module.scss';

type PasswordResetProps = {
  isOpen: boolean;
  onRequestClose(): void;
};

export function PasswordReset(props: PasswordResetProps) {
  const [codeSent, setCodeSent] = useState<string | null>(null);

  const {
    isOpen,
    onRequestClose,
  } = props;

  const close = () => {
    setCodeSent(null);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      overlayClassName={style.password_reset_overlay}
      className={style.password_reset}
      onRequestClose={close}
    >
      <div className={style.password_reset_wrapper}>
        {
          codeSent
            ? (
              <PasswordResetForm
                onRequestClose={close}
                username={codeSent}
              />
            )
            : (
              <SendPasswordResetForm
                onRequestClose={close}
                setCodeSent={setCodeSent}
              />
            )
        }
      </div>
    </Modal>
  );
}
