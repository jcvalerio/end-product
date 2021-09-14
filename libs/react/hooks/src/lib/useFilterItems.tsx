import {
  AggregationType,
  Attribute,
  Cell,
  DataPointWithFormattedValue,
  DisplayValue,
  FilterOperators,
  FilterTypes,
  Filters,
} from '@kleeen/types';
import { ReactNode, useEffect, useState } from 'react';
import { areFiltersInUse, useLocalStorage, useUrlQueryParams, useUserInfo } from '@kleeen/react/hooks';
import { getFiltersInitialState, getTimestamp, manageOperations, mapWithStringify } from '../helpers';
import {
  isCountTransformations,
  isNumericType,
  isSingleCardinalityTransformation,
} from '@kleeen/frontend/utils';
import { isNilOrEmpty, upperCamelCase } from '@kleeen/common/utils';

import { Translate } from '@kleeen/core-react';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

export function useFilterItems({
  attr,
  cell,
  handleClose,
}: {
  handleClose: () => void;
  attr: Attribute;
  cell: Cell & { formattedValue: ReactNode | number };
}) {
  // TODO: @cafe refactor this logic into a single hook (reuse in useFilterSections and useFilters variants)
  const history = useHistory();
  const { paramsBasedOnRoute } = useUrlQueryParams({ useNestedObjects: true });
  const _user = useUserInfo();
  const userName = _user?.userInfo?.username;
  const localStorageKey = userName ? `filters-${history.location.pathname}-${userName}` : null;
  const { setLocalStorageValue } = useLocalStorage(localStorageKey, '');
  const [menuItems, setMenuItems] = useState([]);
  const filtersInUse = areFiltersInUse();

  useEffect(() => {
    const items = getFilterItems({
      dataPoint: {
        attribute: attr,
        formattedValue: cell.formattedValue,
        value: cell,
      },
      filtersInUse,
      handleClose,
      history,
      paramsBasedOnRoute,
      setLocalStorageValue,
    });

    setMenuItems(items);
  }, [filtersInUse, attr?.id, attr?.aggregation, cell.id, localStorageKey]);

  return menuItems;
}

export function getFilterItems({
  dataPoint,
  filtersInUse,
  handleClose,
  history,
  paramsBasedOnRoute,
  setLocalStorageValue,
}: {
  dataPoint: DataPointWithFormattedValue;
  filtersInUse: boolean;
  handleClose: () => void;
  history: any;
  paramsBasedOnRoute: Filters;
  setLocalStorageValue: (value: any) => void;
}) {
  const filtersAdded = getFiltersInitialState(paramsBasedOnRoute);

  const { attribute, formattedValue, value } = dataPoint;

  const handleFilterIn = (operator: FilterOperators) => () => () => {
    const category = upperCamelCase(attribute?.name);
    const newCategory = filtersAdded[category] || {};
    const newOperator = manageOperations(operator, value?.displayValue, newCategory[operator]);
    const newFilter = {
      ...filtersAdded,
      [category]: { ...newCategory, [operator]: newOperator },
    };
    // Get time filters from url
    const Timestamp = getTimestamp(paramsBasedOnRoute);
    const timeFilters = Object.keys(Timestamp).length ? { Timestamp } : { Timestamp: undefined };
    const filtersToApply = {
      ...newFilter,
      ...timeFilters,
    };

    setLocalStorageValue(filtersToApply);
    // Apply filters into url
    const urlQuery = queryString.stringify(mapWithStringify(filtersToApply));
    history.push(`?${urlQuery}`);
    handleClose();
  };

  const handleFilterOut = (operator: FilterOperators) => () => () => {
    const category = upperCamelCase(attribute?.name);
    const name = value?.displayValue;
    const newCategory = filtersAdded[category];

    if (operator === FilterOperators.in) {
      const currentOperatorValues = newCategory[operator] || [];
      const newOperatorValues = currentOperatorValues.filter((value) => name !== value);
      newCategory[operator] = newOperatorValues;

      if (newOperatorValues.length === 0) {
        delete newCategory[operator];
      }
    } else if (operator === FilterOperators.max || operator === FilterOperators.min) {
      delete newCategory[operator];
    }

    const newFilter = {
      ...filtersAdded,
      [category]: newCategory,
    };

    if (Object.keys(newCategory).length === 0) {
      delete newFilter[category];
    }
    // Get time filters from url
    const Timestamp = getTimestamp(paramsBasedOnRoute);
    const timeFilters = Object.keys(Timestamp).length ? { Timestamp } : { Timestamp: undefined };
    const filtersToApply = {
      ...newFilter,
      ...timeFilters,
    };

    setLocalStorageValue(filtersToApply);
    // Apply filters into url
    const urlQuery = queryString.stringify(mapWithStringify(filtersToApply));
    history.push(`?${urlQuery}`);
    handleClose();
  };

  const items = [];
  const transformation = attribute?.aggregation as AggregationType;

  if (filtersInUse && isSingleCardinalityTransformation(transformation)) {
    const inFiltersIn = existsInFilter(
      attribute?.name,
      value?.displayValue,
      FilterOperators.in,
      filtersAdded,
    );

    items.push({
      label: <Translate id="app.contextMenu.filter.equalTo" type="html" values={{ value: formattedValue }} />,
      handleClick: inFiltersIn ? handleFilterOut(FilterOperators.in) : handleFilterIn(FilterOperators.in),
      key: `filter.equals.${value?.id}`,
      roleAccessKey: `filter.equals.${attribute?.name}`,
      filterType: inFiltersIn ? FilterTypes.out : FilterTypes.in,
    });
  }

  // TODO: Review if "less/more than" filters should be included in avg/sum transformations
  if (filtersInUse && isNumericType(attribute) && !isCountTransformations(transformation)) {
    const inFiltersMax = existsInFilter(
      attribute?.name,
      value?.displayValue,
      FilterOperators.max,
      filtersAdded,
    );

    items.push({
      label: (
        <Translate id="app.contextMenu.filter.lessThan" type="html" values={{ value: formattedValue }} />
      ),
      handleClick: inFiltersMax ? handleFilterOut(FilterOperators.max) : handleFilterIn(FilterOperators.max),
      key: `filter.max.${attribute?.name}`,
      roleAccessKey: `filter.max.${attribute?.name}`,
      filterType: inFiltersMax ? FilterTypes.out : FilterTypes.in,
    });

    const inFiltersMin = existsInFilter(
      attribute?.name,
      value?.displayValue,
      FilterOperators.min,
      filtersAdded,
    );

    items.push({
      label: (
        <Translate id="app.contextMenu.filter.moreThan" type="html" values={{ value: formattedValue }} />
      ),
      handleClick: inFiltersMin ? handleFilterOut(FilterOperators.min) : handleFilterIn(FilterOperators.min),
      key: `filter.min.${attribute?.name}`,
      roleAccessKey: `filter.min.${attribute?.name}`,
      filterType: inFiltersMin ? FilterTypes.out : FilterTypes.in,
    });
  }

  return items;
}

//#region Private members
function existsInFilter(
  attribute: string,
  value: DisplayValue,
  operator: FilterOperators,
  filters: Filters,
): boolean {
  const capitalizedAttribute = upperCamelCase(attribute);
  const filteredAttr = filters[capitalizedAttribute];
  const filteredValues = filteredAttr ? filteredAttr[operator] : null;

  return !isNilOrEmpty(filteredValues) && Array.isArray(filteredValues)
    ? filteredValues.includes(value)
    : filteredValues === value;
}
//#endregion
