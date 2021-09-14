import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';

export interface WidgetSection01Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  widgetSection01: {
    height: '100%',
    minHeight: 'var(--wh-5XL)',
    width: 'var(--wh-7XL)',
    padding: 'var(--pm-S)',
  },
});

export const WidgetSection01 = ({ children }: WidgetSection01Props) => {
  const classes = useStyles();
  return <div className={classes.widgetSection01}>{children}</div>;
};

export default WidgetSection01;
