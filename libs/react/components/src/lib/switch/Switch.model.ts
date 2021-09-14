import { Translate } from '@kleeen/types';

export type IlabelPlacement = 'top' | 'end' | 'bottom' | 'start';

export interface ISwitchProps {
  handleOnChange: () => void;
  label?: React.ReactNode;
  disabled?: boolean;
  labelPlacement?: IlabelPlacement;
  defaultValue?: [string | number | boolean];
  translate?: Translate;
}
