import { Attribute, Cell, Row } from '@kleeen/types';

import { ListItemProps } from '../list-item.model';

type UseListProps = ListItemProps;

export function useListItem({ columns, item: row }: UseListProps): {
  displayColumnAttribute: Attribute;
  displayColumnCell: Cell;
  rowWithId: Row;
} {
  const displayColumnAttribute = columns[0];
  const displayColumnCell = row?.[displayColumnAttribute?.name];
  const rowWithId = { ...row, id: displayColumnCell.id } as Row;

  return {
    displayColumnAttribute,
    displayColumnCell,
    rowWithId,
  };
}
