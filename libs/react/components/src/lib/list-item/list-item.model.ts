import { Attribute, DataListMetaData, Row } from '@kleeen/types';

export interface ListItemProps {
  columns: Attribute[];
  item?: Row;
  metadata?: DataListMetaData;
  widgetId?: string;
}
