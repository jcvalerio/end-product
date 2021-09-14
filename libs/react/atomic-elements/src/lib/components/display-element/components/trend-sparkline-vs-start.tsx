import { BaseTrend } from './base';
import { DisplayComponentProps } from '@kleeen/types';
import { trendFormatter } from '@kleeen/frontend/utils';

export function TrendSparklineVsStart({ highlighted, value }: DisplayComponentProps) {
  const highlightStart = true;
  const dataFormatted = trendFormatter({
    highlightStart,
    radiusSize: highlighted && 3,
    values: value?.displayValue,
  });

  return (
    <BaseTrend
      color="var(--viz3)"
      dataFormatted={dataFormatted}
      dataRaw={value?.displayValue}
      highlighted={highlighted}
      highlightStart={highlightStart}
    />
  );
}
