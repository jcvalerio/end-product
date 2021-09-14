import { KeyboardDateTimePicker as MaterialUIDateTimePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';

export const DateTimePicker = withStyles({
  root: {
    '& .MuiIconButton-root': {
      color: 'var(--secondary-color)',
    },
    '& .MuiIconButton-root.Mui-disabled': {
      color: 'var(--alt-mid-color)',
    },
    '& label': {
      color: 'var(--outlined-input)',
    },
    '& label.Mui-disabled': {
      color: 'var(--alt-mid-color)',
    },
    '& label.Mui-focused': {
      color: 'var(--on-surface-color)',
    },
    '& .MuiInput-underline:after': {
      borderBottomWidth: 'var(--pm-7XS)',
      borderBottomColor: 'var(--on-surface-color)',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomWidth: 'var(--pm-7XS)',
      borderBottomColor: 'var(--on-surface-color)',
    },
    '& .MuiInputBase-root': {
      color: 'var(--on-surface-color)',
      '&.Mui-focused': {
        color: 'var(--on-surface-color) !important',
      },
      '&:before': {
        borderColor: 'var(--on-surface-color)',
      },
    },
  },
})(MaterialUIDateTimePicker);
