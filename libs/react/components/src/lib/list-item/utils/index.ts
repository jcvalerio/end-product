import { DataListItem } from '@kleeen/types';

export function getKey(dataItem: DataListItem, columnName: string): string {
  return `${dataItem[columnName]?.id} ${dataItem[columnName]?.displayValue}`;
}
