import { useState } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Checkbox } from '../../../components/checkbox';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { useAuth } from '../../../hooks/useAuth';

import style from './register_form.module.scss';

export function RegisterForm() {
  useScrollReveal();
  const { signUp } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [readTerms, setReadTerms] = useState(false);

  const hasUsernameError = () => {
    if (username.length <= 5) return 'O nome de usuário deve ter entre 5 e 15 caracteres';
  };

  const hasEmailError = () => {
    if (!validator.isEmail(email)) return 'Insira um e-mail válido';
  };

  const hasPasswordError = () => {
    if (password.length <= 5) return 'A senha deve ter pelo menos 5 caracteres';
  };

  const hasPassword2Error = () => {
    if (password2 !== password) return 'As senhas não coincidem';
  };

  const isButtonDisabled = () => {
    if (hasUsernameError()) return true;
    if (hasEmailError()) return true;
    if (hasPasswordError()) return true;
    if (hasPassword2Error()) return true;
    if (!readTerms) return true;
    return false;
  };

  const onClickRegister = () => {
    signUp({ username, email, password });
  };

  return (
    <div className={`${style.register_form} reveal`}>
      <span className={style.header}>Criar conta</span>
      <Input
        value={username}
        placeholder={"Nome de usuário"}
        errorLabel={hasUsernameError()}
        onChange={setUsername}
      />
      <Input
        value={email}
        placeholder="Email"
        onChange={setEmail}
        errorLabel={hasEmailError()}
      />
      <Input
        type="password"
        value={password}
        placeholder="Senha"
        onChange={setPassword}
        errorLabel={hasPasswordError()}
      />
      <Input
        type="password"
        value={password2}
        placeholder="Confirmação da Senha"
        onChange={setPassword2}
        errorLabel={hasPassword2Error()}
      />
      <Checkbox
        checked={readTerms}
        onChange={setReadTerms}
        className={style.terms}
      >
        Li e aceito os
        {' '}
        <a className={style.link} href="">termos.</a>
      </Checkbox>
      <Button
        onClick={onClickRegister}
        text="Criar conta"
        disabled={isButtonDisabled()}
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