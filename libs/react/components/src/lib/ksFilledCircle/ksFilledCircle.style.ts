import { makeStyles } from '@material-ui/core';
import { FilledCircleProps } from './ksFilledCircle.model';

const RELATIVE_CIRCLE_RADIUS = '1.2em';

export function getUseStyles({ color, percentage }: FilledCircleProps) {
  const useStyles = makeStyles({
    outerCircle: {
      position: 'relative',
      border: `${color} var(--pm-7XS) solid`,
      borderRadius: '50%',
      height: RELATIVE_CIRCLE_RADIUS,
      width: RELATIVE_CIRCLE_RADIUS,
      marginRight: '0.5em',
    },
    innerCircle: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: `${color}`,
      height: `${percentage}%`,
      width: `${percentage}%`,
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
    },
  });
  return useStyles;
}
