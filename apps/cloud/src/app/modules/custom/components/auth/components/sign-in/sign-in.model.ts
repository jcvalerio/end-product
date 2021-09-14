import { ISignInProps, ISignInState } from 'aws-amplify-react/lib-esm/Auth/SignIn';
import { OptionsObject, SnackbarMessage } from 'notistack';

export interface SignInProps extends ISignInProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => void;
}

export interface SignInState extends ISignInState {
  password: string;
  username: string;
}
