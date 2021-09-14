import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiPaper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';

export const KsMenuItem = styled(MuiMenuItem)({
  fontSize: 'var(--tx-M)',
  height: 'var(--wh-1XS)',
  '&:hover': {
    background: 'var(--secondary-color-variant)',
    color: 'var(--on-secondary-color-variant)',
  },
});

export const KsMenuContainer = styled(MuiPaper)({
  backgroundColor: 'var(--menu-bg-color)',
  boxShadow: 'var(--card-shadow)',
  color: 'var(--on-surface-color)',
});

export const KsSnackbarContainer = styled(MuiPaper)({
  backgroundColor: 'var(--surface-color)',
  boxShadow: 'var(--shadow-elevation-mid-key)',
  color: 'var(--on-surface-color)',
});

export const KsMenu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--on-surface-color)',
  },
});
