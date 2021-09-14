import { config } from '../kapi-config';
import { initServer } from './initServer';
import { initWebSockets } from './websockets/init';

const runServer = async () => {
  const app = await initServer(config);
  const { httpServer } = initWebSockets(app);

  // eslint-disable-next-line no-console
  //app.listen(config.apiPort, () => console.info(`API listening on port ${config.apiPort}!`));
  // eslint-disable-next-line no-console
  httpServer.listen(config.apiPort, () =>
    console.info(`API and WebSocket listening on port ${config.apiPort}!`),
  );
};

runServer();
