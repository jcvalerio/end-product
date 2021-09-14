import { ReactElement } from 'react';

export type ChipInputProps = {
  alwaysShowPlaceholder?: boolean;
  blurBehavior?: 'clear' | 'add' | 'ignore';
  className: string;
  dataSource?: string[];
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: ReactElement | string;
  newChipKeyCodes?: number[];
  max?: number;
  onAdd: (value: string) => void;
  onDelete: (value: string) => void;
  placeholder?: string;
  useSeverityColors?: boolean;
  value: string[];
};
