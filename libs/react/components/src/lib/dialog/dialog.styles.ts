import MuiDialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core';

export const KsDialog = MuiDialog;

export const KsDialogStreamlined = styled(MuiDialog)({
  '& .MuiDialogTitle-root': {
    padding: '0px',
  },
  '& .MuiDialog-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--surface-color)',
    color: 'var(--on-surface-color)',
    width: 'var(--wh-9XL)',
  },
  '& .MuiDialogTitle-root .MuiTypography-h6': {
    fontSize: 'var(--tx-M)',
    border: 'var(--card-header-border)',
    borderWidth: 'var(--card-header-border-width)',
    height: 'var(--pm-5XL)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--pm-L)',
  },
});

export const useDialogStyles = makeStyles({
  dialogTitle: {
    background: 'var(--surface-color)',
    color: 'var(--on-surface-color)',
    '& Button': {
      background: 'var(--transparent)',
      color: 'var(--secondary-color)',
      '&:hover': {
        background: 'var(--transparent)',
      },
    },
  },
  dialogContent: {
    background: 'var(--application-background)',
    color: 'var(--on-application-background)',
  },
  dialogActions: {
    background: 'var(--surface-color)',
    '& Button': {
      background: 'var(--transparent)',
      color: 'var(--secondary-color)',
      '&:hover': {
        background: 'var(--transparent)',
      },
    },
  },
});
