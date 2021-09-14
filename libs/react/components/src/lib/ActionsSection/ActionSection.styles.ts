import { KsButton } from '../button';
import { styled } from '@material-ui/core';

export const KsButtonText = styled(KsButton)({
  background: 'transparent',
  boxShadow: 'none',
  color: 'var(--secondary-color)',
  '&:hover': {
    background: 'transparent',
    color: 'var(--secondary-color-variant)',
  },
});
