import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  avatar: {
    height: 'var(--wh-3XL)',
    margin: 'var(--pm-1XS)',
    width: 'var(--wh-3XL)',
  },
  drawerClose: {
    alignItems: 'center',
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    height: '100%',
    overflowX: 'hidden',
    width: 'var(--wh-1XS)',
  },
  iconEntity: {
    backgroundColor: 'var(--secondary-color)',
    borderRadius: 'var(--wh-4XS)',
    margin: 'var(--pm-4XS)',
    width: 'var(--wh-2XS)',
    '&.MuiSvgIcon-root': {
      color: 'var(--on-secondary-color)',
    },
    '&:hover': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
      cursor: 'pointer',
    },
  },
}));
