import { IsOnboardingEnable, OnBoardingTask } from './modules/generated/components';
import React, { useState } from 'react';
import { globalVariable, isReactNativeInfusion } from '@kleeen/frontend/utils';
import {
  navigationInit,
  useKleeenActions,
  useKleeenContext,
  useSyncUserPreferences,
} from '@kleeen/react/hooks';

import { Authenticator } from './modules/custom/components';
import Highcharts from 'highcharts';
import { HookableContextMenu } from '@kleeen/react/atomic-elements';
import { KUIConnect } from '@kleeen/core-react';
import Layout from './layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { fontFamily } from '@kleeen/settings';
import { getModules } from './modules';

const applyInfusion = isReactNativeInfusion();
const isAuthEnabled = true;
const modulesToLoad = [
  {
    folder: require.context('./modules/generated', true, /\.jsx$/),
    modulePath: './modules/generated',
  },
  {
    folder: require.context('./modules/custom', true, /\.jsx$/),
    modulePath: './modules/custom',
    priority: 2,
  },
  {
    folder: require.context('./modules/kleeen-managed', true, /\.tsx$/),
    modulePath: './modules/kleeen-managed',
    priority: 1,
  },
];

function PagesManager() {
  const { setCurrentUser } = useKleeenActions('endUser');
  const { currentUser } = useKleeenContext('endUser');
  const [modules, setModules] = useState(null);
  const [{ showOnboardingPage }] = useSyncUserPreferences();

  // TODO: @cafe investigate why this is being executed multiple times
  async function afterLoginSuccess({ currentAuthenticatedUser }) {
    const loadedModules = await getModules(modulesToLoad);
    const routerLinks = loadedModules.map((e) => e.path);

    syncUser(setCurrentUser, currentUser, currentAuthenticatedUser);
    setModules(loadedModules);
    globalVariable('routerLinks', routerLinks);
  }

  function routerHistory(elem) {
    if (applyInfusion) {
      navigationInit(elem?.history);
    }
  }

  initializeHighcharts();

  return (
    <Router ref={routerHistory}>
      <Authenticator afterLoginSuccess={afterLoginSuccess} hideDefault={true} isEnabled={isAuthEnabled}>
        <RenderLayout modules={modules} showOnboardingPage={IsOnboardingEnable && showOnboardingPage} />
      </Authenticator>
    </Router>
  );
}

function RenderLayout({ showOnboardingPage, modules }) {
  if (showOnboardingPage) {
    return <OnBoardingTask />;
  }

  return (
    <>
      <HookableContextMenu />
      <Layout modules={modules} />
    </>
  );
}

function initializeHighcharts() {
  // Add font to highcharts
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily,
      },
    },
  });

  // Workaround for https://github.com/highcharts/highcharts/issues/13710
  (function (H) {
    H.seriesTypes.pie.prototype.drawEmpty = function () {
      let centerX,
        centerY,
        start = this.startAngleRad,
        end = this.endAngleRad,
        options = this.options;
      // Draw auxiliary graph if there're no visible points.
      if (this.total === 0) {
        centerX = this.center[0];
        centerY = this.center[1];
        if (!this.graph) {
          this.graph = this.chart.renderer
            .arc(centerX, centerY, this.center[1] / 2, 0, start, end)
            .addClass('highcharts-empty-series')
            .add(this.group);
        }
        this.graph.attr({
          d: H.SVGRenderer.prototype.symbols.arc(centerX, centerY, this.center[2] / 2, 0, {
            start,
            end,
            innerR: this.center[3] / 2,
          }),
        });
        if (!this.chart.styledMode) {
          this.graph.attr({
            'stroke-width': options.borderWidth,
            fill: options.fillColor || 'none',
            stroke: options.color || '#cccccc',
          });
        }
      } else if (this.graph) {
        // Destroy the graph object.
        this.graph = this.graph.destroy();
      }
    };
  })(Highcharts);
}

async function syncUser(setCurrentUser, currentUser, currentAuthenticatedUser) {
  try {
    const shouldUpdateCurrentUser = currentAuthenticatedUser?.username !== currentUser?.username;

    if (shouldUpdateCurrentUser) {
      setCurrentUser(currentAuthenticatedUser);
    }
  } catch (err) {
    console.error(err);
  }
}

export default React.memo(
  KUIConnect(({ locale, setLocale }) => ({
    locale,
    setLocale,
  }))(PagesManager),
);
