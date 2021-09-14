import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    accountName: {
      fontSize: ' var(--tx-S)',
      lineHeight: 1.2,
      textTransform: 'capitalize',
    },
    appBar: {
      top: 0,
      bottom: 'auto',
      left: 0,
      width: 'var(--left-nav-bar-width)',
      backgroundColor: 'var(--nav-left-bg-color)',
      boxShadow: 'none',
      borderTopRightRadius: 'var(--left-nav-border-radius)',
    },
    appBarContent: {
      height: 'var(--wh-L)',
      backgroundColor: 'var(--nav-left-bg-color)',
      color: 'var(--left-nav-bar-header-color)',
      borderBottom: 'var(--left-nav-bar-header-border-bottom)',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'var(--pm-L)',
      marginRight: 'var(--pm-L)',
      borderTopRightRadius: 'var(--left-nav-border-radius)',
    },
    appBarContainer: {
      height: 'var(--wh-M)',
    },
    logoContainer: {
      marginRight: 'var(--pm-M)',
    },
    namesContainer: {
      margin: 'var(--pm-0)',
    },
    productName: {
      fontSize: 'var(--tx-L)',
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  }),
);
