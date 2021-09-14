import './components/CheckBoxGroup.scss';

import { CheckBoxGroupComponent } from './components';
import { ICheckBoxGroupProps } from './CheckBoxGroup.model';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';

function CheckBoxGroupBase({ translate, ...props }: ICheckBoxGroupProps): JSX.Element {
  return (
    <div className="check-box-group-container">
      <CheckBoxGroupComponent {...props} />
    </div>
  );
}

export const CheckBoxGroup = React.memo(KUIConnect(({ translate }) => ({ translate }))(CheckBoxGroupBase));
