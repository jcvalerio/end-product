import { Dispatch, SetStateAction } from 'react';
import { Translate } from '@kleeen/types';

// Same as Radio - TODO: Use one shared ISelectorOption interface
export interface ICheckBoxOption {
  value: string;
  label: string;
}

export interface ICheckBoxGroupProps {
  title: string;
  options: ICheckBoxOption[];
  onChange: Dispatch<SetStateAction<string>>;
  defaultSelectionValue: string;
  translate?: Translate;
}
