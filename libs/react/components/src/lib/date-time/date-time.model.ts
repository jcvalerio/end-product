import moment from 'moment';

export interface DateTimeProps {
  label?: string;
  disabled?: boolean;
  defaultValue?: Date;
  variant?: string;
  translate?: (key: string) => string;
  handleOnChange: (date: moment.Moment) => void;
}
