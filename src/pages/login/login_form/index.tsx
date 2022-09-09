import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Checkbox } from '../../../components/checkbox';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { useAuth } from '../../../hooks/useAuth';
import { PasswordReset } from './password_reset';

import style from './login_form.module.scss';

export function LoginForm() {
  useScrollReveal();
  const { signIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);
  const [isPasswordResetActive, setPasswordResetActive] = useState(false);

  const hasUsernameError = () => {
    if (username.length <= 5) return 'O nome de usuário deve ter entre 5 e 15 caracteres';
  };

  const hasPasswordError = () => {
    if (password.length <= 5) return 'A senha deve ter pelo menos 5 caracteres';
  };

  const isButtonDisabled = () => {
    if (hasUsernameError()) return true;
    if (hasPasswordError()) return true;
    return false;
  };

  const onClickLogin = () => {
    signIn({ username, password });
  };

  return (
    <>
      <div className={`${style.login_form} reveal`}>
        <span className={style.header}>Entrar</span>
        <Input
          value={username}
          placeholder="Nome de usuário"
          errorLabel={hasUsernameError()}
          onChange={setUsername}
        />
        <Input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={setPassword}
          errorLabel={hasPasswordError()}
        />
        <span className={style.row}>
          <Checkbox
            checked={keepConnected}
            onChange={setKeepConnected}
          >
            Me mantenha conectado
          </Checkbox>
          <Button
            text='Esqueci minha senha'
            variant='link'
            onClick={() => setPasswordResetActive((state) => !state)}
          />
        </span>
        <span className={style.row}>
          <Button
            onClick={onClickLogin}
            text="Entrar"
            disabled={isButtonDisabled()}
          />
          <Link to={"/register"}>
            <Button
              text="Criar Conta"
              variant="outlined"
            />
          </Link>
        </span>
      </div>
      <PasswordReset
        isOpen={isPasswordResetActive}
        onRequestClose={() => setPasswordResetActive(false)}
      />
    </>
  );
}