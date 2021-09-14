import { DateTime } from '@kleeen/react/components';
import { InputComponentProps } from '@kleeen/types';
import { Moment } from 'moment';
import { convertToServerTimezone } from '@kleeen/i18n';

export function DateTimePicker({ setValue, value }: InputComponentProps) {
  return (
    <DateTime
      defaultValue={value}
      handleOnChange={(newValue: Moment) => {
        setValue(convertToServerTimezone(newValue));
      }}
      label={''} // TODO: @cafe set this as optional
    />
  );
}
