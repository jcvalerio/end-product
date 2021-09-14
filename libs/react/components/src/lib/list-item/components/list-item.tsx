import { KsContextCell } from '../../context-cell';
import { ListItemProps } from '../list-item.model';
import { ReactElement } from 'react';
import { getKey } from '../utils';
import { useListItem } from '../hooks';
import { useStyles } from '../list-item.styles';

const bem = 'ks-list-item';

export function KsListItem({ columns, item: row, widgetId }: ListItemProps): ReactElement {
  const { displayColumnAttribute, displayColumnCell, rowWithId } = useListItem({ columns, item: row });
  const classes = useStyles();

  return (
    <li className={`${bem} ${classes.item}`}>
      {columns.map((column) => {
        return (
          <div key={getKey(row, column?.name)} className={`${bem}__cell ${classes.cell}`}>
            <KsContextCell
              attr={column}
              cell={row[column.name]}
              displayColumnAttribute={displayColumnAttribute}
              format={column.format}
              row={rowWithId}
              rowDisplayValue={displayColumnCell?.displayValue}
              widgetId={widgetId}
            />
          </div>
        );
      })}
    </li>
  );
}
