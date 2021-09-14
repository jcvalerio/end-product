import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
      left: 0,
      width: 'var(--left-nav-bar-width)',
      boxShadow: 'none',
      borderBottomRightRadius: 'var(--left-nav-border-radius)',
      backgroundColor: 'transparent',
    },
    appBarContent: {
      height: 'var(--wh-M)',
      backgroundColor: 'var(--nav-top-bg-color)',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottomRightRadius: 'var(--left-nav-border-radius)',
    },
    appBarContainer: {
      height: 'var(--wh-M)',
    },
    userName: {
      display: 'grid',
      alignItems: 'center',
      fontSize: 'var(--tx-M)',
      width: '100%',
    },
    userNameContent: {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
);
