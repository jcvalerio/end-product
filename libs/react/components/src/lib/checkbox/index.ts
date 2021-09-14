import MuiCheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';

export const KsCheckbox = withStyles({
  root: {
    color: 'var(--on-surface-color)',
    '&$checked': {
      color: 'var(--secondary-color)',
    },
    '&$colorSecondary': {
      color: 'var(--secondary-color)',
    },
    '&$disabled': {
      color: 'var(--alt-mid-color)',
    },
  },
  checked: {},
  colorSecondary: {},
  disabled: {},
})(MuiCheckbox);
