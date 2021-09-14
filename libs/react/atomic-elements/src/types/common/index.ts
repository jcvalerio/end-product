import { isNil, propOr } from 'ramda';

import { AggregationType } from '@kleeen/types';

export const getAggregationLabel = (transformation: string, withoutOf?: boolean): string => {
  if (isNil(transformation)) {
    return '';
  }
  const ofString = withoutOf ? '' : ' of';

  const aggregationMap = {
    [AggregationType.Average]: `Average${ofString}`,
    [AggregationType.ChangeCount]: `Change in Count ${ofString}`,
    [AggregationType.ChangePercent]: `Change${ofString}`,
    [AggregationType.CountTotal]: `Total Count${ofString}`,
    [AggregationType.CountUnique]: `Unique Count${ofString}`,
    [AggregationType.Latest]: `Latest${ofString}`,
    [AggregationType.Max]: `Max${ofString}`,
    [AggregationType.MaxSparkline]: `Max/Largest${ofString}`,
    [AggregationType.Min]: `Min${ofString}`,
    [AggregationType.Oldest]: `Oldest${ofString}`,
    [AggregationType.SelfSingle]: '',
    [AggregationType.Sum]: `Sum${ofString}`,
    [AggregationType.TrendCountSparkline]: `Trend Count${ofString}`,
    [AggregationType.TrendCountHighLowSparkline]: `Trend Count High/Low${ofString}`,
    [AggregationType.TrendCountVsEndSparkline]: `Trend Count vs End${ofString}`,
    [AggregationType.TrendCountVsStartSparkline]: `Trend Count vs Start${ofString}`,
    [AggregationType.TrendSparkline]: `Trend${ofString}`,
    [AggregationType.TrendHighLowSparkline]: `Trend High/Low${ofString}`,
    [AggregationType.TrendVsEndSparkline]: `Trend vs End${ofString}`,
    [AggregationType.TrendVsStartSparkline]: `Trend vs Start${ofString}`,
  };

  return propOr('', transformation)(aggregationMap);
};

export function getFullLabel({
  label,
  transformation,
  withoutOf = false,
}: {
  label: string;
  transformation: string;
  withoutOf?: boolean;
}): string {
  return `${getAggregationLabel(transformation, withoutOf)} ${label}`;
}
