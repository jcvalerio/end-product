import { init, InputConfig } from '@kleeen/kleeen-api';
import { configureGraphQLServer } from './server';

export const initServer = async (config?: InputConfig) => {
  const { app } = await init(config);

  await configureGraphQLServer(app);

  return app;
};
