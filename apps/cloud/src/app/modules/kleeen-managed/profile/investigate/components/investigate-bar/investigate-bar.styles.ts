import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderRadius: 0,
      height: 'var(--wh-1XS)',
      marginRight: theme.spacing(2),
      width: 'var(--wh-1XS)',
    },
    closeButton: {
      height: 'var(--wh-2XS)',
    },
    header: {
      flexGrow: 1,
    },
    root: {
      backgroundColor: 'var(--nav-top-bg-color)',
      height: 'var(--wh-S)',
    },
    subtitle: {
      color: 'var(--on-nav-top-bg-color)',
      fontSize: 'var(--tx-S)',
      lineHeight: 'var(--wh-5XS)',
    },
    title: {
      color: 'var(--on-nav-top-bg-color)',
      fontSize: 'var(--tx-L)',
      lineHeight: 'var(--wh-3XS)',
    },
    toolbar: {
      minHeight: 'var(--wh-S)',
    },
  }),
);
