import { Attribute, TransformationResponse } from '@kleeen/types';

export interface SummaryStatisticsProps {
  attributes: Attribute[];
  data: TransformationResponse[];
  widgetId: string;
}
