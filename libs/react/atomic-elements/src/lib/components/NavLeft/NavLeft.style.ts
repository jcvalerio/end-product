import MuiButton from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

export const Button = styled(MuiButton)({
  height: 'var(--wh-M)',
  color: 'var(--on-nav-top-bg-color)',
  borderRadius: '0px',
  padding: 'var(--pm-M)',
  textTransform: 'none',
  borderBottomRightRadius: 'var(--card-border-radius)',
  '& .MuiButton-label': {
    height: '100%',
    '& .MuiSvgIcon-root': {
      width: 'var(--wh-1XS)',
      height: 'var(--wh-1XS)',
    },
  },
  '&:hover': {
    color: 'var(--on-left-nav-bar-button-hover)',
    background: 'var(--left-nav-bar-button-hover)',
    '&.menu-nav-button.active': {
      cursor: 'auto',
      color: 'var(--on-nav-bar-button-selected)',
      background: 'var(--nav-bar-button-selected)',
    },
  },
});

export const UserAccountButton = styled(MuiButton)({
  height: 'var(--wh-M)',
  color: 'var(--on-nav-top-bg-color)',
  borderRadius: '0px',
  width: '100%',
  padding: 'var(--pm-M)',
  textTransform: 'none',
  '& .MuiButton-label': {
    height: '100%',
    justifyContent: 'end',
    '& .MuiSvgIcon-root': {
      width: '1.5em',
      height: '1.5em',
    },
  },
  '&:hover': {
    color: 'var(--on-left-nav-bar-button-hover)',
    background: 'var(--left-nav-bar-button-hover)',
    '&.menu-nav-button.active': {
      cursor: 'auto',
      color: 'var(--on-nav-bar-button-selected)',
      background: 'var(--nav-bar-button-selected)',
    },
  },
});
