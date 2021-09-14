import { InputConfig } from '@kleeen/kleeen-api';

export const config: InputConfig = {
  apiPort: 3000,
  apiPortWS: 3001,
  isFlexibleFind: true,
  isInMemory: false,
  isSkeletonInMemory: true,
  dbPath: 'apps/api/temp/',
  basePath: 'apps/api/src/assets/',
  routesPath: 'apps/api/src/custom-routes',
};
