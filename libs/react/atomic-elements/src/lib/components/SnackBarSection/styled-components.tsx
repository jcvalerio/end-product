import { KsSnackbarContainer } from '@kleeen/react/components';
import MuiDialog from '@material-ui/core/Dialog';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const Paper = styled(KsSnackbarContainer)({
  borderRadius: '0',
});

export const TypographyBold = styled(MuiTypography)({
  fontSize: 'var(--tx-M)',
  fontWeight: 'bold',
  left: 'auto',
});

export const FormControl = styled(MuiFormControl)({
  color: 'var(--alt-light-color)',
});

export const InputLabel = styled(MuiInputLabel)({
  color: 'var(--secondary-color)',
  fontSize: 'var(--tx-M)',
  left: 'auto',
  '&.Mui-focused': {
    color: 'var(--secondary-color-variant)',
  },
});

export const Select = styled(MuiSelect)({
  '& fieldset': {
    'border-color': 'var(--secondary-color)',
  },
  '&:hover': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--secondary-color-variant)',
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--secondary-color-variant)',
    },
    '& .MuiSelect-root': {
      color: 'var(--secondary-color-variant)',
    },
  },
  '& .MuiSelect-root': {
    color: 'var(--secondary-color)',
  },
  '& svg': {
    color: 'var(--secondary-color)',
  },
});

export const Dialog = styled(MuiDialog)({
  '& Button': {
    color: 'var(--secondary-color)',
    background: 'var(--transparent)',
    '&:hover': {
      background: 'var(--transparent)',
    },
  },
});
