import { Variant } from '@kleeen/types';

export interface ColorPickerProps {
  dataTestId?: string;
  defaultValue?: string;
  disabled?: boolean;
  formatType?: string;
  handleOnChange: (value: string) => void;
  label?: React.ReactNode;
  variant?: Variant;
}

export enum TypeColorFormat {
  rgba = 'rgba',
  rgbHex = 'rgb_hex',
  rgbaHex = 'rgba_hex',
}
