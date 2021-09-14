import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import React, { ReactElement } from 'react';

const bem = 'ks-card-title-02';
export interface CardTitle02Props {
  children: ReactElement[];
}

const useStyles = makeStyles({
  cardTitle02: {
    alignItems: 'center',
    backgroundColor: 'var(--card-content-bg-color-medium)',
    border: 'var(--card-header-border)',
    borderWidth: 'var(--card-header-border-width)',
    display: 'flex',
    height: 'var(--wh-S)',
    paddingLeft: 'var(--pm-L)',
    paddingRight: 'var(--pm-L)',
    width: '100%',
  },
  alignToRight: {
    marginLeft: 'auto',
  },
});

export const CardTitle02 = (props: CardTitle02Props): ReactElement => {
  const classes = useStyles();
  const [A, B, C] = React.Children.toArray(props.children);

  return (
    <div className={classnames(bem, classes.cardTitle02)}>
      {A}
      {C}
      <div className={classnames(`${bem}--right`, classes.alignToRight)}>{B}</div>
    </div>
  );
};

export default CardTitle02;
