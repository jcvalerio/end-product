import MuiTextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

export const KsTextField = styled(MuiTextField)({
  '& Label': {
    color: 'var(--outlined-input)',
  },
  '& Label.Mui-error': {
    color: 'var(--notification-error-color)',
  },
  '& .Mui-focused': {
    color: 'var(--outlined-input-focus)',
  },
  '& .Mui-disabled': {
    color: 'var(--alt-mid-color);',
  },
  '& .MuiFormHelperText-root': {
    color: 'var(--on-surface-color)',
    opacity: 0.5,
    fontSize: 'var(--tx-1XS)',
  },
  '& .MuiInputBase-root': {
    color: 'var(--on-surface-color)',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'var(--pm-7XS) solid var(--outlined-input)',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-hover)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-focus)',
  },
  '& .MuiInput-underline.Mui-error:after': {
    borderBottom: 'var(--pm-6XS) solid var(--notification-error-color)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--outlined-input)',
    borderRadius: '8px',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-hover)',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    color: 'var(--outlined-input-focus)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-focus)',
    },
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});
