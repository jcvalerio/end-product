import MuiAppBar from '@material-ui/core/AppBar';
import MuiButton from '@material-ui/core/Button';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const AppBar = styled(MuiAppBar)({
  background: 'var(--nav-top-bg-color)',
  borderBottom: 'var(--nav-top-border-bottom-width) solid var(--nav-top-border-bottom-color)',
  boxShadow: 'var(--nav-top-shadow)',
  height: 'var(--wh-M)',
  position: 'relative',
});

export const Typography = styled(MuiTypography)({
  color: 'var(--on-nav-top-bg-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const Button = styled(MuiButton)({
  height: 'calc(var(--wh-M) - var(--nav-top-border-bottom-width))',
  borderRadius: 'var(--pm-0)',
  // TODO: Use the correct content color
  color: 'var(--on-nav-top-bg-color)',
  '& .MuiButton-label': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '&:hover': {
    color: 'var--on-top-nav-bar-button-hover)',
    background: 'var(--top-nav-bar-button-hover)',
    '&.menu-nav-button.active': {
      cursor: 'auto',
      color: 'var(--on-nav-bar-button-selected)',
      background: 'var(--nav-bar-button-selected)',
    },
  },
  '&:focus': {
    color: 'var(--on-nav-bar-button-selected)',
    background: 'var(--nav-bar-button-selected)',
  },
  '&.menu-button, &.menu-nav-button': {
    '&:hover': {
      background: 'var(--top-nav-bar-button-hover)',
      fontWeight: '700',
    },
  },
  '&.menu-nav-button.active': {
    background: 'var(--nav-bar-button-selected)',
    color: 'var(--on-nav-bar-button-selected)',
    fontWeight: '700',
    '& .nav-circle': {
      background: 'var(--nav-top-decoration-background)',
      border: 'var(--nav-top-decoration-border)',
    },
  },
  '& .nav-circle': {
    background: 'var(--transparent)',
    border: 'none',
    height: 'var(--wh-7XS)',
    width: 'var(--wh-7XS)',
    borderRadius: '50%',
    transition: 'background var(--speed-fastest), border var(--speed-fastest)',
  },
});

export const Toolbar = styled(MuiToolbar)({
  background: 'transparent',
  'border-radius': 'var(--pm-0)',
  margin: 'var(--pm-0)',
  padding: 'var(--pm-0)',
  minHeight: 'auto',
  height: 'var(--wh-M)',
});
