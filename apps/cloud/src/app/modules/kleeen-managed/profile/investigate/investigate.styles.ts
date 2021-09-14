import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: 'calc(100vh - var(--wh-S))',
      overflow: 'auto',
      paddingTop: 'var(--pm-1XL)',
    },
  }),
);
