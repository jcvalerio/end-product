import React from 'react';
import { TypeColorFormat } from '../color-picker.model';
import { Variant } from '@kleeen/types';

export interface ArrowDropProps {
  focused: boolean;
}

export interface TextColorInputProps {
  dataTestId: string;
  defaultValue: string;
  disabled: boolean;
  formatColor: (value: string, alpha?: number) => string;
  handleOnChange: (event) => void;
  newVariant: Variant;
  label: React.ReactNode;
  valueColor: string;
}

// Default input color var
export const inputColorDefault = {
  dataTestId: 'data-color-color',
  formatType: TypeColorFormat.rgbHex,
  label: '',
  defaultValue: '',
  disabled: false,
  variant: Variant.standard,
  alpha: 1,
};
