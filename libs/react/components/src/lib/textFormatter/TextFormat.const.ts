import { AggregationType } from '@kleeen/types';
import { RestrictionProps } from './TextFormat.model';

export const Restriction: RestrictionProps = {
  [AggregationType.AlphabeticalBucket]: true,
  [AggregationType.AlphaTier]: true,
  [AggregationType.Average]: true,
  [AggregationType.Bucket]: true,
  [AggregationType.ChangeCount]: true,
  [AggregationType.ChangePercent]: true,
  [AggregationType.CountTotal]: true,
  [AggregationType.CountUnique]: true,
  [AggregationType.CustomAggregation]: true,
  [AggregationType.CustomCount]: true,
  [AggregationType.CustomTrend]: true,
  [AggregationType.Max]: false,
  [AggregationType.MedianMiddl]: true,
  [AggregationType.Min]: false,
  [AggregationType.ModeFrequent]: false,
  [AggregationType.SelfMulti]: false,
  [AggregationType.SelfSingle]: false,
  [AggregationType.Sum]: true,
  [AggregationType.Tier]: true,
  [AggregationType.Unique]: false,
};
