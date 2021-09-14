import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  checkboxContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  description: {
    fontSize: 'var(--tx-1XS)',
    fontWeight: 'bold',
    opacity: '0.5',
    paddingTop: 'var(--pm-6XS)',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: 'var(--tx-L)',
  },
  labelContainer: {
    color: 'var(--on-surface-color)',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'var(--pm-S)',
  },
  labelDisabled: {
    color: 'var(--alt-mid-color)',
  },
});
