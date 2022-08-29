import { ReactNode } from 'react';
import style from './button.module.scss';

type ButtonProps = {
  text: string;
  onClick?(): void;
  variant?: 'default' | 'outlined';
  disabled?: boolean,
  icon?: ReactNode,
  className?: string,
};

export function Button(props: ButtonProps) {
  const {
    text,
    onClick,
    variant = 'default',
    disabled,
    icon,
    className,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`${style.button} ${style[variant]} ${className ?? ''}`}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}
