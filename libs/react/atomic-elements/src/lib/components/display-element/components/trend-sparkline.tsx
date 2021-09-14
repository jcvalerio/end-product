import { BaseTrend } from './base';
import { DisplayComponentProps } from '@kleeen/types';

export function TrendSparkline({ highlighted, value }: DisplayComponentProps) {
  return <BaseTrend dataFormatted={value?.displayValue} highlighted={highlighted} />;
}
