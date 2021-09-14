import { StoreWithLazyLoading } from '../types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    Cypress: unknown;
    store: StoreWithLazyLoading;
  }
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}
declare let System: System;
