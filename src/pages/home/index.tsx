import { Header } from '../../components/header';
import { Payments } from './payments';

import style from './home.module.scss';

export function Home() {
  return (
    <div className={style.home}>
      <Header />
      <Payments />
    </div>
  );
}
