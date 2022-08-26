import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Checkbox } from '../../../components/checkbox';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

import style from './register_form.module.scss';

export function RegisterForm() {
  useScrollReveal();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [readTerms, setReadTerms] = useState(false);

  const onClickRegister = () => {
    console.log({ username, email, password, password2, readTerms });
  };

  return (
    <div className={`${style.register_form} reveal`}>
      <span className={style.header}>Criar conta</span>
      <Input
        value={username}
        placeholder="Nome de usuário"
        onChange={setUsername}
      />
      <Input
        value={email}
        placeholder="Email"
        onChange={setEmail}
      />
      <Input
        type="password"
        value={password}
        placeholder="Senha"
        onChange={setPassword}
      />
      <Input
        type="password"
        value={password2}
        placeholder="Confirmação da Senha"
        onChange={setPassword2}
      />
      <Checkbox
        checked={readTerms}
        onChange={setReadTerms}
        className={style.terms}
      >
        Li e aceito os
        {' '}
        <a className={style.link} href="">termos</a>
        {' '}
        e
        {' '}
        <a className={style.link} href="">politicas de privacidade</a>
      </Checkbox>
      <Button
        onClick={onClickRegister}
        text="Criar conta"
      />
      <Link to={"/login"}>
        <Button
          text="Ir para o login"
          variant="outlined"
        />
      </Link >
    </div>
  );
}