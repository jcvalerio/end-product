import {
  ConfirmSignUpOptions,
  ForgotPasswordOptions,
  ForgotPasswordSubmitOptions,
  ISignUpResult,
  IUser,
  IUserSession,
  ResendSignUpOptions,
  SignInOptions,
  SignOutOptions,
  SignUpOptions,
} from '../../types';

import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { AuthenticationHandler } from '../authentication-handler';
import { isNilOrEmpty } from '@kleeen/common/utils';

export class CognitoAuthenticationHandler extends AuthenticationHandler {
  constructor(config) {
    super();
    const awsConfig = {
      ...config,
      oauth: {
        ...config.oauth,
        // use the hosted origin dynamically as redirect URL for authentication flows
        redirectSignIn: window.location.origin.replace(/\/?$/, '/'),
        redirectSignOut: window.location.origin.replace(/\/?$/, '/'),
      },
    };

    Amplify.configure(awsConfig);
  }

  /**
   * Sign up an unregister user
   */
  async signIn(options: SignInOptions): Promise<IUser> {
    const { password, username } = options;
    const user = await Auth.signIn(username, password);
    await Auth.verifiedContact(user);
    return user;
  }

  /**
   * Sign up an unregister user
   */
  async signUp(options: SignUpOptions): Promise<ISignUpResult | undefined> {
    const response = await Auth.signUp(options);
    if (isNilOrEmpty(response)) return;
    const username = response?.user?.getUsername();
    return {
      userConfirmed: response?.userConfirmed,
      user: {
        ...response?.user,
        getUsername: () => username,
        username,
        role: '',
        roles: [],
        email: response?.user?.getUsername(),
      },
    };
  }

  /**
   * Send the verification code to confirm sign up
   * @param {ConfirmSignUpOptions} options - The username and verification code to be confirmed
   * @return - A promise resolves callback data if success
   */
  async confirmSignUp(options: ConfirmSignUpOptions): Promise<IUser> {
    const { code, username } = options;
    return await Auth.confirmSignUp(username, code);
  }

  /**
   * Resend the verification code
   * @param {ResendSignUpOptions} options - The username to be confirmed
   * @return - A promise resolves code delivery details if successful
   */
  async resendSignUp(options: ResendSignUpOptions): Promise<unknown> {
    const { username } = options;
    return await Auth.resendSignUp(username);
  }

  /**
   * Sign out method
   * @
   * @return - A promise resolved if success
   */
  public async signOut(options?: SignOutOptions): Promise<unknown> {
    return await Auth.signOut(options);
  }

  /**
   * Initiate a forgot password request
   * @param {ForgotPasswordOptions} options - the username to change password
   * @return - A promise resolves if success
   */
  public async forgotPassword(options: ForgotPasswordOptions): Promise<unknown> {
    const { username } = options;
    return await Auth.forgotPassword(username);
  }

  /**
   * Confirm a new password using a confirmation Code
   * @param {ForgotPasswordSubmitOptions} options - The username, confirmation code and the new password
   * @return - A promise that resolves if success
   */
  async forgotPasswordSubmit(options: ForgotPasswordSubmitOptions): Promise<void> {
    const { code, password, username } = options;
    return await Auth.forgotPasswordSubmit(username, code, password);
  }

  /**
   * Get current authenticated user
   * @param {CurrentUserOptions} - options for getting the current user
   * @return - A promise resolves to current authenticated user if success
   */
  async currentAuthenticatedUser(): Promise<IUser | undefined> {
    const user = await Auth.currentAuthenticatedUser();
    if (isNilOrEmpty(user)) return;
    const {
      signInUserSession: {
        accessToken: { payload },
      },
    } = user;
    const cognitoGroups = payload ? payload['cognito:groups'] || [] : [];
    const [defaultRole = null] = cognitoGroups;
    const userWithRoles = {
      ...user,
      getUsername: () => user.email,
      role: defaultRole,
      roles: cognitoGroups,
    } as IUser;

    return userWithRoles;
  }

  /**
   * Get current user's session
   * @return - A promise resolves to session object if success
   */
  async currentSession(): Promise<IUserSession> {
    return await Auth.currentSession();
  }

  /**
   * A function that takes a new context object and update it if needed
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  setContext(context: Record<string, any>): Record<string, any> {
    return context;
  }
}
