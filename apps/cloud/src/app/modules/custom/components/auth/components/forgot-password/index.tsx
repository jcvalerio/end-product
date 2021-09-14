import './forgot-password.scss';

import { AuthButton, TextField } from '../auth.styles';
import { AuthMessage, KSAuth } from '@kleeen/auth';
import { ChangeEvent } from 'react';
import { CommonProps, handleExceptions } from '../helpers';
import { ForgotPassword } from 'aws-amplify-react';
import { ForgotPasswordProps, ForgotPasswordState } from './forgot-password.model';
import { withSnackbar } from 'notistack';
import classNames from 'classnames';
class CustomForgotPassword extends ForgotPassword {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this._validAuthStates = ['forgotPassword'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value } as unknown);
  }

  /**
   * Handlers
   */

  async forgotPassword(): Promise<void> {
    const { username = '' } = this.state;

    try {
      const options = { username };
      await KSAuth.forgotPassword(options);
      this.setState({ delivery: true });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  async forgotPasswordSubmit(): Promise<void> {
    const { code, password, username } = this.state as ForgotPasswordState;

    try {
      const options = { username, code, password };
      await KSAuth.forgotPasswordSubmit(options);
      KSAuth.changeState(AuthMessage.SignIn);
      this.setState({ delivery: null, username: '' });
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): JSX.Element {
    const bem = 'ks-forgot-password';

    return (
      <div className={classNames(bem, 'forgot-password')}>
        <div className={classNames(`${bem}__container`, 'container')}>
          <div className={classNames(`${bem}__wrapper`, 'wrap')}>
            <div className={classNames(`${bem}__logo-container`, 'pic')}>
              <img className={classNames(`${bem}__logo`)} src="/assets/logo.png" alt="KS Logo" />
            </div>
            {this.state.delivery ? (
              <form className={classNames(`${bem}__form--recover`)} data-testid="forgot-password-section">
                <div className={classNames(`${bem}__header`, 'padding', 'text')}>Reset your password</div>
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
                <TextField
                  className={classNames(`${bem}__password`, 'input')}
                  data-testid="password"
                  key="password"
                  label="New Password"
                  name="password"
                  onChange={this.handleInputChange}
                  required={true}
                  type="password"
                />
                <div className={classNames('padding', 'submit')}>
                  <a
                    className={classNames(`${bem}__link`, 'link')}
                    data-testid="resend-code"
                    onClick={() => this.forgotPassword()}
                  >
                    Resend Code
                  </a>
                  <AuthButton
                    className={classNames(`${bem}__cta`)}
                    data-testid="forgot-password"
                    onClick={() => this.forgotPasswordSubmit()}
                    variant="contained"
                  >
                    Submit
                  </AuthButton>
                </div>
              </form>
            ) : (
              <form className={classNames(`${bem}__form--reset`)} data-testid="reset-password-section">
                <div className={classNames(`${bem}__header`, 'padding', 'text')}>Reset your password</div>
                <TextField
                  className={classNames(`${bem}__username`, 'input')}
                  data-testid="username"
                  key="username"
                  label="Email"
                  name="username"
                  onChange={this.handleInputChange}
                  required={true}
                  type="email"
                />
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
                    data-testid="reset-password"
                    onClick={() => this.forgotPassword()}
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

export default withSnackbar(CustomForgotPassword as any); // eslint-disable-line
