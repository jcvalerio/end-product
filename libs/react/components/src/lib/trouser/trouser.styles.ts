import { makeStyles } from '@material-ui/core/styles';

const titleHeight = 'var(--wh-S)';

export const useStyles = makeStyles({
  container: {
    '& .MuiDialog-paperFullScreen': {
      background: 'var(--application-background)',
    },
  },
  dialogTitle: {
    background: 'var(--surface-color)',
    color: 'var(--on-surface-color)',
    height: titleHeight,
    fontSize: 'var(--tx-L)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px var(--pm-2XL)',
    boxShadow: 'var(--nav-top-shadow)',
    '& Button': {
      padding: 'var(--pm-0)',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '& Button': {
      background: 'var(--transparent)',
      color: 'var(--secondary-color)',
      width: 'var(--wh-2XS)',
      height: 'var(--wh-2XS)',
      '&:hover': {
        background: 'var(--transparent)',
      },
      '& .MuiSvgIcon-root': {
        width: '100%',
        height: '100%',
      },
    },
  },
  dialogContent: {
    background: 'var(--application-background)',
    height: `calc(100% - ${titleHeight})`,
  },
  dialogActions: {
    background: 'var(--surface-color)',
  },
});
