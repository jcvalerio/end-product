import { BaseTrend } from './base';
import { DisplayComponentProps } from '@kleeen/types';
import { trendFormatter } from '@kleeen/frontend/utils';

export function TrendSparklineVsEnd({ highlighted, value }: DisplayComponentProps) {
  const highlightEnd = true;
  const dataFormatted = trendFormatter({
    highlightEnd,
    radiusSize: highlighted && 3,
    values: value?.displayValue,
  });

  return (
    <BaseTrend
      color="var(--viz5)"
      dataFormatted={dataFormatted}
      dataRaw={value?.displayValue}
      highlighted={highlighted}
      highlightEnd={highlightEnd}
    />
  );
}
