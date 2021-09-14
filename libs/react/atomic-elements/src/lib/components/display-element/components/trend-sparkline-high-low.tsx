import { BaseTrend } from './base';
import { DisplayComponentProps } from '@kleeen/types';
import { trendFormatter } from '@kleeen/frontend/utils';

export function TrendSparklineHighLow({ highlighted, value }: DisplayComponentProps) {
  const dataFormatted = trendFormatter({
    highlightMinMax: true,
    radiusSize: highlighted && 3,
    values: value?.displayValue,
  });

  return <BaseTrend color="var(--viz7)" dataFormatted={dataFormatted} highlighted={highlighted} />;
}
