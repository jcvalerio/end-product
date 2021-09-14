import { app, fontFamily, theme } from '@kleeen/settings';
import { useGetThemeStoredValue, useTheme } from '@kleeen/react/hooks';

import { KsManagedModulePaths } from '@kleeen/types';
import classnames from 'classnames';
import { isReactNativeInfusion } from '@kleeen/frontend/utils';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';

// Add global font class
const useStyles = makeStyles({
  '@global': {
    '.ks-global-font': {
      fontFamily,
    },
  },
  appContainer: {
    background: 'var(--application-background)',
  },
});

const bem = 'ks';

function ThemeWrapper({ children }) {
  const { storedTheme } = useGetThemeStoredValue(theme);
  const classes = useStyles();
  const { setTheme, themeClass } = useTheme();
  const isInfusionApplication = isReactNativeInfusion();
  // TODO @cafe this is a hacky way of asking for the location.
  // We should use the location hook which cannot be used here.
  const isInvestigationPage = window.location?.pathname?.startsWith(KsManagedModulePaths.Investigate);
  const hideNavigation = isInvestigationPage || isInfusionApplication;
  const navClass = hideNavigation ? 'no-nav' : app.layout.position;

  useEffect(() => {
    setTheme(storedTheme);
  }, [storedTheme?.kit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={classnames(
        'generated-new',
        'ks-global-font',
        bem,
        classes.appContainer,
        navClass,
        themeClass,
      )}
      data-testid="app-container"
      id={'theme-wrapper-id'}
    >
      {children}
    </div>
  );
}

export default ThemeWrapper;
