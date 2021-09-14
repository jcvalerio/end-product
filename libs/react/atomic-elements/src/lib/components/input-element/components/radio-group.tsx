import { InputComponentProps, ListItem } from '@kleeen/types';

import { RadioGroup as BaseRadioGroup } from '@kleeen/react/components';

export function RadioGroup({ autoCompleteValues, setSelectedOption, setValue, value }: InputComponentProps) {
  const options = {
    data: autoCompleteValues,
    isLoading: false,
  };

  return (
    <BaseRadioGroup
      defaultSelectionValue={value}
      disabled={false} // TODO: @cafe set this as optional
      hideTitle={true} // TODO: @cafe set this as optional
      options={options}
      inSummaryDetails={true} // TODO: @cafe set this as optional
      onSelect={(newSelectedOption: ListItem) => {
        setSelectedOption(newSelectedOption);
        setValue(newSelectedOption.displayValue);
      }}
      title={''} // TODO: @cafe set this as optional
    />
  );
}
