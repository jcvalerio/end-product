import '@kleeen/infusion';

import { globalVariable, isReactNativeInfusion } from '@kleeen/frontend/utils';

import { App } from './app';
import ReactDOM from 'react-dom';

const initKSApp = (documentElement: HTMLElement) => {
  ReactDOM.render(<App />, documentElement);
};

const unmountKSApp = (documentElement: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(documentElement);
};

globalVariable('initApp', initKSApp);
globalVariable('unmountApp', unmountKSApp);

if (!isReactNativeInfusion()) ReactDOM.render(<App />, document.getElementById('root'));
