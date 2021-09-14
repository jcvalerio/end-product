import MuiFormControl from '@material-ui/core/FormControl';
import { styled } from '@material-ui/core/styles';

export const FormControl = styled(MuiFormControl)({
  width: '100%',
  '& .MuiInputBase-inputTypeSearch': {
    marginLeft: 'calc(var(--size-size11) + var(--pm-1XS))',
  },
});
