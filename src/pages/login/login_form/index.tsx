import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Checkbox } from '../../../components/checkbox';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

import style from './login_form.module.scss';

export function LoginForm() {
  useScrollReveal();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);

  const onClickLogin = () => {
    console.log({ username, password, keepConnected });
  };

  return (
    <div className={`${style.login_form} reveal`}>
      <span className={style.header}>Entrar</span>
      <Input
        value={username}
        placeholder="Nome de usuário"
        onChange={setUsername}
      />
      <Input
        type="password"
        value={password}
        placeholder="Senha"
        onChange={setPassword}
      />
      <Checkbox
        checked={keepConnected}
        onChange={setKeepConnected}
      >
        Me mantenha conectado
      </Checkbox>
      <Button
        onClick={onClickLogin}
        text="Entrar"
      />
      <Link to={"/register"}>
        <Button
          text="Criar Conta"
          variant="outlined"
        />
      </Link >
    </div>
  );
}