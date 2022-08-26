import style from './not_found.module.scss';

export function Notfound() {
  return (
    <div className={style.not_found_wrapper}>
      <div className={style.not_found}>
        <h1>404 (Página não encontrada)</h1>
      </div>
    </div>
  );
}