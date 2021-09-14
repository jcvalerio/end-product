import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

export interface WidgetSection03Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  widgetSection03: {
    height: '100%',
    width: '100%',
  },
});

export const WidgetSection03 = ({ children }: WidgetSection03Props) => {
  const classes = useStyles();
  return <div className={classes.widgetSection03}>{children}</div>;
};

export default WidgetSection03;
