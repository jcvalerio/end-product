import React from 'react';
import clsx from 'clsx';

export const getRowClassName = ({ index, classes, onRowClick, rowGetter, deleteContainer, ...rest }) => {
  const rowData = rowGetter({ index });
  return clsx(classes.tableRow, classes.flexContainer, {
    [classes.tableRowHover]: index !== -1,
    [classes.isDeletingRow]: deleteContainer && deleteContainer.includes(rowData && rowData.id),
  });
};
