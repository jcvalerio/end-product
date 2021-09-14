import * as R from 'ramda';

import { Cardinality, Transformation, transformationsWithCrossLinking } from '../utils';
import { DataAggregationArgs, DataAggregationArgsDataPoint, GetWidgetDataResult } from '../types';
import { FakeDataDataPoint, GetWidgetData, PrimitiveTypes } from './types';
import { buildArrayOfNumbers, getDataList, getEntityFormat, getRandomNumber, getType } from './utils';
import { isNilOrEmpty, isNotNilOrEmpty } from '@kleeen/common/utils';

import { calculateTransformation } from './transformation';

const transformToFakeDataPoint = (
  dataPoint: DataAggregationArgsDataPoint,
  filters,
  uniqueByDisplayValue?: boolean,
): FakeDataDataPoint => {
  const { valueList: list, valueIdList: idList }: any = getDataList(
    dataPoint.name,
    filters,
    uniqueByDisplayValue,
  ); //TODO this "any" should be changed for the correct type
  const type = getType(list, dataPoint.name);
  const isCategorical = type === PrimitiveTypes.String || type === PrimitiveTypes.Boolean;
  const isSelf =
    dataPoint.transformation === Transformation.SelfSingle ||
    dataPoint.transformation === Transformation.SelfMulti;
  return {
    ...dataPoint,
    idList,
    isCategorical,
    isSelf,
    list,
    type,
  };
};

const noAggregationWithGroupByCategorical = (
  value: FakeDataDataPoint,
  groupBy: FakeDataDataPoint,
): GetWidgetDataResult => {
  const groupByFormat = getEntityFormat(groupBy.name);
  const valueFormat = getEntityFormat(value.name);
  if (groupBy.isCategorical && value.isCategorical) {
    const groupByIndexByValueIndex = groupBy.list.map((_, i) => [i, getRandomNumber(value.list.length)]);

    return {
      format: {
        xAxis: { categories: groupBy.list, key: groupBy.name, type: groupBy.type, ...groupByFormat },
        yAxis: { categories: value.list, key: value.name, type: value.type, ...valueFormat },
      },
      results: groupByIndexByValueIndex,
      crossLinking: [groupBy.idList, value.idList],
    };
  }

  const max = Math.max(...(value.list as []), 1);

  const results = groupBy.list.map((_, i) => [i, getRandomNumber(max)]);
  return {
    format: {
      xAxis: { categories: groupBy.list, key: groupBy.name, type: groupBy.type, ...groupByFormat },
      yAxis: { key: value.name, type: value.type, ...valueFormat },
    },
    results,
    crossLinking: [groupBy.idList, value.idList],
  };
};

/**
 * Each groupBy has multiple values.
 * returns [[0, 7], [0, 8], [0, 6], [0, 5], [1, 5], [1, 6], [1, 7], [1, 9], [1, 9], [1, 9]]
 * @example
 * toMultipleResults(['superman', 'batman'], [4,5,6,7,9,7,8,10]);
 *
 */
const toMultipleResults = (groupByList, valueList): number[][] => {
  const indexValueList = groupByList.map((_, groupByIndex) => {
    const emptyList = Array(getRandomNumber(valueList.length));
    const extractedValues = Array.from(emptyList, () => valueList[getRandomNumber(emptyList.length)]);

    return extractedValues.map((valueSubList) => [groupByIndex, valueSubList]);
  });

  return R.unnest(indexValueList);
};

/**
 * Each groupBy has an transformed value (count, max, min, sum, etc).
 * returns [[20, 1000], [40, 1500], [23, 1100], [10, 2000], [120, 1750]]
 * @example
 * toNumericalResults([20, 40, 23, 10, 120], [1000, 1500, 1100, 2000, 1750]);
 *
 */
const toNumericalResults = (groupByList: number[], valueList: number[]): number[][] => {
  const groupByListSorted = [...groupByList].sort((a, b) => a - b);
  const numericalResults = groupByListSorted
    .map((groupByValue, index) => [groupByValue as number, valueList[index] as number])
    .filter((data) => data.every(isNotNilOrEmpty));

  return numericalResults;
};

const getWidgetDataNoGroupBy = (value: FakeDataDataPoint): GetWidgetDataResult | any => {
  const valueFormat = getEntityFormat(value.name);
  const format = {
    type: value.type,
    key: value.name,
    ...valueFormat,
  };
  const hasCrosslinking =
    value.transformation && transformationsWithCrossLinking.includes(value.transformation);
  const crossLinking = hasCrosslinking
    ? value.transformation === Transformation.SelfMulti
      ? value.idList
      : value.idList?.[0]
    : [];
  const transformedValue = calculateTransformation(value.list || [], value.transformation);
  return {
    format,
    crossLinking,
    results: transformedValue,
  };
};

const getWidgetDataOneGroupBy = (
  value: FakeDataDataPoint,
  groupBy: FakeDataDataPoint,
  cardinality?: Cardinality,
): GetWidgetDataResult | any => {
  const groupByFormat = getEntityFormat(groupBy.name);
  const valueFormat = getEntityFormat(value.name);
  if (value.isSelf) {
    if (cardinality === Cardinality.Single) {
      if (groupBy.isCategorical) {
        return noAggregationWithGroupByCategorical(value, groupBy);
      }

      if (!groupBy.isCategorical && value.isCategorical) {
        return {
          format: {
            xAxis: { type: groupBy.type, key: groupBy.name, ...groupByFormat },
            yAxis: { categories: value.list, type: value.type, key: value.name, ...valueFormat },
          },
          results: groupBy.list,
          crossLinking: [groupBy.idList, value.idList], // check if we can skip this completely (we should)
        };
      }

      if (!groupBy.isCategorical && !value.isCategorical) {
        const numericalResults = toNumericalResults(groupBy.list as number[], value.list as number[]);
        return {
          format: {
            xAxis: { type: groupBy.type, key: groupBy.name, ...groupByFormat },
            yAxis: { type: value.type, key: value.name, ...valueFormat },
          },
          results: numericalResults,
          crossLinking: [groupBy.idList, value.idList],
        };
      }
    }
    // cardinality: multi & value/groupBy
    // results: [[0, 54], [0, 58], [1, 28]]
    // categories: [100, 200, 300]
    if (Cardinality.Multi === cardinality) {
      const results = toMultipleResults(groupBy.list, value.list);

      return {
        format: {
          xAxis: { categories: groupBy.list, type: groupBy.type, ...groupByFormat },
        },
        results,
        crossLinking: [groupBy.idList, []], // check if we can skip this completely (we should)
      };
    }
  }

  // This means 2 things:
  // 1- Value is always an array of numbers with cardinality 1, unless it is max/min.
  // 2- isValueSelf === Value Transformation is one of [max, min, count, average]
  if (!value.isSelf) {
    if (groupBy.isCategorical) {
      // cardinality: single / multi
      // categories: [superman, batman]
      // results are counts: [400, 200, 300] // value ==> return array of numbers
      return {
        format: {
          xAxis: { categories: groupBy.list, type: groupBy.type, key: groupBy.name, ...groupByFormat },
          yAxis: { type: value.type, key: value.name, ...valueFormat },
        },
        results: buildArrayOfNumbers(groupBy.list.length, valueFormat.min, valueFormat.max),
        crossLinking: [groupBy.idList, []], // check if we can skip this completely (we should)
      };
    }

    if (!groupBy.isCategorical) {
      const results = toNumericalResults(
        groupBy.list as number[],
        buildArrayOfNumbers(value.list.length, valueFormat.min, valueFormat.max),
      );
      return {
        format: {
          xAxis: { type: groupBy.type, key: groupBy.name, ...groupByFormat },
          yAxis: { type: value.type, key: value.name, ...valueFormat },
        },
        results,
        crossLinking: [groupBy.idList, []], // check if we can skip this completely (we should)
      };
    }
  }
};

const getDataPointObject = (dataPoint: FakeDataDataPoint, list = [], idList = []): FakeDataDataPoint => {
  let newDataPoint;
  Object.keys(dataPoint).forEach(() => {
    newDataPoint = {
      ...dataPoint,
      list,
      idList,
    };
  });
  return newDataPoint;
};

export const getWidgetData: GetWidgetData = (input: DataAggregationArgs): GetWidgetDataResult | any => {
  const value = transformToFakeDataPoint(input.value, input.filters);

  if (!isNilOrEmpty(input.groupBy)) {
    // TODO: uniqueByDisplayValue is false in order to generate all the points, once the results are limited by the groupbys
    const groupBy = transformToFakeDataPoint(input.groupBy, input.filters, false);

    return getWidgetDataOneGroupBy(value, groupBy, input.cardinality);
  } else {
    return getWidgetDataNoGroupBy(value);
  }
};
