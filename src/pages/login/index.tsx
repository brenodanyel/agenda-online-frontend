import style from './login.module.scss';
import { LoginForm } from './login_form';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function Login() {
  useScrollReveal();

  return (
    <div className={style.login_wrapper}>
      <div className={style.login}>
        <span className={`${style.logo} reveal`}>Softeo <br />Tecnologia</span>
        <LoginForm />
      </div>
    </div >
  );
}
