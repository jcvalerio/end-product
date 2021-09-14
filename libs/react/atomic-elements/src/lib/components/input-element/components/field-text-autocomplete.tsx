import { BaseAutocomplete } from './base';
import { InputComponentProps } from '@kleeen/types';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';

export function FieldTextAutocomplete({
  autoCompleteValues,
  format,
  formatType,
  setSelectedOption,
  setValue,
  transformation,
  value,
}: InputComponentProps) {
  const color = getColorForSeverityValues(value, format, transformation);

  return (
    <BaseAutocomplete
      color={color}
      freeSolo={true}
      format={format}
      formatType={formatType}
      options={autoCompleteValues}
      setSelectedOption={setSelectedOption}
      setValue={setValue}
      transformation={transformation}
      value={value}
      variant={'standard'}
    />
  );
}
