import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  scrollableContainer: {
    overflow: 'auto',
    height: '100%',
  },
  imageSize: {
    width: '100%',
  },
});

export function BackgroundUrl(props: { url: string }): ReactElement {
  const classes = useStyles(props);

  return (
    <div className={classes.scrollableContainer}>
      <img className={classes.imageSize} src={props.url} alt="" />
    </div>
  );
}
