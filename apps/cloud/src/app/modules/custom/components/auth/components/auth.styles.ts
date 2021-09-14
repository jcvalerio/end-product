import { KsButton } from '@kleeen/react/components';
import { styled } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';

export const AuthButton = styled(KsButton)({
  backgroundColor: 'var(--secondary-color)',
  '&:hover': {
    backgroundColor: 'var(--secondary-color-variant)',
  },
  color: 'var(--on-primary-color)',
});

export const SignInButton = styled(AuthButton)({
  width: '100%',
});

export const TextField = styled(MuiTextField)({
  '& .Mui-focused': {
    color: 'var(--grey-1)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid var(--login-color)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '1px solid var(--login-color)',
  },
});
