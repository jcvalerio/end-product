import { KsListItem } from '../list-item';
import { List } from '../list';
import { SimpleListProps } from './SimpleList.model';

export function SimpleList({
  data,
  columns,
  hideHeader,
  listOptions,
  listItemOptions,
  metadata,
}: SimpleListProps) {
  return (
    <List
      columns={columns}
      data={data}
      hideHeader={hideHeader}
      sortBy={columns[0]?.name}
      ListItemComponent={KsListItem}
      ListItemProps={{ columns, metadata, ...listItemOptions }}
      {...listOptions}
    ></List>
  );
}
