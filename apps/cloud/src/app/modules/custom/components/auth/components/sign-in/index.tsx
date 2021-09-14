import './sign-in.scss';

import { ChangeEvent } from 'react';
import { AuthMessage, KSAuth } from '@kleeen/auth';
import { CommonProps, handleExceptions } from '../helpers';
import { FEDERATED_BUTTONS_THEME } from './sign-in.styles';
import { SignIn } from 'aws-amplify-react';
import { SignInButton, TextField } from '../auth.styles';
import { SignInProps, SignInState } from './sign-in.model';
import { SignInWithGoogle } from './components';
import { withSnackbar } from 'notistack';

class CustomSignIn extends SignIn {
  constructor(props: SignInProps) {
    super(props);
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Handlers
   */

  async signIn(): Promise<void> {
    const { password, username } = this.state as SignInState;
    try {
      const options = { username, password };
      const user = await KSAuth.signIn({ options });
      // Clean form state to avoid issues if the user retry
      ['username', 'password'].forEach((attribute) => this.setState({ [attribute]: '' }));
    } catch (error) {
      handleExceptions(error, this.props as CommonProps);
    }
  }

  showComponent(): JSX.Element {
    const bem = 'ks-sign-in';

    return (
      <div className={`${bem} login`}>
        <div className={`${bem}__container container`}>
          <div className={`${bem}__wrapper wrap`}>
            <div className={`${bem}__logo-container pic`}>
              <img className={`${bem}__logo`} src="/assets/logo.png" alt="KS Logo" />
            </div>
            <form className={`${bem}__form`} data-testid="sign-in-section">
              <TextField
                className={`${bem}__username input`}
                data-testid="username"
                key="username"
                label="Email"
                name="username"
                onChange={this.handleInputChange}
                required={true}
                type="email"
              />
              <TextField
                className={`${bem}__password input`}
                data-testid="password"
                key="password"
                label="Password"
                name="password"
                onChange={this.handleInputChange}
                required={true}
                type="password"
              />
              <div className="padding">
                <SignInButton
                  className={`${bem}__cta`}
                  data-testid="sign-in"
                  onClick={() => this.signIn()}
                  variant="contained"
                >
                  Login
                </SignInButton>
              </div>
              <div className={`${bem}__helpers text-center`}>
                <span className="text">Forgot </span>
                <a
                  className={`${bem}__link link`}
                  data-testid="forgot-password"
                  onClick={() => KSAuth.changeState(AuthMessage.ForgotPassword)}
                  rel="nofollow"
                >
                  email | password?
                </a>
                <br />
                <span className="text">No Account? </span>
                <a
                  className={`${bem}__link link`}
                  data-testid="create-account"
                  onClick={() => KSAuth.changeState(AuthMessage.SignUp)}
                >
                  Create an account using AWS
                </a>
              </div>
              <div className={`${bem}__or text text-center padding`}>or</div>
            </form>
            <SignInWithGoogle theme={FEDERATED_BUTTONS_THEME} />
          </div>
        </div>
      </div>
    );
  }
}

export default withSnackbar(CustomSignIn as any); // eslint-disable-line
