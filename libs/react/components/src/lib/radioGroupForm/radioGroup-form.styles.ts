import { makeStyles } from '@material-ui/core';

const labelsColor = 'var(--on-surface-color)';

export const useStyles = makeStyles({
  radioGroupContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    marginLeft: 'var(--pm-S)',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 'var(--pm-M)',
  },
  formControlLabel: {
    color: labelsColor,
  },
  description: {
    fontSize: 'var(--tx-1XS)',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 'var(--tx-L)',
  },
  labelContainer: {
    color: labelsColor,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'var(--pm-S)',
  },
});
