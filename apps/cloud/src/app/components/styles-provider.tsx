import { StylesProvider as MaterialStylesProvider } from '@material-ui/core/styles';
import { ProviderProps } from './provider.model';

export function StylesProvider({ children }: ProviderProps): JSX.Element {
  return <MaterialStylesProvider injectFirst>{children}</MaterialStylesProvider>;
}
