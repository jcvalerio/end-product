import './ksIconButton.scss';

import React from 'react';

const KsIconButton = ({ children, onClick }) => (
  <div className={'iconFilter'} onClick={onClick}>
    <div className={'iconWrapper'}>{children}</div>
  </div>
);

export default KsIconButton;
