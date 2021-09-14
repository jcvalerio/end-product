import { InputComponentProps, ListItem } from '@kleeen/types';

import { CheckBoxGroup as BaseCheckBoxGroup } from '@kleeen/react/components';

export function CheckBoxGroup({
  autoCompleteValues,
  setSelectedOption,
  setValue,
  value,
}: InputComponentProps) {
  const options = {
    data: autoCompleteValues,
    isLoading: false,
  };

  return (
    <BaseCheckBoxGroup
      initialCheckedValues={value}
      onChange={(newValues: ListItem[]) => {
        setSelectedOption(newValues);
        setValue(newValues);
      }}
      options={options} // TODO: @cafe remove isLoading from base component
    />
  );
}
