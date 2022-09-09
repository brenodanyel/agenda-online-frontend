import { useState } from 'react';
import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import Modal from 'react-modal';
import { ptBR } from 'date-fns/locale';
import { Button } from '../../../../components/button';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import style from './range_filter.module.scss';

type RangeFilterProps = {
  isOpen: boolean;
  onRequestClose(): void;
  onSelectInterval(selection: Range): void;
};

export function RangeFilter(props: RangeFilterProps) {
  const {
    isOpen,
    onRequestClose,
    onSelectInterval,
  } = props;

  const [ranges, setRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setRanges([selection]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.range_filter_overlay}
    >
      <div className={style.range_filter}>
        <DateRange
          ranges={ranges}
          onChange={handleChange}
          locale={ptBR}
          dateDisplayFormat="dd/MM/yyyy"
          editableDateInputs={true}
          moveRangeOnFirstSelection={true}
          retainEndDateOnFirstSelection={true}
        />
        <div className={style.buttons_container}>
          <Button
            text="Confirmar"
            onClick={() => { onSelectInterval(ranges[0]); onRequestClose(); }}
          />
          <Button
            text="Cancelar"
            variant='outlined'
            onClick={onRequestClose}
          />
        </div>
      </div>
    </Modal>
  );
};;