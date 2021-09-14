import { Filters } from './filters';
import { WidgetScope } from '../enums/widgets';

export interface InvestigationDataPoint {
  entityId: number;
  scope: WidgetScope;
}

export interface InvestigationMetadata {
  createdAt: string;
  user?: string;
}

export interface InvestigationCard {
  dataPoint?: InvestigationDataPoint;
  filters?: Filters;
  followUpCards?: InvestigationCard[];
  metadata: InvestigationMetadata;
  widgetId?: string;
}
