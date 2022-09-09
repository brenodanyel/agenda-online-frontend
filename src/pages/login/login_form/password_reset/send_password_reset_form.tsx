import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { useAuth } from '../../../../hooks/useAuth';

import style from './password_reset.module.scss';

type SendPasswordResetFormProps = {
  onRequestClose(): void;
  setCodeSent(usename: string): void;
};

export function SendPasswordResetForm(props: SendPasswordResetFormProps) {
  const {
    onRequestClose,
    setCodeSent,
  } = props;

  const { sendPasswordResetCode } = useAuth();
  const [username, setUsername] = useState('');

  const hasUsernameError = () => {
    if (username.length <= 5) return 'O nome de usuário deve ter pelo menos 5 caracteres';
  };

  const isButtonDisabled = () => {
    if (hasUsernameError()) return true;

    return false;
  };

  const onClickSendPasswordResetCode = async () => {
    try {
      await sendPasswordResetCode(username);
      setCodeSent(username);
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
    }
  };

  return (
    <>
      <span className={style.row}>
        <p>Digite abaixo o nome de usuário cadastrado no sistema para criar uma nova senha</p>
        <Input
          placeholder='Nome de usuário'
          onChange={setUsername}
          value={username}
          errorLabel={hasUsernameError()}
        />
      </span>
      <span className={style.row}>
        <Button
          text='Enviar'
          disabled={isButtonDisabled()}
          onClick={onClickSendPasswordResetCode}
        />
        <Button
          text='Cancelar'
          onClick={onRequestClose}
          variant='outlined'
        />
      </span>
    </>
  );
}
