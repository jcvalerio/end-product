import { DisplayMediaKapiTypeSupported, DisplayMediaType, IntervalDate } from '@kleeen/types';
import { Entity, GenericEntityItem, GenericEntityItemNestedDisplayValue, PrimitiveTypes } from './types';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';

import { KapiDb } from '@kleeen/kleeen-api';
import codeCountries from './countryCode.json';
import { isNilOrEmpty } from '@kleeen/common/utils';
import kapiEntities from '../assets/entities.json';

export const TIMESTAMP = 'timestamp';

export const generateDisplayMediaByType = (dataType, displayValue, attribute) => {
  switch (dataType) {
    case DisplayMediaKapiTypeSupported.Username:
    case DisplayMediaKapiTypeSupported.FullName:
    case DisplayMediaKapiTypeSupported.FirstName:
      return {
        type: DisplayMediaType.Src,
        value: `https://fakeface.rest/thumb/view/${Math.floor(Math.random() * 1000)}`,
      };
    case DisplayMediaKapiTypeSupported.City:
    case DisplayMediaKapiTypeSupported.Prime:
      return { type: DisplayMediaType.Text, value: displayValue };
    case DisplayMediaKapiTypeSupported.Country:
      return {
        type: DisplayMediaType.Flag,
        value: `https://www.countryflags.io/${codeCountries[displayValue] || 'AH'}/shiny/64.png`,
      };
    case DisplayMediaKapiTypeSupported.CountryCode:
      return {
        type: DisplayMediaType.Flag,
        value: `https://www.countryflags.io/${displayValue}/shiny/64.png`,
      };
    case DisplayMediaKapiTypeSupported.SeverityLevel:
      const severityLevels = attribute?.format?.valueLabels || [];
      function isSeverityObject(severityObject) {
        return severityObject.label === displayValue;
      }
      return {
        type: DisplayMediaType.Svg,
        value: `https://raw.githubusercontent.com/KLEEEN-SOFTWARE/Kleeen-svgs/main/assets/severity-levels-svgs/severity-level-${
          severityLevels?.find(isSeverityObject)?.value
        }of${attribute?.format?.valueLabels?.length}.svg`,
      };
    default:
      return null;
  }
};

const relativeCalculations = (relativeDateKey: IntervalDate): number => {
  const isInvalidRelativeKey = !Object.values(IntervalDate).includes(relativeDateKey);
  const isAllTime = relativeDateKey === IntervalDate.allTime;

  if (isInvalidRelativeKey || isAllTime) {
    return 0; // case when relativeDate key have an unknown value
  }
  const now = moment();
  const [amount, unit] = relativeDateKey.split(',');

  const from = now.subtract(amount as DurationInputArg1, unit as DurationInputArg2);

  return moment.utc(from).valueOf();
};

export const toEntityName = (maybeString?: string): string => {
  const name = typeof maybeString === 'string' ? maybeString.trim() : '';
  return name.length > 0 ? `${name[0].toUpperCase()}${name.substring(1, name.length)}` : '';
};

export const toPropertyName = (maybeString?: string): string => {
  const name = typeof maybeString === 'string' ? maybeString.trim() : '';
  return name.length > 0 ? `${name[0].toLowerCase()}${name.substring(1, name.length)}` : '';
};

export const buildArrayOfNumbers = (length: number, minValue?: number, maxValue?: number): number[] =>
  Array.from(
    Array(length),
    () => Math.floor(Math.random() * ((maxValue || 200) - (minValue || 0))) + (minValue || 0),
  )
    .slice()
    .sort((a, b) => a - b);

export const filterValidations = (value, displayInLower, row): boolean[] => {
  const validations: any[] = [];
  if (value._in) {
    const isIncluded = value?._in?.some((element) => displayInLower.includes(String(element).toLowerCase()));
    validations.push(isIncluded);
  }

  if (value.max) {
    const displayAsNumber = Number(displayInLower);
    const valueAsNumber = Number(value.max);
    const isLessThan = displayAsNumber <= valueAsNumber;
    validations.push(isLessThan);
  }

  if (value.min) {
    const displayAsNumber = Number(displayInLower);
    const valueAsNumber = Number(value.min);
    const isMoreThan = displayAsNumber >= valueAsNumber;
    validations.push(isMoreThan);
  }

  if (value.relativeDate) {
    const rowTime = row?.timestamp?.displayValue || row?.displayValue;
    const relativeFrom = relativeCalculations(value.relativeDate);
    const isInRelative = rowTime > relativeFrom;
    validations.push(isInRelative);
  }

  if (value.from) {
    const rowTime = row?.timestamp?.displayValue || row?.displayValue;
    const from = Number(value.from);
    const isGreaterThan = rowTime > from;
    validations.push(isGreaterThan);
  }

  if (value.to) {
    const rowTime = row?.timestamp?.displayValue || row?.displayValue;
    const to = Number(value.to);
    const isLessThan = rowTime < to;
    validations.push(isLessThan);
  }

  return validations;
};

const manageFilter = (value, row) => {
  const displayInLower = String(row.displayValue).toLowerCase();
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

  const entitiesFiltered = Object.entries(filters).filter(
    ([filter]) => filter.toLowerCase() === entityName.toLowerCase(),
  );

  if (Array.isArray(list) && Array.isArray(entitiesFiltered) && entitiesFiltered.length) {
    filteredList = list.filter((row) => entitiesFiltered.every(([_, value]) => manageFilter(value, row)));
  }

  return filteredList;
};

function uniqByKeepFirst(list: GenericEntityItem[]): GenericEntityItem[] {
  const seen = new Set();
  return list.filter((item) => {
    const displayValue = item.displayValue;
    return seen.has(displayValue) ? false : seen.add(displayValue);
  });
}

export const getDataList = (entityName: string, filters: any = {}, uniqueByDisplayValue?: boolean) => {
  const list = KapiDb.listByName<GenericEntityItemNestedDisplayValue>(toEntityName(entityName));
  if (!list) throw `The entity [${entityName}] does not exists.`;

  const listWithoutDisplayValue = list.map((item) =>
    item.displayValue?.displayValue ? { ...item, displayValue: item.displayValue.displayValue } : item,
  ) as GenericEntityItem[];

  const listWithoutDuplicates = uniqueByDisplayValue
    ? uniqByKeepFirst(listWithoutDisplayValue)
    : listWithoutDisplayValue;
  const filteredList = filterList(listWithoutDuplicates, entityName, filters);

  const xorEntityType = (item, entityNameToUse): string =>
    item[`${entityNameToUse}Type`] ? item[`${entityNameToUse}Type`]?.displayValue : '';

  return {
    valueList: filteredList.map((item) => item.displayValue).sort((a, b) => (a as number) - (b as number)),
    valueIdList: filteredList.map((item) => ({
      id: item.id,
      $metadata: { entityType: xorEntityType(item, entityName) },
    })),
  };
};

export const findEntityByName = (entityName: string, entities?): Entity | any => {
  const entityCollection = isNilOrEmpty(entities) ? kapiEntities : entities;
  return entityCollection.find((entity) => entity.name.toLocaleLowerCase() === entityName.toLowerCase());
};

export const getRandomNumber = (from: number, adder = 0): number => {
  return Math.floor(Math.random() * from + adder);
};

export const getStatisticalType = (entityName: string): string => {
  const entity: Entity | any = findEntityByName(entityName);
  return entity?.properties?.displayValue?.statisticalType || '';
};

export const getEntityType = (entityName: string): string => {
  const entity: Entity | any = findEntityByName(entityName);
  return entity?.properties?.displayValue?.type || '';
};

export const getEntityFormat = (entityName: string): any => {
  const entity: Entity | any = findEntityByName(entityName);
  return entity?.properties?.displayValue?.format || {};
};

export const getPropertyFormat = (entityName: string, propertyName: string): any => {
  const entity: Entity | any = findEntityByName(entityName);
  return entity?.properties?.[propertyName]?.format || {};
};

export const getType = (list: (string | number | boolean | any)[], entityName: string): PrimitiveTypes => {
  const entityType = getEntityType(entityName);

  if (entityType === TIMESTAMP) {
    return PrimitiveTypes.Date;
  }

  const value = list.filter(Boolean)[0];
  const type = typeof value;

  return type as PrimitiveTypes;
};
export const wait = (ms: number) => {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};
