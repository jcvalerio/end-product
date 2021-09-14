import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';

const bem = 'ks-full-area-card-section-01';
export interface FullAreaCardSection01Props {
  children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
  fullAreaCardSection01: {
    height: '100%',
    width: '100%',
  },
});

export const FullAreaCardSection01 = ({ children }: FullAreaCardSection01Props) => {
  const classes = useStyles();
  return <div className={classnames(bem, classes.fullAreaCardSection01)}>{children}</div>;
};

export default FullAreaCardSection01;
