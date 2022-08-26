import style from './login.module.scss';
import { LoginForm } from './login_form';

export function Login() {
  return (
    <div className={style.login_wrapper}>
      <div className={style.login}>
        <span className={style.logo}>Agenda Online</span>
        <LoginForm />
      </div>
    </div >
  );
}
