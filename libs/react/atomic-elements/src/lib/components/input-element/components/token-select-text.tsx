import { BaseToken } from './base';
import { InputComponentProps } from '@kleeen/types';

export function TokenSelectText({
  autoCompleteValues,
  format,
  formatType,
  setSelectedOption,
  setValue,
  value,
}: InputComponentProps) {
  return (
    <BaseToken
      format={format}
      formatType={formatType}
      isAddable={false}
      options={autoCompleteValues}
      setSelectedOption={setSelectedOption}
      setValue={setValue}
      value={value}
    />
  );
}
