import { Epic, combineEpics, createEpicMiddleware } from 'redux-observable';
import { Reducer, applyMiddleware, compose, createStore } from 'redux';

import { BehaviorSubject } from 'rxjs';
import { StoreWithLazyLoading } from '../types';
import { combineReducers } from '@reduxjs/toolkit';
import customModules from '../modules/custom';
import { generateStoreConfiguration } from './helpers';
import generatedModules from '../modules/generated';
import { mergeMap } from 'rxjs/operators';

// TODO: @Guaria verify why this libs/react/state-management/types/global.d.ts didn't work during build time
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    Cypress: unknown;
    store: StoreWithLazyLoading;
  }
}

const { epics, reducers, actions } = generateStoreConfiguration(generatedModules, customModules);

const staticEpics = combineEpics(...Object.values(epics));

const epic$ = new BehaviorSubject(staticEpics);
/**
 * Adding New Epics Asynchronously/Lazily
 * If you are doing code splitting or otherwise want to add an Epic to the middleware after the app is already running.
 *
 * {@link https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html Adding New Epics Asynchronously/Lazily}
 */
const rootEpic = (action$, state$, dependencies): any => {
  return epic$.pipe(
    mergeMap((epic: Epic) => {
      return epic(action$, state$, dependencies);
    }),
  );
};

export { actions };

const epicMiddleware = createEpicMiddleware();

/**
 * Dynamic Redux Reducers
 * As part of the create store we includes the functionality to inject / add reducers after the store was created.
 * So we can add reducers Asynchronously/Lazily.
 *
 * {@link https://tylergaw.com/articles/dynamic-redux-reducers/ Dynamic Redux Reducers}
 */
export function configureStore(): StoreWithLazyLoading {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store: StoreWithLazyLoading = createStore(
    createReducer({}),
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );
  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key: string, asyncReducer: Reducer, asyncEpic: Epic) => {
    if (!store.asyncReducers[key]) {
      store.asyncReducers[key] = asyncReducer;
      const appReducer = createReducer(store.asyncReducers);
      store.replaceReducer(getReducer(appReducer));
      epic$.next(combineEpics(...Object.values(asyncEpic)));
    }
    return store;
  };

  // Expose store when run in Cypress
  if (window.Cypress) {
    window.store = store;
  }

  epicMiddleware.run(rootEpic as Epic);

  return store;
}

function getReducer(appReducer) {
  return (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'endUser/logout') {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
}

function createReducer(asyncReducers): Reducer {
  return combineReducers({
    ...reducers,
    ...asyncReducers,
  });
}
