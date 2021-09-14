import { PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';

import { actions as StaticActions } from '@kleeen/react/state-management';
import { Dispatch } from 'redux';
import { GenericFunctions } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

interface Actions {
  [methodName: string]: PayloadActionCreator<any>;
}

interface EntityActions {
  [entityName: string]: Actions;
}

/**
 * This is use to produce a side effect from use-inject-reducer-to-store.ts
 *
 * The idea behind is to store dynamically actions generated on demand or loaded asynchronously
 * then use it to generate Kleeen actions
 *
 * IMPORTANT: This have to be a let to invalidate the useMemo at useKleeenActions
 */
let asyncActions = {};

export function getActionsWithDispatchers(
  dispatch: Dispatch,
  key: string,
  actions: { async: EntityActions; static: EntityActions },
): GenericFunctions {
  if (isNilOrEmpty(actions)) {
    return null;
  }
  const entityActions = actions.static[key] ? actions.static[key] : actions.async[key];
  if (isNilOrEmpty(entityActions)) {
    return null;
  }
  return Object.keys(entityActions).reduce((acc, actionKey) => {
    acc[actionKey] = (payload: PayloadAction<any>) => {
      dispatch(entityActions[actionKey](payload));
    };

    return acc;
  }, {});
}

export function useKleeenActions<T extends unknown>(key: string): GenericFunctions {
  const dispatch = useDispatch();

  const actionsWithDispatcher = useMemo(
    () => getActionsWithDispatchers(dispatch, key, { async: asyncActions, static: StaticActions }),
    [dispatch, key, asyncActions],
  );

  return actionsWithDispatcher;
}

export function injectToKleeenActions(entityName: string, actions: Actions): void {
  if (actions && isNilOrEmpty(asyncActions[entityName])) {
    asyncActions = {
      ...asyncActions,
      [entityName]: actions,
    };
  }
}
