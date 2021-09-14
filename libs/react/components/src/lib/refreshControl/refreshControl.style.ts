import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  refreshControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    background: 'var(--primary-color)',
    borderRadius: '50%',
    height: 'var(--wh-7XS)',
    left: 'var(--pm-2XS)',
    position: 'absolute',
    top: 'var(--pm-S)',
    width: 'var(--wh-7XS)',
  },
});

export const usePopOverStyles = makeStyles({
  paper: {
    backgroundColor: 'var(--surface-color)',
    backdropFilter: 'blur(4px)',
  },
});
