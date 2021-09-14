import React from 'react';
import { TableCell } from '../../components/index';

const RemainingRow = ({ attr, row, idx, cellHasActions }) => {
  const rowKey = `${row.id}-${`${attr.isDisplayValue ? `displayValue::${attr.name}` : attr.name}`}`;

  return idx === 0 ? (
    <TableCell
      key={rowKey}
      style={{ height: `${row.height}px` }}
      className={row.className}
      colSpan={cellHasActions}
    />
  ) : (
    <TableCell key={rowKey} style={{ height: `${row.height}px` }} className={row.className} />
  );
};

export default RemainingRow;
