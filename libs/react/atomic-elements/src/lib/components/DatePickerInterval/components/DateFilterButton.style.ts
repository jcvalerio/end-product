import { styled } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export const StyledButton = styled(Button)({
  background: 'var(--menu-bg-color)',
  boxShadow: 'none',
  borderRadius: '0px',
  width: '100%',
  color: 'var(--secondary-color)',
  padding: 'var(--pm-S) var(--pm-M) var(--pm-S) var(--pm-M)',
  marginTop: 'var(--pm-L)',
  fontSize: 'var(--tx-S)',
  textTransform: 'none',
  '&:hover': {
    boxShadow: 'none',
    borderRadius: '0px',
    background: 'var(--secondary-color-variant)',
    color: 'var(--on-secondary-color-variant)',
    '& .on-surface-color': {
      color: 'var(--on-secondary-color-variant)',
    },
    '& .placeholder': {
      color: 'var(--on-secondary-color-variant)',
      fontSize: 'var(--tx-M)',
    },
  },
  '& .calendar-icon-container': {
    maxWidth: '22%',
    flexBasis: '22%',
    '& svg': {
      height: 'var(--wh-S)',
      width: 'var(--wh-S)',
    },
  },
  '& .dates-container': {
    maxWidth: '70%',
    flexBasis: '70%',
    display: 'flex',
    alignItems: 'center',
    '& .date-from': {
      marginBottom: '-13px',
    },
    '& .on-surface-color': {
      color: 'var(--on-surface-color)',
    },
    '& .placeholder': {
      color: 'var(--on-surface-color)',
      fontSize: 'var(--tx-M)',
    },
  },
  '& .arrow-container': {
    maxWidth: '6%',
    flexBasis: '6%',
  },
});
