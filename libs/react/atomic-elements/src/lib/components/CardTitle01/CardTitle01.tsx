import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import React, { ReactElement } from 'react';

export interface CardTitle01Props {
  children: ReactElement;
}

const bem = 'ks-card-title-01';

const useStyles = makeStyles({
  cardTitle01: {
    alignItems: 'center',
    display: 'flex',
    height: 'var(--wh-1XS)',
    paddingBottom: 'var(--pm-L)',
    paddingLeft: 'var(--pm-L)',
    width: '100%',
  },
  alignToRight: {
    marginLeft: 'auto',
  },
});

export const CardTitle01 = (props: CardTitle01Props): ReactElement => {
  const classes = useStyles();
  const [A, B, C] = React.Children.toArray(props.children);

  return (
    <div className={classnames(bem, classes.cardTitle01)}>
      {A}
      {C}
      <div className={classnames(`${bem}--right`, classes.alignToRight)}>{B}</div>
    </div>
  );
};

export default CardTitle01;
