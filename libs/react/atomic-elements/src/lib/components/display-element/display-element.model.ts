import { Attribute, ElementComponents } from '@kleeen/types';

import { Key } from 'react';

export interface DisplayElementProps {
  attributes: Attribute[];
  elements: ElementComponents;
  params: any; // TODO: @cafe add types here
  taskName: string;
  widgetId: string;
}
