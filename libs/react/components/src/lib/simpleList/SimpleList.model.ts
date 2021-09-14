import { Attribute, DataListItem, DataListMetaData } from '@kleeen/types';

import { ListItemProps } from '../list-item/list-item.model';
import { ListProps } from '../list/List.model';

export interface SimpleListProps {
  columns: Attribute[];
  data: DataListItem[];
  hideHeader?: boolean;
  listOptions?: Partial<ListProps>;
  listItemOptions?: Partial<ListItemProps>;
  metadata?: DataListMetaData;
}
