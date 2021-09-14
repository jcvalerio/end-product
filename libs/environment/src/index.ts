import { deployment } from './deployment';
import { environment as settings } from './environments/environment';

interface Deployment {
  stage: string;
  version: string;
}
interface EnvironmentSettings {
  middlewareAPI: string;
  production: boolean;
}
interface Environment {
  deployment: Deployment;
  settings: EnvironmentSettings;
}

export const environment: Environment = {
  deployment,
  settings,
};
