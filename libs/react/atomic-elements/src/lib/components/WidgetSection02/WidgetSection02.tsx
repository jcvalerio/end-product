import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

export interface WidgetSection02Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  widgetSection02: {
    height: '100%',
    minHeight: 'var(--wh-5XL)',
    width: 'var(--wh-7XL)',
    padding: 'var(--pm-S)'
  },
});

export const WidgetSection02 = ({ children }: WidgetSection02Props) => {
  const classes = useStyles();
  return <div className={classes.widgetSection02}>{children}</div>;
};

export default WidgetSection02;
