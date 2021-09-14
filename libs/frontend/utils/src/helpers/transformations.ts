import { AggregationType, Attribute, FilterForNumerics } from '@kleeen/types';

const countTransformations = [AggregationType.CountTotal, AggregationType.CountUnique];
const singleCardinalityTransformations = [
  AggregationType.Latest,
  AggregationType.Max,
  AggregationType.Min,
  AggregationType.NoAggregation,
  AggregationType.Oldest,
  AggregationType.SelfMulti,
  AggregationType.SelfSingle,
];

export function isCountTransformations(transformation: AggregationType) {
  return countTransformations.includes(transformation);
}

export function isNumericType(attr: Attribute) {
  return attr?.format?.isNumericType || FilterForNumerics.includes(attr?.statisticalType);
}

export function isSameAttribute(attr1: Attribute, attr2: Attribute) {
  return attr1.id === attr2.id && attr1.transformation === attr2.transformation;
}

export function isSingleCardinalityTransformation(transformation: AggregationType) {
  return singleCardinalityTransformations.includes(transformation);
}
