import { makeStyles } from '@material-ui/core';
import { ReactElement } from 'react';
import classnames from 'classnames';

const bem = 'ks-h3-title-02';
export interface H3Title02Props {
  children: ReactElement;
}

const useStyles = makeStyles({
  h3Title02: {
    color: 'var(--h3-title-color)',
    fontSize: 'var(--tx-L)',
    height: 'var(--wh-3XS)',
    margin: 'var(--pm-0)',
    width: '100%',
    '& > div': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
});

export const H3Title02 = (props: H3Title02Props) => {
  const classes = useStyles();

  return <h3 className={classnames(bem, classes.h3Title02)}>{props.children}</h3>;
};

export default H3Title02;
