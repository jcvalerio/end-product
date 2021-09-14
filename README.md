# Template

You can run this template using the following commands in a different console

To run both frontend and backend

```sh
npm run start
```

To run each only one of them

```sh
npm run start:client
```

```sh
npm run start:api
```

# Prerequisites

You need to have a basic understanding of JavaScript, Node.js, and NPM to continue.

# Part 1: Install Prerequisites

## Install Node Version Manager

We recommend to use [nvm](https://github.com/nvm-sh/nvm).

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

```

Check GitHub repository to verify any change in [the installation process](https://github.com/nvm-sh/nvm#install--update-script).

### .nvmrc

This project has a `.nvmrc` file containing the node version number supported and tested. [Check the repository to configure your terminal](https://github.com/nvm-sh/nvm#nvmrc).

Calling `nvm use` automatically in a directory with a `.nvmrc` file. If it finds it, it will switch to that version; if not, it will use the default version.

## Install Node

```sh
nvm install <NODE_VERSION_ON_NVMRC_FILE>
nvm use <NODE_VERSION_ON_NVMRC_FILE>
```

## Install packages

```sh
npm install
```

## Deploy with Serverless Framework

```sh
npm install -g serverless@<CHECK_VERSION_AT_buildspec.yml_FILE>
```

## Build

Run `nx build cloud` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test cloud` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

By default, [Nx](https://nx.dev/react/cli/e2e) uses [Cypress](https://www.cypress.io) to run E2E tests.

Start Cypress with `nx e2e {appName}-e2e --watch` to execute the end-to-end tests in Interactive Watch Mode.

Run e2e tests for the applications affected by changes.

```
npm run affected:e2e
```

Run the respective .spec
Change files in your app, Cypress should rerun its tests

## Understand your workspace

Run `npm run dep-graph` to see a diagram of the dependencies of your projects.

# Authentication
## How to add custom integrations
Kleeen Software provides the option to extend the default authentication or implements new ones. To support custom workflows, `@kleeen/auth library` exposes a set of types and interfaces.
```
import { Integrations, KSAuth } from '@kleeen/auth';
KSAuth.configure({
  authenticationHandler: new Integrations.CognitoAuthenticationHandler(),
});
```
### IAuthenticationHandler base definition
IAuthenticationHandler interface is the blueprint to implement different workflows.
Here is an example of a custom implementation:
```
import 'firebase/auth';
import firebase from 'firebase/app';
import { Integrations } from '@kleeen/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export class FirebaseAuthenticationHandler extends Integrations.AuthenticationHandler {

  constructor(config: typeof firebaseConfig = firebaseConfig) {
    super();
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  /**
   * Sign in a register user using username and password
   */
  async signIn(options: SignInOptions): Promise<IUser> {
    const { password, username } = options;
    const response = await firebase.auth().signInWithEmailAndPassword(username, password);
    return {
      ...response,
      email: response?.user?.email,
      getUsername: () => response?.user?.displayName,
      role: null,   // Set here the default for the current user
      roles: [],    // set here the list of roles assigned for the current user
    };
  }


  /**
   * A function that takes a new context object and update it if needed
   *
   * @param {Record<string, any>} context is an existing context
   * @return {Record<string, any>} with an updated context
   */
  setContext(context: Record<string, any>): Record<string, any> {
    return {
      ...context,
      headers: {
        ...context.headers,
        MY_CUSTOM_HEADER: 'GOING HERE',
      },      
    };
  }
}
```
### Update the authentication handler
Following is the example of configuring the **KSAuth** class to use the custom implementation.
```
import { FirebaseAuthenticationHandler } from './google-firebase';
import firebaseConfiguration from './custom-implementations/firebase.json'
KSAuth.configure({
  authenticationHandler: new FirebaseAuthenticationHandler(firebaseConfiguration),
});
```
## Running unit tests
Run `nx test auth` to execute the unit tests via [Jest](https://jestjs.io).

## Login Role and UI Access Manager Integration
To connect a login to the FE app, it's needed to implement an AuthenticationHandler like `libs/auth/src/lib/integrations/aws-cognito/aws-cognito.ts`, that is the one used in our own prototypes.
When implementing this 'authenticator,' the currentAuthenticatedUser function needs to return a shape like `{ ...anyUserInfoNeeded, role: 'ADMIN' }`, role its required, but if it's not provided, the access-control did not interfere with anything.

NOTES: 
  - the role values depend on what the `apps/cloud/src/app/settings/role-access-keys.json` have on the permissions and can be any string.
  - the role-access-keys.json is created for our generated UI proposes grouping each page into NAVIGATION key and next each page have WIDGETS, VIEWS and can have more specific components also can be extended but to also reflect access on the UI, the AccessControl component is needed.
  - the UI implementation follows the rules and uses the access-manager module from the ks-ui-react.
