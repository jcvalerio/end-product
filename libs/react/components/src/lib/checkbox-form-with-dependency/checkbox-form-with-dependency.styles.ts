import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  checkboxContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  checkboxDependencyIndicator: {
    alignSelf: 'stretch',
    backgroundColor: 'var(--row-odd)',
    borderRadius: 'var(--card-border-radius) var(--card-border-radius) 0 0',
    transition: 'background-color var(--speed-medium)',
  },
  dependencyContainer: {
    backgroundColor: 'var(--row-odd)',
    borderRadius: '0 var(--card-border-radius) var(--card-border-radius) var(--card-border-radius)',
    color: 'var(--on-surface-color)',
    padding: 'var(--pm-S) var(--pm-S) var(--pm-S) var(--pm-4XL)',
  },
  dependencyHidden: {
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 'var(--tx-1XS)',
    fontWeight: 'bold',
    opacity: 0.5,
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
