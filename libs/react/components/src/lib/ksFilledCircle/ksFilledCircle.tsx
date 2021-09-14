import './ksFilledCircle.scss';

import React, { ReactElement } from 'react';

import { FilledCircleProps } from './ksFilledCircle.model';

const KsFilledCircle = ({ color, percentage }: FilledCircleProps): ReactElement => {
  return (
    <div>
      <div className='ks-filled-outer-circle' style={{border: `${color} var(--pm-7XS) solid`}}>
        <div className='ks-filled-inner-circle' style={{backgroundColor: color, height: `${percentage}%`, width: `${percentage}%`}}></div>
      </div>
    </div>
  );
}

export default React.memo(KsFilledCircle);
