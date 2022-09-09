import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { useAuth } from '../../../../hooks/useAuth';

import style from './password_reset.module.scss';

type PasswordResetFormProps = {
  onRequestClose(): void;
  username: string,
};

export function PasswordResetForm(props: PasswordResetFormProps) {
  const {
    onRequestClose,
    username,
  } = props;

  const { resetPassword } = useAuth();

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const hasCodeError = () => {
    if (code.length <= 4) return 'O código deve ter pelo menos 4 caracteres';
  };

  const hasPasswordError = () => {
    if (password.length <= 5) return 'A senha deve ter pelo menos 5 caracteres';
  };

  const isButtonDisabled = () => {
    if (hasCodeError()) return true;
    if (hasPasswordError()) return true;

    return false;
  };

  const onClickPasswordReset = async () => {
    try {
      await resetPassword(username, password, code);
      onRequestClose();
      toast.success('Senha alterada com sucesso!');
    } catch (e: any) {
      toast.error(e?.response?.data?.error ?? 'Erro desconhecido');
    }
  };

  return (
    <>
      <span className={style.row}>
        <p>
          Se {` "${username}" `} realmente pertencer a uma conta, o código será enviado para o e-mail cadastrado dentro de alguns segundos...
        </p>
        <span className={style.row}>
          <Input
            placeholder='Código recebido no e-mail'
            onChange={setCode}
            value={code}
            errorLabel={hasCodeError()}
          />
          <Input
            placeholder='Nova senha'
            onChange={setPassword}
            value={password}
            type="password"
            errorLabel={hasPasswordError()}
          />
        </span>
      </span>
      <span className={style.row}>
        <Button
          text='Confirmar'
          disabled={isButtonDisabled()}
          onClick={onClickPasswordReset}
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
