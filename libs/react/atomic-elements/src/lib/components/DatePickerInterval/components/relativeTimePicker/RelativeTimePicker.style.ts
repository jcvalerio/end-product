import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '0px',
    boxShadow: 'none',
    color: 'var(--on-surface-color)',
    backgroundColor: 'var(--surface-color)',
  },
  relativePickerContainer: {
    width: 'var(--wh-6XL)',
    '& .header': {
      width: '100%',
      display: 'flex',
      height: 'var(--wh-L)',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'var(--tx-L)',
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--on-secondary-color)',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      textTransform: 'uppercase',
    },
    '& .footer': {
      width: '100%',
      display: 'flex',
      height: 'var(--wh-S)',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'var(--tx-L)',
      borderBottomLeftRadius: 'var(--pm-4XS)',
      borderBottomRightRadius: 'var(--pm-4XS)',
      color: 'var(--on-surface-color)',
      backgroundColor: 'var(--surface-color)',
    },
    '& .MuiListItem-root': {
      justifyContent: 'center',
      textTransform: 'uppercase',
    },
  },
  optionButtons: {
    '&:hover': {
      backgroundColor: 'var(--primary-color-variant)',
      color: 'var(--on-primary-color-variant)',
    },
  },
  selectedOptionButton: {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--on-primary-color)',
    '&:hover': {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--on-primary-color)',
    },
  },
}));
