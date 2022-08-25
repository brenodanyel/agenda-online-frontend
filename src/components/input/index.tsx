import style from './input.module.scss';

type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange(value: any): void;
};

export function Input(props: InputProps) {
  const {
    type = 'text',
    placeholder,
    value,
    onChange,
  } = props;

  return (
    <input
      className={style.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
