import { BaseAutocomplete } from './base';
import { InputComponentProps } from '@kleeen/types';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';

export function SelectTextAutocomplete({
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
      format={format}
      formatType={formatType}
      options={autoCompleteValues}
      setSelectedOption={setSelectedOption}
      setValue={setValue}
      transformation={transformation}
      value={value}
      variant={'outlined'}
    />
  );
}
