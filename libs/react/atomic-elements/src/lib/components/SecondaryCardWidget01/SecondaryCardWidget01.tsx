import { makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import classnames from 'classnames';

const bem = 'ks-secondary-card-widget-01';

/* eslint-disable-next-line */
export interface SecondaryCardWidget01Props {
  children: ReactElement[];
}

const useStyles = makeStyles({
  secondaryCardWidget01: {
    backgroundColor: 'var(--card-bg-color)',
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    boxShadow: 'var(--card-shadow)',
    marginBottom: 'var(--pm-1XS)',
    marginLeft: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
    marginTop: 'var(--pm-1XS)',
    width: 'var(--wh-5XL)',
  },
  content: {
    height: 'calc(100% - var(--wh-3XS))',
    width: '100%',
  },
});

export const SecondaryCardWidget01 = (props: SecondaryCardWidget01Props): ReactElement => {
  const classes = useStyles();
  const [A, B] = React.Children.toArray(props.children);

  return (
    <div className={classnames(bem, classes.secondaryCardWidget01)}>
      {A}
      <div className={classnames(`${bem}__content`, classes.content)}>{B}</div>
    </div>
  );
};

export default SecondaryCardWidget01;
