import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import style from './dropdown.module.scss';

type DropdownProps = {
  items: { title: string, value: any; }[];
  selected?: any;
  setSelected(id: any): void;
};

export function Dropdown(props: DropdownProps) {
  const {
    items,
    selected,
    setSelected,
  } = props;

  const [active, setActive] = useState(false);

  const getSelectedText = () => {
    const result = selected && items.find((item) => item.value === selected);
    return result?.title ?? '';
  };

  useEffect(() => {
    setActive(false);
  }, [selected]);

  return (
    <div className={style.dropdown_wrapper}>
      <div
        className={`${style.dropdown} ${active ? style.active : ''}`}
        onClick={() => setActive((state) => items.length > 0 && !state)}
      >
        <span>{getSelectedText()}</span>
        <IoIosArrowDown className={style.arrow} />
      </div>
      {active && (
        <div className={style.options_container}>
          {
            items.map((item) => (
              <span
                key={item.value}
                className={style.option}
                onClick={() => setSelected(item.value)}
              >
                {item.title}
              </span>
            ))
          }
        </div>
      )}
    </div>
  );
}
