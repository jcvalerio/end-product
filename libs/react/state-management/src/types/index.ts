import { Reducer, Store } from 'redux';

import { Epic } from 'redux-observable';

export interface KeyValueContext {
  [key: string]: unknown;
}

export interface StoreWithLazyLoading extends Store {
  asyncReducers: KeyValueContext;
  injectReducer: (key: string, asyncReducer: Reducer, asyncEpic: Epic) => Store;
}
