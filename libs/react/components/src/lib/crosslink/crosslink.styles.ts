import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  content: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  highlight: {
    color: 'var(--secondary-color)',
    cursor: 'pointer',
    fontWeight: 700,
  },
  underline: {
    '& > *': {
      textDecoration: 'underline',
    },
  },
}));
