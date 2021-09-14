import { AuthErrorMessages, AuthErrorTypes } from './types';

import { AuthErrorStrings } from './common';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('AuthError');

export const authErrorMessages: AuthErrorMessages = {
  noConfig: {
    message: AuthErrorStrings.DEFAULT_MSG,
    log: `
            Error: Kleeen has not been configured correctly.
            This error is typically caused by one of the following scenarios:

            1. Make sure you're passing the config object to KSAuth.configure() in your app's entry point
                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information
        `,
  },
  missingAuthConfig: {
    message: AuthErrorStrings.DEFAULT_MSG,
    log: `
            Error: Kleeen has not been configured correctly.
            The configuration object is missing required auth properties on the configuration options.
        `,
  },
  emptyUsername: {
    message: AuthErrorStrings.EMPTY_USERNAME,
  },
  invalidUsername: {
    message: AuthErrorStrings.INVALID_USERNAME,
  },
  emptyPassword: {
    message: AuthErrorStrings.EMPTY_PASSWORD,
  },
  emptyCode: {
    message: AuthErrorStrings.EMPTY_CODE,
  },
  signUpError: {
    message: AuthErrorStrings.SIGN_UP_ERROR,
    log: 'The first parameter should either be non-null string or object',
  },
  noMFA: {
    message: AuthErrorStrings.NO_MFA,
  },
  invalidMFA: {
    message: AuthErrorStrings.INVALID_MFA,
  },
  emptyChallengeResponse: {
    message: AuthErrorStrings.EMPTY_CHALLENGE,
  },
  noUserSession: {
    message: AuthErrorStrings.NO_USER_SESSION,
  },
  default: {
    message: AuthErrorStrings.DEFAULT_MSG,
  },
  userNotAuthenticated: {
    message: AuthErrorStrings.USER_NOT_AUTHENTICATED,
  },
};

export class AuthError extends Error {
  public log: string;
  public innerError?: Error;

  constructor(type: AuthErrorTypes, innerError?: Error) {
    const { message, log } = authErrorMessages[type];
    super(message);

    // Hack for making the custom error class work when transpiled to es5
    // TODO: Delete the following 2 lines after we change the build target to >= es2015
    this.constructor = AuthError;
    Object.setPrototypeOf(this, AuthError.prototype);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'AuthError';
    this.log = log || message;
    this.innerError = innerError;

    logger.error(this.log);
  }
}
