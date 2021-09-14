/* eslint-disable max-lines */
import {
  AuthChannel,
  AuthErrorTypes,
  AuthMessage,
  AuthOptions,
  ConfirmSignUpOptions,
  CurrentUserOptions,
  ForgotPasswordOptions,
  ForgotPasswordSubmitOptions,
  IAuthStorage,
  IAuthenticationHandler,
  ISignUpResult,
  IUser,
  IUserSession,
  ResendSignUpOptions,
  SignInOptions,
  SignOutOptions,
  SignUpOptions,
} from './types';
import { Hub, ConsoleLogger as Logger, StorageHelper, UniversalStorage } from '@aws-amplify/core';

import { AuthError } from './errors';
import { isNilOrEmpty } from '@kleeen/common/utils';

const logger = new Logger('AuthClass');
const ksAuthInfusion: any = document.createElement('ks-login');

const KLEEEN_AUTHORING_SYMBOL = (
  typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
    ? Symbol.for('kleeen_authoring_default')
    : '@@kleeen_authoring_default'
) as symbol;

/**
 * Provide authentication steps
 */
export class AuthClass {
  //#region Fields

  #config?: AuthOptions;
  #currentState: AuthMessage;
  #user?: IUser;
  #storage?: IAuthStorage;
  #authenticationHandler?: IAuthenticationHandler;

  //#endregion Fields

  //#region Constructor

  /**
   * Initialize Auth with AWS configurations
   * @param {Object} config - Configuration of the Auth
   */
  constructor(config?: AuthOptions) {
    this.#currentState = AuthMessage.Loading;
    this.configure(config);

    Hub.listen(AuthChannel, ({ payload }) => {
      const { event } = payload;
      switch (event) {
        case AuthMessage.SignedIn:
          this.#storage?.setItem('amplify-signin-with-hostedUI', 'false');
          break;
        case AuthMessage.SignOut:
          this.#storage?.removeItem('amplify-signin-with-hostedUI');
          this.#user = undefined;
          break;
      }
    });
  }

  //#endregion Constructor

  //#region public Methods

  public getModuleName() {
    return 'Auth';
  }

  public getCurrentState(): AuthMessage {
    return this.#currentState;
  }

  public changeState(state: AuthMessage, options?: any): void {
    this.dispatchAuthEvent(state, options, `Custom change state`);
  }

  configure(config?: AuthOptions | undefined) {
    if (!config) return this.#config || {};
    logger.debug('configure Auth');
    const conf = Object.assign({}, config);
    this.#config = conf;
    const { authenticationHandler } = this.#config;
    this.#authenticationHandler = authenticationHandler;

    if (!this.#config.storage) {
      this.#storage = config.ssr ? new UniversalStorage() : new StorageHelper().getStorage();
    } else {
      if (!this._isValidAuthStorage(this.#config.storage)) {
        logger.error('The storage in the Auth config is not valid!');
        throw new Error('Empty storage object');
      }
      this.#storage = this.#config.storage;
    }

    this.dispatchAuthEvent(
      AuthMessage.Configured,
      null,
      `The Auth category has been configured successfully`,
    );
    if (this.#authenticationHandler) {
      this.#authenticationHandler
        .currentAuthenticatedUser()
        .then(async (currentUser) => {
          if (isNilOrEmpty(currentUser)) {
            this.dispatchAuthEvent(AuthMessage.SignIn, null, `User is not authenticated`);
            return;
          }
          this.#user = currentUser;
          await this.dispatchSignedIn(
            currentUser,
            `A user ${currentUser?.getUsername() || currentUser?.username} is already authenticated`,
          );
        })
        .catch((error) => {
          logger.debug(error);
          this.dispatchAuthEvent(AuthMessage.SignIn, error, `User is not authenticated`);
        });
    }
    return this.#config;
  }

  //#endregion

  //#region authenticated user

  /**
   * Get current authenticated user
   * @param {CurrentUserOptions} - options for getting the current user
   * @return - A promise resolves to current authenticated user if success
   */
  async currentAuthenticatedUser(options?: CurrentUserOptions): Promise<IUser | undefined> {
    logger.debug('getting current authenticated user');
    if (!this.#authenticationHandler?.currentAuthenticatedUser) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const currentUser = await this.#authenticationHandler.currentAuthenticatedUser(options);
      this.#user = currentUser;
      return currentUser;
    } catch (error) {
      logger.debug('The user is not authenticated by the error', error);
      return this.rejectAuthError(AuthErrorTypes.userNotAuthenticated, error);
    }
  }

  /**
   * Get current user's session
   * @return - A promise resolves to session object if success
   */
  async currentSession(): Promise<IUserSession | undefined> {
    logger.debug('Getting current session');
    if (!this.#authenticationHandler?.currentSession) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const currentSession = await this.#authenticationHandler.currentSession();
      // TODO: @guaria wrap current user into a IUserSession class and return it in case the currentSession is not implemented
      return currentSession;
    } catch (error) {
      logger.debug('Failed to get the current session', error);
      return this.rejectAuthError(AuthErrorTypes.NoUserSession, error);
    }
  }

  /**
   * A function that takes a new context object and update it if needed
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  public setContext(context: Record<string, any>): Record<string, any> {
    if (!this.#authenticationHandler) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    return this.#authenticationHandler.setContext(context);
  }

  //#endregion authenticated user

  //#region sign in implementation

  /**
   * Sign in
   * @param {SignInOptions} signInOptions - The sign in options
   * @return - A promise resolves the CognitoUser
   */
  public async signIn({ options }: { options: SignInOptions }): Promise<IUser> {
    this.changeState(AuthMessage.SignIn);
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username, password } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (isNilOrEmpty(password)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }

    if (!this.#authenticationHandler?.signIn) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const currentUser = await this.#authenticationHandler.signIn(options);
      this.#user = currentUser;
      await this.dispatchSignedIn(
        currentUser,
        `A user ${currentUser?.getUsername() || currentUser?.username} has been signed in`,
      );
      return currentUser;
    } catch (error) {
      logger.error('Sign in failed', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  private async dispatchSignedIn(user: IUser, message: string): Promise<void> {
    if (!this.#authenticationHandler?.signedIn) {
      this.dispatchAuthEvent(AuthMessage.SignedIn, user, message);
    }

    try {
      await this.#authenticationHandler?.signedIn(user);
      this.dispatchAuthEvent(AuthMessage.SignedIn, user, message);
    } catch (error) {
      console.error(error);
      this.signOut();
      throw error;
    }
  }

  //#endregion sign in implementation

  //#region sign up implementation

  /**
   * Sign up with username, password and other attributes like phone, email
   * @param {SignUpOptions} options - The user attributes used for sign in
   * @return - A promise resolves callback data if success
   */
  public async signUp({ options }: { options: SignUpOptions }): Promise<ISignUpResult | undefined> {
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username, password } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (isNilOrEmpty(password)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }
    if (!this.#authenticationHandler?.signUp) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const response = await this.#authenticationHandler.signUp(options);
      if (response?.userConfirmed) {
        this.#user = response.user;
        this.dispatchAuthEvent(
          AuthMessage.SignUp,
          response,
          `A user ${this.#user?.getUsername()} has signed up successfully`,
        );
      }
      return response;
    } catch (error) {
      logger.error('Sign up failed', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  /**
   * Send MFA code to confirm sign in
   * @param {ConfirmSignUpOptions} options - The CognitoUser object
   * @param {String} code - The confirmation code
   */
  async confirmSignUp({ options }: { options: ConfirmSignUpOptions }): Promise<unknown> {
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username, code } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (isNilOrEmpty(code)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    if (!this.#authenticationHandler?.confirmSignUp) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const response = await this.#authenticationHandler.confirmSignUp({
        user: this.#user,
        ...options,
      });
      return response;
    } catch (error) {
      logger.error('Confirm signIn failure', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  /**
   * Resend the verification code
   * @param {ResendSignUpOptions} options - The username to be confirmed
   * @param {String} code - The confirmation code
   * @return - A promise resolves code delivery details if successful
   */
  async resendSignUp({ options }: { options: ResendSignUpOptions }): Promise<unknown> {
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (!this.#authenticationHandler?.resendSignUp) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      return await this.#authenticationHandler.resendSignUp({ user: this.#user, ...options });
    } catch (error) {
      logger.error('Re-send signIn failure', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  //#endregion sign up implementation

  //#region sign out implementation

  /**
   * Sign out method
   * @
   * @return - A promise resolved if success
   */
  public async signOut(options?: SignOutOptions): Promise<unknown> {
    try {
      await this.cleanCachedItems();
    } catch (e) {
      logger.debug('failed to clear cached items');
    }
    if (!this.#authenticationHandler?.signOut) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const response = await this.#authenticationHandler.signOut(options);
      this.dispatchAuthEvent(
        AuthMessage.SignedOut,
        this.#user,
        `A user ${this.#user?.getUsername()} has been signed out`,
      );
      this.#user = undefined;
      return response;
    } catch (error) {
      logger.error('Re-send signIn failure', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  //#endregion sign out implementation

  //#region forgot password implementation

  /**
   * Initiate a forgot password request
   * @param {ForgotPasswordOptions} options - the username to change password
   * @return - A promise resolves if success
   */
  public async forgotPassword(options: ForgotPasswordOptions): Promise<unknown> {
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (!this.#authenticationHandler?.forgotPassword) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      return await this.#authenticationHandler.forgotPassword(options);
    } catch (error) {
      this.dispatchAuthEvent(AuthMessage.ForgotPasswordFailure, error, `${username} forgotPassword failed`);
      logger.error('Re-send signIn failure', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  /**
   * Confirm a new password using a confirmation Code
   * @param {ForgotPasswordSubmitOptions} options - The username, confirmation code and the new password
   * @return - A promise that resolves if success
   */
  public async forgotPasswordSubmit(options: ForgotPasswordSubmitOptions): Promise<void> {
    if (isNilOrEmpty(this.#config)) {
      return this.rejectAuthError(AuthErrorTypes.NoConfig);
    }
    const { username, code, password } = options;
    if (isNilOrEmpty(username)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (isNilOrEmpty(code)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    if (isNilOrEmpty(password)) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }
    if (!this.#authenticationHandler?.forgotPasswordSubmit) {
      return this.rejectAuthError(AuthErrorTypes.MissingAuthConfig);
    }
    try {
      const response = await this.#authenticationHandler.forgotPasswordSubmit(options);
      this.dispatchAuthEvent(
        AuthMessage.ForgotPasswordSubmitSuccessful,
        this.#user,
        `${username} forgotPasswordSubmit successful`,
      );
      return;
    } catch (error) {
      this.dispatchAuthEvent(
        AuthMessage.ForgotPasswordSubmitFailure,
        error,
        `${username} forgotPasswordSubmit failed`,
      );
      logger.error('Re-send signIn failure', error);
      return this.rejectAuthError(AuthErrorTypes.Default, error);
    }
  }

  //#endregion forgot password implementation

  //#region private methods

  private dispatchAuthEvent(event: AuthMessage, data: any, message: string): void {
    this.#currentState = event;
    if (event === AuthMessage.SignOut) {
      // TODO: @guaria we need to remove the use of @amplify-ui and aws-amplify-react to decoupling and remove this line
      // this is needed to move the login page to the right step
      Hub.dispatch('auth', { event, data, message }, 'Auth', KLEEEN_AUTHORING_SYMBOL);
    }
    Hub.dispatch(AuthChannel, { event, data, message }, 'Auth', KLEEEN_AUTHORING_SYMBOL);
  }

  private async cleanCachedItems() {
    // clear authentication cached item
    if (this.#storage) {
      this.#storage.removeItem('amplify-signin-with-hostedUI');
    }
  }

  private _isValidAuthStorage(obj): boolean {
    // We need to check if the obj has the functions of Storage
    return (
      !!obj &&
      typeof obj.getItem === 'function' &&
      typeof obj.setItem === 'function' &&
      typeof obj.removeItem === 'function' &&
      typeof obj.clear === 'function'
    );
  }

  private rejectAuthError(type: AuthErrorTypes, innerError?: Error): Promise<never> {
    return Promise.reject(new AuthError(type, innerError));
  }

  //#endregion
}

function instantiateKSAuth(): AuthClass {
  if (ksAuthInfusion?.KSAuth) {
    return ksAuthInfusion.KSAuth;
  }
  return new AuthClass();
}

export const KSAuth = instantiateKSAuth();
