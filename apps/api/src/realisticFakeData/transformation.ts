import { PrimitiveType } from './types';
import { Transformation } from '../utils';

const transformationResolvers: {
  [key in Transformation]?: (list: PrimitiveType[]) => PrimitiveType | PrimitiveType[];
} = {
  [Transformation.Average]: averageElement,
  [Transformation.ChangeCount]: changeCountElement,
  [Transformation.ChangePercent]: changePercentElement,
  [Transformation.CountTotal]: countElements,
  [Transformation.CountUnique]: countUniqueElements,
  [Transformation.Latest]: lastElement,
  [Transformation.Max]: maxElement,
  [Transformation.MaxSparkline]: maxSparklineElement,
  [Transformation.Min]: minElement,
  [Transformation.Oldest]: firstElement,
  [Transformation.SelfSingle]: firstElement,
  [Transformation.SelfMulti]: selfMulti,
  [Transformation.Sum]: sumElement,
  [Transformation.TrendCountSparkline]: trendCountElement,
  [Transformation.TrendCountHighLowSparkline]: trendCountElement,
  [Transformation.TrendCountVsEndSparkline]: trendCountElement,
  [Transformation.TrendCountVsStartSparkline]: trendCountElement,
  [Transformation.TrendSparkline]: trendElement,
  [Transformation.TrendHighLowSparkline]: trendElement,
  [Transformation.TrendVsEndSparkline]: trendElement,
  [Transformation.TrendVsStartSparkline]: trendElement,
};

export const calculateTransformation = (
  list: PrimitiveType[],
  transformation?: Transformation,
): PrimitiveType | PrimitiveType[] => {
  const resolver = transformation && transformationResolvers[transformation];
  return resolver ? resolver(list) : randomElement(list);
};

function averageElement(list: PrimitiveType[]): PrimitiveType {
  return (sumElement(list) as number) / (countElements(list) as number);
}

function changeCountElement(list: PrimitiveType[]): PrimitiveType {
  const randomPositiveTotal = Math.random() * 100;
  const randomTotal = Math.random() > 0.5 ? randomPositiveTotal : randomPositiveTotal * -1;
  const roundedTotal = Math.round(randomTotal);

  return roundedTotal;
}

function changePercentElement(list: PrimitiveType[]): PrimitiveType {
  const randomPositivePercentage = Math.random() * 100;
  const randomPercentage = Math.random() > 0.5 ? randomPositivePercentage : randomPositivePercentage * -1;
  const roundedPercentage = Math.round(randomPercentage);
  return roundedPercentage;
}

function countElements(list: PrimitiveType[]): PrimitiveType {
  return Math.floor(Math.random() * (201 - 20)) + 20;
}

function countUniqueElements(list: PrimitiveType[]): PrimitiveType {
  return Math.floor(Math.random() * (201 - 20)) + 20;
}

function firstElement(list: PrimitiveType[]): PrimitiveType {
  return list[0];
}

function lastElement(list: PrimitiveType[]): PrimitiveType {
  return list[list.length - 1];
}

function maxElement(list: PrimitiveType[]): PrimitiveType {
  const dataType = typeof list[0];
  if (dataType === 'number') {
    const numbersArray = list as number[];
    return Math.max(...numbersArray);
  }
  return lastElement(list);
}

function maxSparklineElement(list: PrimitiveType[]): PrimitiveType[] {
  const max = maxElement(list) as number;
  const total = sumElement(list);

  return [max, total - max];
}

function minElement(list: PrimitiveType[]): PrimitiveType {
  const dataType = typeof list[0];
  if (dataType === 'number') {
    const numbersArray = list as number[];
    return Math.min(...numbersArray);
  }
  return firstElement(list);
}

function randomElement(list: PrimitiveType[]): PrimitiveType {
  return Math.floor(Math.random() * list.length);
}

function sumElement(list: PrimitiveType[]): number {
  const numbersArray = list as number[];
  const validatedResult: number[] = Number.isInteger(numbersArray[0]) ? numbersArray : [];

  return validatedResult.reduce((row, acc) => row + acc, 0);
}

function selfMulti(list: PrimitiveType[]): PrimitiveType[] {
  return list;
}

function trendCountElement(list: PrimitiveType[]): number[] {
  return list.slice(0, 10).map(() => Math.floor(Math.random() * 100));
}

function trendElement(list: PrimitiveType[]): PrimitiveType[] {
  return list.slice(0, 10);
}
