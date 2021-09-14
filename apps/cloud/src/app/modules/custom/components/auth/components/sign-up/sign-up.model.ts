import { IAuthPieceState } from 'aws-amplify-react/lib-esm/Auth/AuthPiece';
import { ISignUpProps } from 'aws-amplify-react/lib-esm/Auth/SignUp';
import { OptionsObject, SnackbarMessage } from 'notistack';

export interface SignUpProps extends ISignUpProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => void;
}

export interface SignUpState extends IAuthPieceState {
  code: string;
  password: string;
}
