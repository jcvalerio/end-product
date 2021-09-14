import { deploymentInfo } from './version';

import packageJson from './../../../../package.json';

export const deployment = {
  ...deploymentInfo,
  version: deploymentInfo.version || packageJson.version,
};
