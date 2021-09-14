import { globalVariable } from '@kleeen/frontend/utils';
import { useHistory } from 'react-router';

export function useNavigation() {
  const router = useHistory();
  return navigationInit(router);
}

export function navigationInit(router) {
  const navigationRouterData = navigationRouter(router);

  globalVariable('router', router);
  globalVariable('navigate', navigationRouterData);

  return navigationRouterData;
}

//#region Private members
function navigationRouter(router) {
  const navigation = (path, preserveQueryParams = false) => {
    if (preserveQueryParams && router.location.search) {
      return router.push(path + router.location.search);
    }
    return router.push(path);
  };

  return navigation;
}
//#endregion
