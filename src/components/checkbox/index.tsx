import { ReactNode } from 'react';
import style from './checkbox.module.scss';

type CheckboxProps = {
  checked: boolean;
  children: ReactNode;
  className?: string;
  onChange(value: any): void;
};

export function Checkbox(props: CheckboxProps) {
  const {
    checked,
    children,
    onChange,
    className,
  } = props;

  return (
    <label className={`${style.checkbox_label} ${className ?? ''}`}>
      <input
        type="checkbox"
        className={style.checkbox}
        checked={checked}
        onChange={() => onChange((current: boolean) => !current)}
      />
      {children}
    </label>
  );
}