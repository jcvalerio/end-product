import { WidgetDataAttributes } from '@kleeen/types';
import React from 'react';

interface Filters {
  [key: string]: string;
}
const FILTER_COLUMNS_VALUE = 'all';

const handleFilter = (
  list: any[],
  setRows: React.Dispatch<React.SetStateAction<any[]>>,
  filters: Filters,
  column: string,
  searchValue: string,
) => {
  let filterList = Object.entries(filters);
  if (Array.isArray(list) && Array.isArray(filterList) && filterList.length) {
    let tempFilter;
    if (column !== FILTER_COLUMNS_VALUE) {
      filterList = filterList.filter((q) => q[0] !== FILTER_COLUMNS_VALUE);
      tempFilter = list.filter((row) =>
        filterList.every(([column, value]) => {
          if (column !== 'all') {
            if (Array.isArray(row[column])) {
              return row[column].some(
                (result) =>
                  result.hasOwnProperty(WidgetDataAttributes.DisplayValue) &&
                  String(result.displayValue).toLowerCase().includes(value.toLowerCase()),
              );
            }

            return (
              row[column] &&
              row[column].hasOwnProperty(WidgetDataAttributes.DisplayValue) &&
              String(row[column].displayValue).toLowerCase().includes(value.toLowerCase())
            );
          }
          return false;
        }),
      );
    } else {
      tempFilter = list.map((row) => {
        const results = [];
        for (const prop in row) {
          if (row[prop].hasOwnProperty(WidgetDataAttributes.DisplayValue)) {
            const result =
              String(row[prop]?.displayValue).toLowerCase().includes(searchValue.toLowerCase()) && row;

            if (result) {
              results.push(result);
            }
          }
        }
        return results;
      });
      tempFilter = tempFilter.filter((q) => q && q.length > 0).map((q) => q[0]);
    }
    setRows(tempFilter);
  }
};

const useFilter = (list: Array<any>): [{ rows: Array<any> }, (column: string, value: string) => void] => {
  const [rows, setRows] = React.useState([]);
  const [_, setFilters] = React.useState({});

  React.useEffect(() => {
    setRows(list);
  }, [list]);

  const handleChange = (column: string, value: string) => {
    setFilters((state: Filters) => {
      const newFilters = {
        ...state,
        [column]: value,
      };
      handleFilter(list, setRows, newFilters, column, value);

      return newFilters;
    });
  };

  return [{ rows }, handleChange];
};

export default useFilter;
