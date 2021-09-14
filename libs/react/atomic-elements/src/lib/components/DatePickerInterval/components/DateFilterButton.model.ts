import { DatePickerStateObject } from '../DatePickerInterval.model';

export interface DateFilterButtonProps {
  onClick: () => void;
  datePickerState: DatePickerStateObject;
  translate?: any;
}
