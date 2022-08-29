import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../button';

import style from './header.module.scss';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className={style.header}>
      <div className={style.leftSide}>
        Agenda
      </div>
      <div className={style.rightSide}>
        <span>{user?.username}</span>
        <Button text="Sair" onClick={signOut} icon={<RiLogoutBoxRLine size={18} />} />
      </div>
    </header>
  );
}
