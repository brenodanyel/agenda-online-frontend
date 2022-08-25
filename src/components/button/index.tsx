import style from './button.module.scss';

type ButtonProps = {
  text: string;
  onClick(): void;
};

export function Button(props: ButtonProps) {
  const {
    text,
    onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      className={style.button}
    >
      {text}
    </button>
  );
}
