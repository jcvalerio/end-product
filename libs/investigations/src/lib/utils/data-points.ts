import { AggregationType, DataPointWithFormattedValue } from '@kleeen/types';
import { isSameAttribute, isSingleCardinalityTransformation } from '@kleeen/frontend/utils';

interface GetContextDataPointsProps {
  dataPointToShow: DataPointWithFormattedValue;
  dataPoints: DataPointWithFormattedValue[];
}

export function getContextDataPoints({
  dataPointToShow,
  dataPoints,
}: GetContextDataPointsProps): DataPointWithFormattedValue[] {
  return dataPoints.filter((dataPoint) => {
    return (
      !isSameAttribute(dataPointToShow.attribute, dataPoint.attribute) &&
      isSingleCardinalityTransformation(dataPoint.attribute.aggregation as AggregationType)
    );
  });
}
