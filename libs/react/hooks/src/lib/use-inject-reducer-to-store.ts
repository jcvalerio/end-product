import { useEffect, useState } from 'react';

import { StoreWithLazyLoading } from '@kleeen/react/state-management';
import { generateStoreSlice } from '../store/ducks';
import { injectToKleeenActions } from './useKleeenActions';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStore } from 'react-redux';

export function useInjectReducerToStore(sliceName: string): boolean {
  const store = useStore() as StoreWithLazyLoading;
  const [isReady, setIsReady] = useState(false);

  const isAlreadyInjected = !isNilOrEmpty(store.asyncReducers[sliceName]);

  useEffect(() => {
    if (isAlreadyInjected) {
      return;
    }

    const duck = generateStoreSlice(sliceName);
    store.injectReducer(sliceName, duck.slice.reducer, duck.epics);
    injectToKleeenActions(sliceName, duck.slice.actions);

    setIsReady(true);
  }, []);

  return isAlreadyInjected || isReady;
}
