import { InputComponentProps } from '@kleeen/types';
import { Switch } from '@kleeen/react/components';

export function SwitchField({ setValue, value }: InputComponentProps) {
  return (
    <Switch
      defaultValue={value}
      handleOnChange={setValue}
      label={''} // TODO: @cafe set this as optional
    />
  );
}
