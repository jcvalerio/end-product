import { OptionsObject, SnackbarMessage } from 'notistack';

import { AuthError } from '@kleeen/auth';

interface CustomOptionsObject extends OptionsObject {
  'data-testid': 'login-error-notification';
}
export interface CommonProps {
  enqueueSnackbar: (message: SnackbarMessage, options?: CustomOptionsObject) => void;
}

export function handleExceptions(error: Error, props: CommonProps): void {
  const { enqueueSnackbar } = props;
  enqueueSnackbar(
    {
      message: error instanceof AuthError ? error.innerError?.message : error.message,
      title: error.message,
    },
    {
      'data-testid': 'login-error-notification',
      variant: 'error',
    },
  );
}
