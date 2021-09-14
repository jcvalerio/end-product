import MuiTextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core';

export const TextField = styled(MuiTextField)({
  '&.MuiFormControl-root': {
    width: 'var(--wh-3XL)',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
  '& Label': {
    color: 'var(--outlined-input)',
  },
  '& input': {
    '&::-webkit-calendar-picker-indicator': { display: 'none' },
  },
  '& .Mui-focused': {
    color: 'var(--outlined-input-focus)',
  },
  '& .Mui-disabled': {
    color: 'var(--on-secondary-color)',
    opacity: '0.9 !important',
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
    width: 'calc(var(--wh-3XL) - var(--wh-7XS))',
  },
  '& .MuiInput-underline:hover:before': {
    width: 'calc(var(--wh-3XL) - var(--wh-7XS))',
  },
  '& .MuiInput-underline:after': {
    width: 'calc(var(--wh-3XL) - var(--wh-7XS))',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--outlined-input)',
    borderRadius: 'var(--pm-1XS)',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      width: 'calc(var(--wh-3XL) - var(--wh-7XS))',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    color: 'var(--outlined-input-focus)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-focus)',
      width: 'calc(var(--wh-3XL) - var(--wh-7XS))',
    },
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});
