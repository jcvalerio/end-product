import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider, FederatedSignInOptions } from '@aws-amplify/auth/lib-esm/types';
import { GoogleButton } from 'aws-amplify-react';

export class SignInWithGoogle extends GoogleButton {
  signIn(): void {
    try {
      const options: FederatedSignInOptions = {
        provider: CognitoHostedUIIdentityProvider.Google,
      };
      Auth.federatedSignIn(options).catch(console.warn);
    } catch (error) {
      console.warn(error);
    }
  }
}
