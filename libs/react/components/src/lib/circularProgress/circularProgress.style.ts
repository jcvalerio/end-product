import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  childrenContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  circularProgress: {
    position: 'relative',
    color: 'var(--secondary-color)',
  },
  progressContainer: {
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
  },
});
