import { GenericEntityItem } from './types';
import { filterValidations } from './utils';

const manageFilter = (value, row, entityName) => {
  const displayInLower = String(row[`displayValue::${entityName}`].displayValue).toLowerCase();
  const validations = filterValidations(value, displayInLower, row);

  if (validations.length) {
    return validations.reduce((a, b) => a && b);
  }

  const flatValues = [value].flat();
  const idInLower = String(row.id).toLowerCase();
  const someWithDisplayValue = flatValues.some((element) => displayInLower.includes(element.toLowerCase()));

  const someWithId = flatValues.some((element) => idInLower.includes(element.toLowerCase()));

  return someWithDisplayValue || someWithId;
};

export const filterList = (list: GenericEntityItem[], entityName: string, filters: any = {}) => {
  let filteredList = list;

  const filterList = Object.entries(filters).filter(
    ([filter]) => filter.toLowerCase() === entityName.toLowerCase() || filter.toLowerCase() === 'timestamp',
  );

  if (Array.isArray(list) && Array.isArray(filterList) && filterList.length) {
    filteredList = list.filter((row) =>
      filterList.every(([_, value]) => manageFilter(value, row, entityName)),
    );
  }

  return filteredList;
};
