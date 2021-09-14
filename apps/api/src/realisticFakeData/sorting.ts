import { GenericEntityItem } from './types';

import { Sorting } from '@kleeen/types';

export const sortList = (list: GenericEntityItem[], sortingList: Sorting = []) => {
  const sortedList = list;

  sortingList.map((sortObject) => {
    const key = sortObject.columnName;
    const isAsc = sortObject.sort === 0;

    sortedList.sort((x, y) => {
      const a = x[key].displayValue,
        b = y[key].displayValue;
      return a == b ? 0 : (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    });
  });

  return sortedList;
};
