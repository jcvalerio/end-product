import { makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const closed: CSSProperties = {
  width: 'var(--wh-0)',
  transform: 'scale(0)',
  opacity: '0',
  visibility: 'hidden',
};

const panel: CSSProperties = {
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  transition: 'transform .6s, width .6s, opacity .6s, visibility .6s, margin-left .6s',
  transitionTimingFunction: 'ease-out',
  opacity: '1',
  visibility: 'visible',
};

const getWidth = (props: { anchorWidth: number; showLeft: boolean | (() => void) }) => {
  const widthAux = props.anchorWidth ? `${props.anchorWidth}px` : 'var(--wh-6XL)';
  return `calc(100% - ${widthAux} - var(--pm-L))`;
};

export const useStyles = makeStyles({
  root: {
    height: '100%',
    overflowX: 'hidden',
  },
  container: {
    height: '100%',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  panelLeft: {
    ...panel,
    marginRight: 'var(--pm-L)',
    width: getWidth,
    '&.closed': {
      ...closed,
      marginRight: 'var(--pm-0)',
    },
  },
  panelRight: {
    ...panel,
    marginLeft: 'var(--pm-L)',
    width: getWidth,
    '&.closed': {
      ...closed,
      marginLeft: 'var(--pm-0)',
    },
  },
  anchor: {
    height: '100%',
    display: 'inline-block',
    verticalAlign: 'top',
    width: (props: { anchorWidth: number; showLeft: boolean | (() => void) }) =>
      props.anchorWidth ? `${props.anchorWidth}px` : 'var(--wh-6XL)',
  },
});
