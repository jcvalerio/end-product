import { ReactElement } from '@kleeen/types';

export interface ErrorScreenProps {
  containerClassName?: string;
  text: string | ReactElement;
  textClassName?: string;
  textStyle?: Record<string, unknown>;
}
