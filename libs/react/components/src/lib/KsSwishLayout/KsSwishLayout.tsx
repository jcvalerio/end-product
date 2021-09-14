import React, { useState } from 'react';

import { SwishLayoutProvider } from '@kleeen/react/hooks';
import { useStyles } from './KsSwishLayout.style';
import { SwisherProps } from './KsSwishLayout.model';

export const KsSwishLayout = (props: SwisherProps) => {
  const [showLeft, setShowLeft] = useState(!props.showRightDefault);
  const classes = useStyles({
    anchorWidth: props.anchorWidth,
    showLeft,
  });

  const toggleSwish = () => {
    setShowLeft((prevState) => !prevState);
  };

  const toggleLeft = () => {
    setShowLeft(true);
  };

  const toggleRight = () => {
    setShowLeft(false);
  };

  const swisherFns = {
    toggleSwish,
    toggleLeft,
    toggleRight,
    showLeft,
    showRight: !showLeft,
  };

  return (
    <SwishLayoutProvider fns={swisherFns}>
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={`${classes.panelLeft} ${showLeft ? '' : 'closed'}`}>{props.leftPanel}</div>
          <div className={classes.anchor}>{props.anchor}</div>
          <div className={`${classes.panelRight} ${showLeft ? 'closed' : ''}`}>{props.rightPanel}</div>
        </div>
      </div>
    </SwishLayoutProvider>
  );
};

export default KsSwishLayout;
