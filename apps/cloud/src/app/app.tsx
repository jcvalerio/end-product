import './app.scss';
import './assets/styles/custom.css';
import './assets/styles/custom.scss';

import {
  AttributeContextMenuProvider,
  CrosslinkingInteractionProvider,
  MenuContextProvider,
  ThemeContextProvider,
  WebSocketProvider,
  useLocalization,
  useServiceWorker,
} from '@kleeen/react/hooks';
import { DEFAULT_ROLE, app, roleAccessKey, roleAccessKeyCustom, stringsTranslate } from '@kleeen/settings';
import {
  IconRegistryProvider,
  KUICombineProviders,
  AccessControlProvider as KsAccessControlProvider,
  TranslationProvider,
} from '@kleeen/core-react';
import React, { ReactElement } from 'react';

import { KsNotifications } from '@kleeen/react/components';
import Router from './routesLoader';
import ThemeWrapper from './themeWrapper';
import classnames from 'classnames';
import { environment } from '@kleeen/environment';
import iconRegistry from '../assets/icon-registry';
import { isReactNativeInfusion } from '@kleeen/frontend/utils';
import { merge } from 'lodash';

const applyInfusion = isReactNativeInfusion();
const bem = 'app';

merge(roleAccessKey, roleAccessKeyCustom);

const AccessControlProvider = ({ children }) => (
  <KsAccessControlProvider
    accessControlSettings={{
      defaultRole: DEFAULT_ROLE,
      pathToRoleOnState: 'endUser.currentUser.role',
      permissions: roleAccessKey,
    }}
  >
    {children}
  </KsAccessControlProvider>
);

function App(): ReactElement {
  useServiceWorker();
  const { language } = useLocalization();
  const TranslateProvider = TranslationProvider({
    defaultLocale: 'en',
    locale: language,
    localeData: stringsTranslate,
    onError: (err: string): void => {
      console.debug('TranslateProvider', err);
    },
  });

  const crosslinkingInteractionValue = app.crossLinkingInteraction;

  return (
    <React.StrictMode>
      <div className={classnames(bem, { infusion: applyInfusion })}>
        <TranslateProvider>
          <KUICombineProviders
            providers={[
              AccessControlProvider,
              AttributeContextMenuProvider,
              IconRegistryProvider({ iconRegistry }),
              MenuContextProvider,
              ThemeContextProvider,
              WebSocketProvider,
            ]}
          >
            <CrosslinkingInteractionProvider crosslinkingInteraction={crosslinkingInteractionValue}>
              <KsNotifications />
              <ThemeWrapper>
                <Router />
                <footer data-testid="app-version">{environment.deployment.version}</footer>
              </ThemeWrapper>
            </CrosslinkingInteractionProvider>
          </KUICombineProviders>
        </TranslateProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
