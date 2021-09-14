import { isNilOrEmpty } from '@kleeen/common/utils';

export const AuthChannel = 'ks-auth';

export enum AuthMessage {
  Configured = 'configured',
  ConfirmSignUp = 'confirmSignUp',
  ForgotPassword = 'forgotPassword',
  ForgotPasswordFailure = 'forgotPassword_failure',
  ForgotPasswordSubmitFailure = 'forgotPasswordSubmit_failure',
  ForgotPasswordSubmitSuccessful = 'forgotPasswordSubmit',
  Loading = 'loading',
  SignIn = 'signIn',
  SignOut = 'signOut',
  SignUp = 'signUp',
  SignedIn = 'signedIn',
  SignedOut = 'signedOut',
  SignedUp = 'signedUp',
  Unknown = 'unknown',
}

/**
 * Auth instance options
 */
export interface AuthOptions {
  authenticationFlowType?: string;
  authenticationHandler?: IAuthenticationHandler;
  clientMetadata?: any;
  doSignIn?: (signInOptions: SignInOptions) => Promise<IUser>;
  endpoint?: string;
  mandatorySignIn?: boolean;
  refreshHandlers?: () => void;
  ssr?: boolean;
  storage?: IAuthStorage;
}

export interface IAuthStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export enum AuthErrorTypes {
  NoConfig = 'noConfig',
  MissingAuthConfig = 'missingAuthConfig',
  EmptyUsername = 'emptyUsername',
  InvalidUsername = 'invalidUsername',
  EmptyPassword = 'emptyPassword',
  EmptyCode = 'emptyCode',
  SignUpError = 'signUpError',
  NoMFA = 'noMFA',
  InvalidMFA = 'invalidMFA',
  EmptyChallengeResponse = 'emptyChallengeResponse',
  NoUserSession = 'noUserSession',
  userNotAuthenticated = 'userNotAuthenticated',
  Default = 'default',
}

export type AuthErrorMessages = { [key in AuthErrorTypes]: AuthErrorMessage };

export interface AuthErrorMessage {
  message: string;
  log?: string;
}

interface GenericEntity {
  [key: string]: unknown;
}

//#region Options

export type UsernamePasswordOptions = {
  username: string;
  password: string;
  attributes?: GenericEntity;
};

// We can extend this in the future if needed
export type SignInOptions = UsernamePasswordOptions;

// We can extend this in the future if needed
export type SignUpOptions = UsernamePasswordOptions;

export interface SignOutOptions {
  global?: boolean;
}

export interface ConfirmSignUpOptions extends GenericEntity {
  username: string;
  code: string;
}

export type CurrentUserOptions = GenericEntity;

export interface ResendSignUpOptions extends GenericEntity {
  username: string;
}

export interface ForgotPasswordOptions extends GenericEntity {
  username: string;
}

export interface ForgotPasswordSubmitOptions extends GenericEntity {
  username: string;
  password: string;
  code: string;
}

//#endregion Options

export type ClientMetaData =
  | {
      [key: string]: string;
    }
  | undefined;

export interface IUser extends GenericEntity {
  getUsername(): string;
  username?: string;
  email: string;
  role: string;
  roles: string[];
}

export interface IAuthorizationRequirement {
  [key: string]: unknown;
}

export class AuthorizationFailure {}

export class AuthorizationResult {
  #isSucceeded = false;
  #failure?: Error;

  constructor(failure?: Error) {
    this.#isSucceeded = isNilOrEmpty(failure);
    this.#failure = failure;
  }

  getFailure() {
    return this.#failure;
  }

  getSuccess() {
    return this.#isSucceeded;
  }

  static failed(failure?: Error): AuthorizationResult {
    return new AuthorizationResult(failure);
  }

  static success(): AuthorizationResult {
    return new AuthorizationResult();
  }
}

export interface ISignUpResult {
  user: IUser;
  userConfirmed: boolean;
}

export interface IAuthenticationHandler {
  /**
   * Authenticate the current request.
   */
  authorize(
    user: IUser,
    resource: unknown,
    requirements: IAuthorizationRequirement[],
  ): Promise<AuthorizationResult>;

  /**
   * Challenge the current request.
   */
  challenge(): Promise<void>;

  /**
   * Forbid the current request.
   */
  forbid(): Promise<void>;

  /**
   * Sign in a registered user
   * @param {SignInOptions} signInOptions - The sign in options
   * @return - A promise resolves the IUser
   */
  signIn(options: SignInOptions): Promise<IUser>;

  /**
   * Notify when a user signed in
   * @param {IUser} user - The signed user information
   * @return - A promise resolves the IUser
   */
  signedIn(user: IUser): Promise<IUser>;

  /**
   * Sign up with username, password and other attributes like phone, email
   * @param {SignUpOptions} options - The user attributes used for sign in
   * @return - A promise resolves callback data if success
   */
  signUp(options: SignUpOptions): Promise<ISignUpResult | undefined>;

  /**
   * Send the verification code to confirm sign up
   * @param {ConfirmSignUpOptions} options - The username and verification code to be confirmed
   * @return - A promise resolves callback data if success
   */
  confirmSignUp(options: ConfirmSignUpOptions): Promise<IUser>;

  /**
   * Resend the verification code
   * @param {ResendSignUpOptions} options - The username to be confirmed
   * @return - A promise resolves code delivery details if successful
   */
  resendSignUp(options: ResendSignUpOptions): Promise<unknown>;

  /**
   * Sign out method
   * @
   * @return - A promise resolved if success
   */
  signOut(options?: SignOutOptions): Promise<unknown>;

  /**
   * Initiate a forgot password request
   * @param {ForgotPasswordOptions} options - the username to change password
   * @return - A promise resolves if success
   */
  forgotPassword(options: ForgotPasswordOptions): Promise<unknown>;

  /**
   * Confirm a new password using a confirmation Code
   * @param {ForgotPasswordSubmitOptions} options - The username, confirmation code and the new password
   * @return - A promise that resolves if success
   */
  forgotPasswordSubmit(options: ForgotPasswordSubmitOptions): Promise<void>;

  /**
   * Get current authenticated user
   * @param {CurrentUserOptions} - options for getting the current user
   * @return - A promise resolves to current authenticated user if success
   */
  currentAuthenticatedUser(options?: CurrentUserOptions): Promise<IUser | undefined>;

  /**
   * Get current user's session
   * @return - A promise resolves to session object if success
   */
  currentSession(): Promise<IUserSession | undefined>;

  /**
   * A function that takes either a new context object
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  setContext(context: Record<string, any>): Record<string, any>;
}

export interface IUserSessionData {
  IdToken: SessionIdToken;
  AccessToken: SessionAccessToken;
  RefreshToken?: SessionRefreshToken;
}

export interface IUserSession {
  // constructor(data: IUserSessionData);

  getIdToken(): SessionIdToken;
  getRefreshToken(): SessionRefreshToken;
  getAccessToken(): SessionAccessToken;
  isValid(): boolean;
}

export abstract class SessionAccessToken {
  payload: Record<string, any>;

  constructor(payload: Record<string, any>) {
    this.payload = payload;
  }

  abstract getJwtToken(): string;
  abstract getExpiration(): number;
  abstract getIssuedAt(): number;
  abstract decodePayload(): { [id: string]: any };
}

export abstract class SessionIdToken {
  payload: Record<string, any>;

  constructor(payload: Record<string, any>) {
    this.payload = payload;
  }

  abstract getJwtToken(): string;
  abstract getExpiration(): number;
  abstract getIssuedAt(): number;
  abstract decodePayload(): { [id: string]: any };
}

export abstract class SessionRefreshToken {
  // constructor({ RefreshToken }: { RefreshToken: string });

  abstract getToken(): string;
}
