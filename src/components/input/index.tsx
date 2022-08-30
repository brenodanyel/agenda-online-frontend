import style from './input.module.scss';

type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  errorLabel?: string;
  onChange(value: any): void;
};

export function Input(props: InputProps) {
  const {
    type = 'text',
    placeholder,
    value,
    errorLabel,
    onChange,
  } = props;

  return (
    <div className={style.input_wrapper}>
      <input
        className={style.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={0}
      />
      {
        errorLabel && (
          <span className={style.errorLabel}>{errorLabel}</span>
        )
      }
    </div>
  );
}
