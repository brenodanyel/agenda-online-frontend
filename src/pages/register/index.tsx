import style from './register.module.scss';
import { RegisterForm } from './register_form';

export function Register() {
  return (
    <div className={style.register_wrapper}>
      <div className={style.register}>
        <span className={style.logo}>Agenda Online</span>
        <RegisterForm />
      </div>
    </div >
  );
}
