import { Attribute, DataListItem } from '@kleeen/types';

import { ElementType } from 'react';
import { ListItemProps } from '../list-item';

export interface ListProps {
  columns: Attribute[];
  data: DataListItem[];
  hideHeader?: boolean;
  ListItemComponent: ElementType;
  ListItemProps?: ListItemProps;
  sortBy?: string;
}
