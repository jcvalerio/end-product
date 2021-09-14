import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    marginLeft: 'var(--pm-2XL)',
    maxHeight: 'calc(var(--wh-L) - var(--pm-L))',
    width: '95%',
  },
  divContainer: {
    alignItems: 'center',
    display: 'flex',
    height: 'var(--wh-S)',
  },
});
