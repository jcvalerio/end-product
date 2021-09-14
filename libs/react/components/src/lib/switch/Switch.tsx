import './components/Switch.scss';

import { ISwitchProps } from './Switch.model';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { SwitchComponent } from './components/';
import { pathOr } from 'ramda';

function SwitchBase({ translate, ...props }: ISwitchProps): JSX.Element {
  const onChangeHandler = pathOr(() => {}, ['handleOnChange'], props);
  return (
    <div className="switch-container">
      <SwitchComponent {...props} handleOnChange={onChangeHandler} />
    </div>
  );
}

export const Switch = React.memo(KUIConnect(({ translate }) => ({ translate }))(SwitchBase));
