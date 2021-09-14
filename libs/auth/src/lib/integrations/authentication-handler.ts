import {
  AuthorizationResult,
  ConfirmSignUpOptions,
  CurrentUserOptions,
  ForgotPasswordOptions,
  ForgotPasswordSubmitOptions,
  IAuthenticationHandler,
  IAuthorizationRequirement,
  ISignUpResult,
  IUser,
  IUserSession,
  ResendSignUpOptions,
  SignInOptions,
  SignOutOptions,
  SignUpOptions,
} from '../types';

export abstract class AuthenticationHandler implements IAuthenticationHandler {
  /**
   * Authenticate the current request.
   */
  async authorize(
    user: IUser,
    resource: unknown,
    requirements: IAuthorizationRequirement[],
  ): Promise<AuthorizationResult> {
    return new AuthorizationResult();
  }

  /**
   * Challenge the current request.
   */
  async challenge(): Promise<void> {
    return;
  }

  /**
   * Forbid the current request.
   */
  async forbid(): Promise<void> {
    return;
  }

  /**
   * Sign in a registered user
   * @param {SignInOptions} signInOptions - The sign in options
   * @return - A promise resolves the CognitoUser
   */
  abstract signIn(options: SignInOptions): Promise<IUser>;

  /**
   * Notify when a user signed in
   *
   * @param {IUser} user - The signed user information
   * @return - A promise resolves the IUser
   */
  async signedIn(user: IUser): Promise<IUser> {
    return user;
  }

  /**
   * Sign up with username, password and other attributes like phone, email
   * @param {SignUpOptions} options - The user attributes used for sign in
   * @return - A promise resolves callback data if success
   */
  abstract signUp(options: SignUpOptions): Promise<ISignUpResult | undefined>;

  /**
   * Send the verification code to confirm sign up
   * @param {ConfirmSignUpOptions} options - The username and verification code to be confirmed
   * @return - A promise resolves callback data if success
   */
  abstract confirmSignUp(options: ConfirmSignUpOptions): Promise<IUser>;

  /**
   * Resend the verification code
   * @param {ResendSignUpOptions} options - The username to be confirmed
   * @return - A promise resolves code delivery details if successful
   */
  abstract resendSignUp(options: ResendSignUpOptions): Promise<unknown>;

  /**
   * Sign out method
   * @
   * @return - A promise resolved if success
   */
  abstract signOut(options?: SignOutOptions): Promise<unknown>;

  /**
   * Initiate a forgot password request
   * @param {ForgotPasswordOptions} options - the username to change password
   * @return - A promise resolves if success
   */
  abstract forgotPassword(options: ForgotPasswordOptions): Promise<unknown>;

  /**
   * Confirm a new password using a confirmation Code
   * @param {ForgotPasswordSubmitOptions} options - The username, confirmation code and the new password
   * @return - A promise that resolves if success
   */
  abstract forgotPasswordSubmit(options: ForgotPasswordSubmitOptions): Promise<void>;

  /**
   * Get current authenticated user
   * @param {CurrentUserOptions} - options for getting the current user
   * @return - A promise resolves to current authenticated user if success
   */
  abstract currentAuthenticatedUser(options?: CurrentUserOptions): Promise<IUser | undefined>;

  /**
   * Get current user's session
   * @return - A promise resolves to session object if success
   */
  abstract currentSession(): Promise<IUserSession>;

  /**
   * A function that takes a new context object and update it if needed
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  abstract setContext(context: Record<string, any>): Record<string, any>;
}
