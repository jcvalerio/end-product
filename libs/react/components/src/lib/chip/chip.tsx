import MuiChip from '@material-ui/core/Chip';
import { styled } from '@material-ui/core';

export const KsChip = styled(MuiChip)({
  borderColor: 'var(--on-surface-color)',
  borderRadius: 'var(--pm-1XS)',
  '& > span': {
    color: 'var(--on-surface-color)',
  },
  '& .MuiSvgIcon-root': {
    color: 'var(--secondary-color)',
    '&:hover': {
      color: 'var(--secondary-color-variant)',
    },
  },
  '&:hover': {
    borderColor: 'var(--secondary-color-variant)',
    '& > span': {
      color: 'var(--secondary-color-variant)',
    },
  },
});
