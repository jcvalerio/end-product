import { AddPayload, CellDisplayValue, DeletePayload, RowData, UpdatePayload } from './config-table.model';
import { NEW_ROW_ID_PREFIX, isNilOrEmpty } from '@kleeen/common/utils';
import { startsWith } from 'ramda';

export function getPayloadRow(row: RowData): { [key: string]: any } {
  return Object.keys(row).reduce((acc, key) => {
    if (key === 'id') return acc;
    if (row[key].hasOwnProperty('displayValue')) {
      acc[key] = (row[key] as CellDisplayValue).displayValue;
    } else {
      acc[key] = row[key];
    }

    return acc;
  }, {});
}

export function getAddPayload({ entityKey, rows }: { entityKey: string; rows: RowData[] }): AddPayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(rows)) {
    return [];
  }

  return rows
    .filter(({ id }) => startsWith(NEW_ROW_ID_PREFIX, id))
    .map((row) => {
      const entity = getPayloadRow(row);

      return {
        entity,
        entityKey,
      };
    });
}

export function getDeletePayload({
  entityKey,
  deletedRows,
}: {
  entityKey: string;
  deletedRows: string[];
}): DeletePayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(deletedRows)) {
    return [];
  }

  return deletedRows.map((id) => ({ entityKey, id }));
}

export function getUpdatePayload({
  entityKey,
  rows,
}: {
  entityKey: string;
  rows: RowData[];
}): UpdatePayload[] {
  if (isNilOrEmpty(entityKey) || isNilOrEmpty(rows)) {
    return [];
  }
  return rows
    .filter(({ id }) => !startsWith(NEW_ROW_ID_PREFIX, id))
    .map((row: RowData) => {
      const params = getPayloadRow(row);
      return {
        entity: entityKey,
        params: { ...params, id: row.id },
      };
    });
}

export function reorderArray(newIndex: number, oldIndex: number, array: RowData[]) {
  const result = array;
  const [removed] = result.splice(oldIndex, 1);
  result.splice(newIndex, 0, removed);
  return result;
}

const reduceOrderIndex = (orderColumnName) => (row) => ({
  ...row,
  [orderColumnName]: {
    displayValue: row[orderColumnName]?.displayValue - 1,
  },
});

export function getEditedRowsAfterDelete({
  data,
  editedRows,
  orderColumnName,
  deletedId,
}: {
  data: RowData[];
  editedRows: RowData[];
  orderColumnName: string;
  deletedId: string;
}) {
  const deletedOne = data.find((row) => deletedId === row.id) || {};
  // calculation of the new order index
  const rowsThatRequiredNewOrder = data
    .filter((row) => {
      if (editedRows.find(({ id }) => id === row.id)) return false;

      return (
        (row[orderColumnName as string] as CellDisplayValue)?.displayValue >
        (deletedOne[orderColumnName as string] as CellDisplayValue).displayValue
      );
    })
    .map(reduceOrderIndex(orderColumnName));
  // removing the delete id and updating the order index
  const editedRowsUpdated = editedRows.reduce((acc, row) => {
    if (row.id === deletedId) return acc;

    const rowObject = data.find(({ id }) => id === row.id) || {};
    const updatedOrder =
      (row[orderColumnName] as CellDisplayValue)?.displayValue ||
      (rowObject[orderColumnName] as CellDisplayValue)?.displayValue;
    const removedOrder = deletedOne[orderColumnName].displayValue;
    if (updatedOrder > removedOrder) {
      const newRow = reduceOrderIndex(orderColumnName)(row);

      return [...acc, newRow];
    }

    return [...acc, row];
  }, [] as RowData[]);

  const newEditedRows = [...rowsThatRequiredNewOrder, ...editedRowsUpdated];

  return newEditedRows;
}
