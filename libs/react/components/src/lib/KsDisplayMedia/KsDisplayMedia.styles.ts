import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  text: {
    '& .UserAvatar--inner': {
      color: 'var(--on-secondary-color)',
      fontSize: 'var(--tx-S)',
      fontWeight: 600,
    },
  },
});
