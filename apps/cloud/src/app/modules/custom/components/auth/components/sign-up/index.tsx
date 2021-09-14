import './sign-up.scss';

import { AuthButton, TextField } from '../auth.styles';
import { AuthMessage, KSAuth, SignUpOptions } from '@kleeen/auth';
import { ChangeEvent, ReactNode } from 'react';
import { CommonProps, handleExceptions } from '../helpers';
import { ISignUpProps } from 'aws-amplify-react/lib-esm/Auth/SignUp';
import { SignUp } from 'aws-amplify-react';
import { SignUpState } from './sign-up.model';
import { withSnackbar } from 'notistack';
import classNames from 'classnames';

class CustomSignUp extends SignUp {
  constructor(props: ISignUpProps) {
    super(props);
    this._validAuthStates = ['signUp', 'confirmSignUp'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handlers
   */

  async confirmSignUp(): Promise<void> {
    const { code, username = '' } = this.state as SignUpState;

    try {
      const options = { username, code };
      await KSAuth.confirmSignUp({ options });
      KSAuth.changeState(AuthMessage.SignIn);

      // Clean form state to avoid issues if the user retry
      ['username', 'code'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async resendSignUp(): Promise<void> {
    const { username = '' } = this.state as SignUpState;

    try {
      const options = { username };
      await KSAuth.resendSignUp({ options });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async signUp(): Promise<void> {
    const { username = '', password } = this.state as SignUpState;

    try {
      const options: SignUpOptions = { username, password, attributes: { email: username } };
      await KSAuth.signUp({ options });
      KSAuth.changeState(AuthMessage.ConfirmSignUp, username);

      // Clean form state to avoid issues if the user retry
      ['password'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): ReactNode {
    const { username } = this.state;
    const bem = 'ks-sign-up';

    return (
      <div className={classNames(bem, 'sign-up')}>
        <div className={classNames(`${bem}__container`, 'container')}>
          <div className={classNames(`${bem}__wrapper`, 'wrap')}>
            <div className={classNames(`${bem}__logo-container`, 'pic')}>
              <img className={classNames(`${bem}__logo`)} src="/assets/logo.png" alt="KS Logo" />
            </div>
            {this.props.authState === 'signUp' && (
              <form className={classNames(`${bem}__form`)} data-testid="sign-up-section">
                <TextField
                  className={classNames(`${bem}__username input`)}
                  data-testid="email"
                  key="username"
                  label="Email"
                  name="username"
                  onChange={this.handleInputChange}
                  required={true}
                  type="email"
                />
                <TextField
                  className={classNames(`${bem}__password input`)}
                  data-testid="password"
                  key="password"
                  label="Password"
                  name="password"
                  onChange={this.handleInputChange}
                  required={true}
                  type="password"
                />
                <div className={classNames(`${bem}__helpers`, 'padding', 'create-account')}>
                  <span className="text">
                    Have an account?
                    <a
                      className={classNames(`${bem}__link`, 'link')}
                      data-testid="sign-in"
                      onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                    >
                      Sign in
                    </a>
                  </span>

                  <AuthButton
                    className={classNames(`${bem}__cta`)}
                    data-testid="sign-up"
                    onClick={() => this.signUp()}
                    variant="contained"
                  >
                    Create Account
                  </AuthButton>
                </div>
              </form>
            )}
            {this.props.authState === 'confirmSignUp' && (
              <form
                className={classNames(`${bem}__form--confirmation`)}
                data-testid="confirm-sign-up-section"
              >
                <TextField
                  className={classNames(`${bem}__username`, 'input')}
                  data-testid="email"
                  disabled={true}
                  key="username"
                  label="Email"
                  name="username"
                  required={true}
                  type="email"
                  value={username}
                />
                <TextField
                  className={classNames(`${bem}__code`, 'input')}
                  data-testid="code"
                  key="code"
                  label="Confirmation Code"
                  name="code"
                  onChange={this.handleInputChange}
                  required={true}
                  type="text"
                />
                <div className={classNames(`${bem}__resend-code`, 'padding', 'resend-code')}>
                  <span className={classNames('text')}>
                    Lost your code?
                    <a
                      className={classNames(`${bem}__link`, 'link')}
                      data-testid="resend-code"
                      onClick={() => this.resendSignUp()}
                    >
                      Resend Code
                    </a>
                  </span>
                </div>
                <div className={classNames('padding', 'confirm')}>
                  <a
                    className={classNames(`${bem}__link`, 'link')}
                    data-testid="sign-in"
                    onClick={() => KSAuth.changeState(AuthMessage.SignIn)}
                  >
                    Back to Sign In
                  </a>
                  <AuthButton
                    className={classNames(`${bem}__cta`)}
                    data-testid="confirm-sign-up"
                    onClick={() => this.confirmSignUp()}
                    variant="contained"
                  >
                    Confirm
                  </AuthButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(CustomSignUp as any); // eslint-disable-line
