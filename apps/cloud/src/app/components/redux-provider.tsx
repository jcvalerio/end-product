import { Action } from 'redux';
import { Provider } from 'react-redux';
import { ProviderProps } from './provider.model';
import { configureStore } from '@kleeen/react/state-management';

export function ReduxProvider({ children }: ProviderProps): Action {
  return <Provider store={configureStore()}>{children}</Provider>;
}
