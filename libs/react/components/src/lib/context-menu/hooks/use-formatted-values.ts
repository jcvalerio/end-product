import { ContextMenuDataPoint, DataPointWithFormattedValue } from '@kleeen/types';
import { getTextFormatter, useLocalization } from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { FormattedContextDataPoint } from '../context-menu.model';
import { isNilOrEmpty } from '@kleeen/common/utils';

export interface UseFormattingProps {
  dataPoints: ContextMenuDataPoint[];
}

export function useDataPointsWithFormattedValue({
  dataPoints,
}: UseFormattingProps): FormattedContextDataPoint[] {
  const { language } = useLocalization();
  const [dataPointsWithFormat, setDataPointsWithFormat] = useState<DataPointWithFormattedValue[]>([]);

  useEffect(() => {
    if (isNilOrEmpty(dataPoints)) {
      return;
    }

    if (isNilOrEmpty(language)) {
      return;
    }

    const tempDataPointsWithFormat = dataPoints.map((dataPoint): DataPointWithFormattedValue => {
      const { attribute, value } = dataPoint;
      const formatter = getTextFormatter({
        attributeFormat: {
          format: attribute.format,
          formatType: attribute.formatType,
          transformation: attribute.aggregation,
        },
        language,
      });
      return {
        ...dataPoint,
        formattedValue: formatter(value.displayValue),
      };
    });

    setDataPointsWithFormat(tempDataPointsWithFormat);
  }, [dataPoints?.length, language]);

  return dataPointsWithFormat;
}
