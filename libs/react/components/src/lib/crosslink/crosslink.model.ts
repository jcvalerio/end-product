import { ContextMenuDataPoint } from '@kleeen/types';
import { ReactNode } from 'react';

export interface CrosslinkProps {
  dataPoints: ContextMenuDataPoint[];
  children: ReactNode;
  transformationKeyToUse?: string;
  widgetId?: string;
}
