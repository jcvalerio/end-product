import { IAuthPieceProps } from 'aws-amplify-react/lib-esm/Auth/AuthPiece';
import { IForgotPasswordState } from 'aws-amplify-react/lib-esm/Auth/ForgotPassword';
import { OptionsObject, SnackbarMessage } from 'notistack';

export interface ForgotPasswordProps extends IAuthPieceProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => void;
}

export interface ForgotPasswordState extends IForgotPasswordState {
  code: string;
  password: string;
  username: string;
}
