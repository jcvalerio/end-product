import { FormatProps, Row, ViewOption, ViewOptionFormattedType } from '@kleeen/types';
import { isNil, pipe } from 'ramda';

import camelCase from 'lodash.camelcase';
import { isNilOrEmpty } from '../validators';
import mergeWith from 'lodash.mergewith';
import uniqueId from 'lodash.uniqueid';
import upperFirst from 'lodash.upperfirst';
import { v4 as uuid } from 'uuid';

export const generateId = (id?: string): string => id || uuid();

export const generateUniqueId = (str: string): string => uniqueId(str ? str : '');

export const average = (arr: number[]): number => arr.reduce((p, c) => p + c, 0) / arr.length;

export const isValidArray = (maybeArray: unknown): boolean =>
  Array.isArray(maybeArray) && maybeArray.length > 0;

export function getRowDisplayValue(row?: Row, entityName?: string): boolean | number | string | undefined {
  const value = row?.[`displayValue::${entityName}`];
  return value?.displayValue;
}

// TODO: these "any" should be changed for the correct type
export function mergeByOrAppend<T>(source: T[] = [], override: T[] = [], predicate: string): T[] {
  if (isNil(source)) return [];

  if (isNilOrEmpty(override)) return source;

  const appendedResults = override.reduce((acc: T[], overwriteObj) => {
    const isAppendResult = !source.some((sourceObj) => sourceObj[predicate] === overwriteObj[predicate]);

    if (isAppendResult) {
      acc.push(overwriteObj);
    }

    return acc;
  }, []);

  const mergedResults = mergeBy(source, override, predicate);

  return [...mergedResults, ...appendedResults];
}

export function overwriteFormat(backendFormat: unknown, attributeFormat: unknown): FormatProps | unknown {
  if (!isNilOrEmpty(backendFormat)) {
    return backendFormat;
  }

  if (!isNilOrEmpty(attributeFormat)) {
    return attributeFormat;
  }

  return {};
}

export function roleAccessKeyTag(stringToValidate: string): string {
  return stringToValidate
    .split('.')
    .map((key) => key.replace(/\s+/g, '').toUpperCase())
    .join('.');
}

export const upperCamelCase = (value = ''): string =>
  pipe<string, string, string>(camelCase, upperFirst)(value);

export const NEW_ROW_ID_PREFIX = 'temporary';
export const SHOW_DROPDOWN_THRESHOLD = 4;

export function formatViewOptions(viewOptions: ViewOption[]): ViewOptionFormattedType[] {
  return viewOptions.map((option, index) => {
    const { name, viewOrder } = option;
    return {
      label: name,
      viewOrder: isNilOrEmpty(viewOrder) ? index : viewOrder,
      value: name,
      option,
    };
  });
}
//#region Private Members

// Lodash mergeByCustomizer, returns undefined to use the regular mergeBy function
function mergeByCustomizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return [...srcValue];
  }
}

function mergeBy<T>(source: T[], override: T[], predicate: string): T[] {
  if (isNilOrEmpty(source)) {
    return [];
  }

  if (isNilOrEmpty(override)) {
    return source;
  }

  return source.map((sourceObj) => {
    const overrideObj = override.find(
      (possibleOverrideObj) => sourceObj[predicate] === possibleOverrideObj[predicate],
    );
    return overrideObj ? mergeWith({}, sourceObj, overrideObj, mergeByCustomizer) : sourceObj;
  });
}

export const sortByViewOrder = ({ viewOrder: firstOrder = 0 }, { viewOrder: secondOrder = 0 }) =>
  Number(firstOrder) - Number(secondOrder);

export function sortByKeys<T>(
  viewOptions: T[],
  [firstKey, secondKey]: [fistKey: string, secondKey: string],
): T[] {
  const sortedViewsByOrder = viewOptions
    .filter((view) => !isNilOrEmpty(view[firstKey]))
    .sort((first, second) => {
      return first[firstKey] > second[firstKey] ? 1 : -1;
    });

  const sortedViewsById = viewOptions
    .filter((view) => isNilOrEmpty(view[firstKey]))
    .sort((first, second) => (first[secondKey] > second[secondKey] ? 1 : -1));

  return [...sortedViewsByOrder, ...sortedViewsById];
}
//#endregion
