import { Attribute } from '@kleeen/types';
import { Icon } from '../../Icon';
import { Order } from '@kleeen/common/utils';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { TableHeaderProps } from 'react-virtualized';
import { TextField } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';

const iconBySortDirection: { [key in Order]: string } = {
  [Order.asc]: 'ks-sort-asc',
  [Order.desc]: 'ks-sort-desc',
  [Order.none]: 'ks-sort-asc',
};

export const headerRenderer = ({
  columnIndex,
  handleChange,
  newAttributes,
  onSort,
  attributes,
  order,
  orderBy,
  hasActions,
  inputValues,
  setInputValue,
}: TableHeaderProps & { columnIndex: number }): JSX.Element => {
  const colSpan = columnIndex === 0 && hasActions ? 2 : 0;
  const getColumnLabel = (attr: Attribute): string => attr.label || attr.name;
  const baseAttributes = newAttributes ? newAttributes : attributes;
  const attribute = baseAttributes[columnIndex];

  let debouncedFn = null;

  return (
    <TableCell
      key={attribute.name}
      colSpan={colSpan}
      className={`header-container ${
        columnIndex === 0
          ? 'firstHeader'
          : columnIndex === baseAttributes.length - 1
          ? 'lastHeader'
          : 'middleHeader'
      }`}
    >
      <div className="header-item">
        <div className="truncate-text">
          <Tooltip title={getColumnLabel(attribute)} placement="top">
            <TextField
              onChange={(e) => {
                e.persist();
                if (!debouncedFn) {
                  debouncedFn = _.debounce(() => {
                    const { value } = e.target;
                    handleChange(attribute.name, value);
                  }, 300);
                }
                debouncedFn();
              }}
              onInput={(e) => setInputValue(attribute.name, e.target['value'])}
              value={inputValues ? inputValues[attribute.name] : ''}
              label={getColumnLabel(attribute)}
            />
          </Tooltip>
        </div>
        <div
          className={`sort-icon ${orderBy === attribute.name ? 'show' : ''}`}
          onClick={() => {
            onSort(attribute.name);
          }}
        >
          <Icon icon={iconBySortDirection[order]} />
        </div>
      </div>
    </TableCell>
  );
};
