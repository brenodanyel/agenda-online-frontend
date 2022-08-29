import { ReactNode, forwardRef } from 'react';
import style from './button.module.scss';

type ButtonProps = {
  text: string;
  onClick?(): void;
  variant?: 'default' | 'outlined';
  disabled?: boolean,
  icon?: ReactNode,
  className?: string,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
      ref={ref}
    >
      {icon}
      {text}
    </button>
  );
});
