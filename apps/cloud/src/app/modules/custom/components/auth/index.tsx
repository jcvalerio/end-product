import '@aws-amplify/ui/dist/style.css';

import { AuthChannel, AuthMessage, Integrations, KSAuth } from '@kleeen/auth';
import { CustomForgotPassword, CustomLoading, CustomSignIn, CustomSignUp, KSLoading } from './components';
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';

import { Authenticator } from 'aws-amplify-react';
import { Helpers } from '@kleeen/render-utils';
import { Hub } from '@aws-amplify/core';
import { ThemeProvider } from '@material-ui/styles';
import awsDefaultConfig from './aws-exports';
import { createTheme } from '@material-ui/core/styles';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { isReactNativeInfusion } from '@kleeen/frontend/utils';

const useAuthStateOnRouteChange = (setAuthState: Dispatch<SetStateAction<AuthMessage>>) => {
  function onAuthStateChange(data): void {
    const event = data.payload.event;
    let loginWorkflow = event;
    switch (event) {
      case AuthMessage.Configured:
      case AuthMessage.SignOut:
      case AuthMessage.SignedOut:
        loginWorkflow = AuthMessage.SignIn;
        break;

      default:
        loginWorkflow = event;
        break;
    }
    if (!setAuthState) {
      console.warn('setAuthState is undefined at components/auth');
      return;
    }
    setAuthState(loginWorkflow);
  }

  useEffect(() => {
    Hub.listen(AuthChannel, onAuthStateChange);
    return () => {
      Hub.remove(AuthChannel, onAuthStateChange);
    };
  }, []);
};

const RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES = 10;

// eslint-disable-next-line
function KleeenAuthenticator({
  afterLoginSuccess,
  children,
  isAuthorized,
  isEnabled,
  ...props
}): ReactElement {
  /**
   * This effects try to get the primary and secondary color from rendered app
   * for that reason we have to retry in order to get the color after the browser
   * rendered the app component, after we got the colors the effect stop trying or
   * we reach the retries limit [RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES]
   */
  const [defaultMaterialTheme, setDefaultMaterialTheme] = useState({});
  const [continueTrying, setContinueTrying] = useState(0);
  const [authState, setAuthState] = useState(KSAuth.getCurrentState());
  const [isLoading, setIsLoading] = useState(false);

  useAuthStateOnRouteChange(setAuthState);

  useEffect(() => {
    if (isReactNativeInfusion()) return;

    KSAuth.configure({
      authenticationHandler: new Integrations.CognitoAuthenticationHandler(awsDefaultConfig),
    });
  }, []);

  useEffect(() => {
    const onLoginSuccess = async () => {
      if (afterLoginSuccess && authState === AuthMessage.SignedIn) {
        try {
          setIsLoading(true);
          const currentAuthenticatedUser = await KSAuth.currentAuthenticatedUser();
          afterLoginSuccess({ currentAuthenticatedUser }).then(() => {
            setIsLoading(false);
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    onLoginSuccess();
  }, [authState]);

  useEffect(() => {
    const primaryColor = Helpers.DOM.getAppPrimaryColor();
    const secondaryColor = Helpers.DOM.getAppSecondaryColor();
    if (primaryColor && secondaryColor && isNilOrEmpty(defaultMaterialTheme)) {
      setDefaultMaterialTheme({
        palette: {
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: secondaryColor,
          },
        },
      });
    } else if (continueTrying < RETRY_LIMIT_TO_GET_THE_COMPUTED_STYLES) {
      setContinueTrying(continueTrying + 1);
    }
  }, [continueTrying, defaultMaterialTheme]);

  return (
    <ThemeProvider theme={createTheme(defaultMaterialTheme)}>
      {isEnabled ? (
        <CustomAuthenticator {...props} authState={authState} currentAuthState={authState}>
          <ContentValidator
            {...props}
            currentAuthState={authState}
            isAuthorized={isAuthorized}
            isLoading={isLoading}
          >
            {children}
          </ContentValidator>
        </CustomAuthenticator>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}

function CustomAuthenticator({ children, ...props }): ReactElement {
  return (
    <Authenticator hideDefault={true} {...props}>
      <CustomForgotPassword />
      <CustomLoading />
      <CustomSignIn />
      <CustomSignUp />
      {children}
    </Authenticator>
  );
}

function ContentValidator({
  children,
  currentAuthState,
  isAuthorized = true,
  isLoading,
  onStateChange,
}: {
  children: JSX.Element;
  currentAuthState: string;
  isLoading: boolean;
  isAuthorized: boolean;
  onStateChange?: (state: string, data?: any) => void;
}): ReactElement | null {
  if (isLoading) return <KSLoading />;
  if ([currentAuthState].some((state: string): boolean => state !== AuthMessage.SignedIn)) {
    if (onStateChange) {
      onStateChange(currentAuthState);
    }
    return null;
  }
  if (onStateChange) {
    onStateChange(AuthMessage.SignedIn);
  }

  if (isAuthorized) {
    return children;
  }
}

export default KleeenAuthenticator;
