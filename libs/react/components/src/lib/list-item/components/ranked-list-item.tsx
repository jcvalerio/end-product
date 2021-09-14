import React, { ReactElement } from 'react';

import { KsContextCell } from '../../context-cell';
import { ListItemProps } from '../list-item.model';
import classnames from 'classnames';
import { getKey } from '../utils';
import { useListItem } from '../hooks';
import { useStyles } from '../list-item.styles';

const bem = 'ks-ranked-list-item';

export function KsRankedListItem({ item: row, columns, metadata, widgetId }: ListItemProps): ReactElement {
  const { displayColumnAttribute, displayColumnCell, rowWithId } = useListItem({ columns, item: row });
  const classes = useStyles();

  function calculatePositiveBar(value: number): React.CSSProperties {
    const minOrZero = Math.max(0, metadata?.min);
    const widthMax = (value - minOrZero) / (metadata?.max - minOrZero);

    return { width: `${widthMax * 100}%` };
  }

  function calculateNegativeBar(value: number): React.CSSProperties {
    const maxOrZero = Math.min(0, metadata?.max);
    const widthMax = (maxOrZero - value) / (maxOrZero - metadata?.min);

    return { width: `${widthMax * 100}%` };
  }

  return (
    <li className={`${bem} ${classes.item}`}>
      {columns.map((column, i) => {
        const cellData = row[column.name];
        return (
          <div key={getKey(row, column?.name)} className={`${bem}__cell ${classes.cell}`}>
            {i === 1 && (
              <div className={`${bem}__cell--numeric-bar ${classes.numericBar}`}>
                <div className={classes.barSpace} style={{ width: `${metadata?.positiveBarSpace}%` }}>
                  {parseInt(cellData.displayValue as string, 10) > 0 && (
                    <div
                      className={`${bem}__cell--numeric-bar-positive ${classnames(
                        classes.bar,
                        classes.positiveBar,
                      )}`}
                      style={calculatePositiveBar(parseInt(cellData.displayValue as string, 10))}
                    ></div>
                  )}
                </div>
                <div className={classes.barSpace} style={{ width: `${metadata?.negativeBarSpace}%` }}>
                  {parseInt(cellData.displayValue as string, 10) < 0 && (
                    <div
                      className={`${bem}__cell--numeric-bar-negative ${classnames(
                        classes.bar,
                        classes.negativeBar,
                      )}`}
                      style={calculateNegativeBar(parseInt(cellData.displayValue as string, 10))}
                    ></div>
                  )}
                </div>
              </div>
            )}

            <div
              className={`${bem}__value ${classes.textNumericBar}`}
              style={i === 1 ? { paddingRight: `${metadata?.negativeBarSpace}%` } : {}}
            >
              <KsContextCell
                attr={column}
                cell={cellData}
                displayColumnAttribute={displayColumnAttribute}
                format={column.format}
                row={rowWithId}
                rowDisplayValue={displayColumnCell?.displayValue}
                widgetId={widgetId}
              />
            </div>
          </div>
        );
      })}
    </li>
  );
}
