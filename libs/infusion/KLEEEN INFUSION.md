# Kleeen Infusion

You can infuse your end-product as app into your angular, react or vuejs web app and it is created to use it like a NPM Package.

# Build infusion package

The first step is running the command in the root of the end-product to build the infusion package using:

```
npm run build:infusion
```

This command will create a production-ready code and the package needed to import it like a NPM package in your web app.

## Using Kleeen Infusion package

Once the infusion build is ready, it can be published to NPM or used locally using a local instalation. Here you can find more information about [downloading and installing NPM packages](https://docs.npmjs.com/downloading-and-installing-packages-locally)
Infusion package will look like this:

```
{
  "name": "@Kleeen/authoring-tool",
  "version": "1.0.0",
  "description": "End Product Infusion app",
  "main": "index.js",
  "files": [
    "sw.js",
    "main.*.esm.js",
    "polyfills.*.esm.js",
    "vendor.*.esm.js",
    "runtime.*.js",
    "*.ico",
    "*.css",
    "*esm.js.LICENSE.txt",
    "assets"
  ]
}
```

Kleeen Infusion will use your company and product name to create your package name.
Once Infusion package is already installed. It can be imported in your `Main.ts` or `index.ts` or any entry-point for your web app like this:

```
import '@kleeen/authoring-tool';
```

## Kleeen Infusion CSS and assets

Kleeen infusion package will include the CSS and assets for the end-product.

It depends the module bundler and tools your web apps is being built with but here you can find some examples.

### CSS

Using `React` CSS is needed to import it directly from `node_modules` like this:

```
import '@kleeen/authoring-tool/styles.#hashid.css';
```

Using `Angular-cli` it is needed to add it directly from `node_modules` to the build file `angular.json` like this:

```
"styles": [
  "./node_modules/@kleeen/authoring-tool/styles.#hashid.css",
  "src/styles.scss"
],
```

### Library

Add the `@kleeen/auth` library in the package.json, this should indicate the path where the `dist/libs/auth` is located.
This should look something like `"@kleeen/auth": "file: ../dist/libs/auth"`,

Inside the class, in which are the interactions of the session.
The `Integrations.AuthenticationHandler` library must be extended, which will have the processes to start session, close it, among others.

```
import { Integrations } from "@kleeen/auth";

export class AuthAngular extends Integrations.AuthenticationHandler {
```

Where the session validations are performed within a module, include the initialization of `KsAuth.configure`.

```
import { KSAuth } from "@kleeen/auth";

constructor(angularFireAuth: AngularFireAuth) {
  const authenticationHandler = new AuthAngular(angularFireAuth);
  KSAuth.configure({ authenticationHandler });
}
```

### Assets

Using `create-react-app` assests should be added to `webpack.config.js` file like this:

```
plugins: [
  new TransferWebpackPlugin([
    { from: 'node_modules/@kleeen/authoring-tool/assets', to: path.join(__dirname, '/public/assets') }
  ]),
...
```

Using `Angular-cli` assests should be added to `angular.js` file like this:

```
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@kleeen/authoring-tool/assets",
    "output": "./assets/"
  }
],
...
```
