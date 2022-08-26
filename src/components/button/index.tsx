import style from './button.module.scss';

type ButtonProps = {
  text: string;
  onClick?(): void;
  variant?: 'default' | 'outlined';
  disabled?: boolean,
};

export function Button(props: ButtonProps) {
  const {
    text,
    onClick,
    variant = 'default',
    disabled,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`${style.button} ${style[variant]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
