import './color-picker.scss';

import { ColorPickerProps } from './color-picker.model';
import InputColor from './components';
import React from 'react';
import { ReactElement } from '@kleeen/types';

export function KsColorPicker(props: ColorPickerProps): ReactElement {
  return (
    <div className="colorpicker-container">
      <InputColor {...props} />
    </div>
  );
}
