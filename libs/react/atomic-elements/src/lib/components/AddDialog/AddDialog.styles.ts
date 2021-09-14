import { makeStyles, styled } from '@material-ui/core';

import { KsDialog } from '@kleeen/react/components';

export const Dialog = styled(KsDialog)({
  '& .MuiDialog-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--surface-color)',
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    color: 'var(--on-surface-color)',
  },
  '& .MuiDialogTitle-root .MuiTypography-h6': {
    fontSize: 'var(--tx-1XL)',
  },
  '& Label': {
    color: 'var(--alt-dark-color)',
  },
  '& .Mui-focused': {
    color: 'var(--secondary-color)',
  },
  '& .MuiInputBase-input': {
    color: 'var(--alt-dark-color)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '3px solid var(--secondary-color-variant)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '3px solid var(--secondary-color)',
  },
});

export const useStyles = makeStyles({
  formGroup: {
    marginBottom: 'var(--pm-S)',
  },
});
