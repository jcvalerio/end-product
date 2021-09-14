import { IntervalDate } from '@kleeen/types';
import { DatePickerStateObject } from '../../DatePickerInterval.model';

export interface RelativeTimePickerProps {
  translate: (e: string) => string;
  handleOpenCustomRange: () => void;
  setRelativeDate: (e: IntervalDate) => void;
  datePickerState: DatePickerStateObject;
  handleCloseDateFilter: () => void;
  handleFilter?: () => void;
}
