import { withStyles } from '@material-ui/core/styles';
import MuiFab from '@material-ui/core/Fab';
import MuiListSubheader from '@material-ui/core/ListSubheader';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';

export const RefreshControlFab = withStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: 'var(--secondary-color)',
    height: 'var(--wh-2XS)',
    minHeight: 'var(--wh-2XS)',
    width: 'var(--wh-2XS)',
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'var(--secondary-color-variant)',
    },
  },
}))(MuiFab);

export const RefreshControlSelect = withStyles(() => ({
  root: {
    color: 'var(--secondary-color)',
    fontSize: 'var(--tx-S)',
    textTransform: 'uppercase',
    '&:hover': {
      color: 'var(--secondary-color-variant)',
    },
  },
  select: {
    paddingBottom: 0,
    paddingTop: 0,
    select: {
      paddingRight: 'var(--wh-3XS)',
    },
  },
  icon: {
    color: 'var(--secondary-color)',
    top: 'calc(50% - var(--tx-M))',
    width: 'var(--wh-3XS)',
  },
}))(MuiSelect);

export const RefreshControlListSubheader = withStyles(() => ({
  root: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-S)',
    fontWeight: 'bold',
    lineHeight: 'var(--tx-3XL)',
  },
}))(MuiListSubheader);

export const RefreshControlMenuItem = withStyles(() => ({
  root: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-M)',
    paddingBottom: 'var(--pm-5XS)',
    paddingTop: 'var(--pm-5XS)',
    position: 'relative',
  },
}))(MuiMenuItem);
