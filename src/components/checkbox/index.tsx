import style from './checkbox.module.scss';

type CheckboxProps = {
  checked: boolean;
  text: string;
  onChange(value: any): void;
};

export function Checkbox(props: CheckboxProps) {
  const {
    checked,
    text,
    onChange,
  } = props;

  return (
    <label className={style.checkbox_label}>
      <input
        type="checkbox"
        className={style.checkbox}
        checked={checked}
        onChange={() => onChange((current: boolean) => !current)}
      />
      {text}
    </label>
  );
}