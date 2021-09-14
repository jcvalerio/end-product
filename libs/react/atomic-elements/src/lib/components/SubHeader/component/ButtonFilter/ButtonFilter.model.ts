import { OutContainerProps } from '../ContainerHeader/ContainerHeader.model';
import { TranslateProps } from '@kleeen/types';

export interface ButtonFilterProps extends OutContainerProps, TranslateProps {
  filters?: FilterProps[];
  taskName?: string;
}

export interface FilterProps {
  name: string;
  statisticalType: string;
}
