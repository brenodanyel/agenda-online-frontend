import style from './button.module.scss';

type ButtonProps = {
  text: string;
  onClick?(): void;
  variant?: 'default' | 'outlined';
};

export function Button(props: ButtonProps) {
  const {
    text,
    onClick,
    variant = 'default',
  } = props;

  return (
    <button
      onClick={onClick}
      className={`${style.button} ${style[variant]}`}
    >
      {text}
    </button>
  );
}
