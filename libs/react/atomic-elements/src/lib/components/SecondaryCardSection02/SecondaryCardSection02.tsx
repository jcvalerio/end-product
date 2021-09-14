import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import classnames from 'classnames';

const bem = 'ks-secondary-card-section-01';

const useStyles = makeStyles({
  cardSection02: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoRows: 'auto',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
    width: '100%',
  },
});

/* eslint-disable-next-line */
export interface SecondaryCardSection02Props {
  children: React.ReactNode;
}

export const SecondaryCardSection02 = (props: SecondaryCardSection02Props): ReactElement => {
  const classes = useStyles();

  return <div className={classnames(bem, classes.cardSection02)}>{props.children}</div>;
};

export default SecondaryCardSection02;
