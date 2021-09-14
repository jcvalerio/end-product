import { styled, withStyles } from '@material-ui/core';

import MuiButton from '@material-ui/core/Button';

export const KsButton = withStyles({
  // Default button uses main clickable color
  root: {
    background: 'var(--secondary-color)',
    boxShadow: 'var(--shadow-button)',
    color: 'var(--on-secondary-color)',
    '&:hover': {
      background: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  },
  // Default Outlined is always white
  outlined: {
    color: 'var(--neutral-grey-9-hsla)',
    borderColor: 'var(--neutral-grey-9-hsla)',
    background: 'transparent',
    '&:hover': {
      color: 'var(--neutral-grey-9-hsla)',
      borderColor: 'var(--neutral-grey-9-hsla)',
      background: 'hsla(var(--neutral-grey-9-hsl), 0.2)',
    },
  },
  // Primary uses main clickable color
  outlinedPrimary: {
    color: 'var(--secondary-color)',
    borderColor: 'var(--secondary-color)',
    background: 'transparent',
    '&:hover': {
      color: 'var(--secondary-color)',
      borderColor: 'var(--secondary-color)',
      background: 'hsla(var(--secondary-color-hsl), 0.2)',
    },
  },
})(MuiButton);

export const KsButtonText = styled(KsButton)({
  background: 'transparent',
  backgroundColor: 'none',
  boxShadow: 'none',
  color: 'inherit',
  fontSize: 'var(--tx-M)',
  height: '100%',
  '&:hover': {
    background: 'transparent',
    color: 'var(--secondary-color-variant)',
  },
});
