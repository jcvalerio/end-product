import { InvestigationMetadata } from '@kleeen/types';
import { LibraryWidget } from '@kleeen/widgets';

export interface ResolvedInvestigationMetadata extends InvestigationMetadata {
  cardLevel: number;
  otherSolutions?: string[]; // TODO: Improve this naming
}

export interface WidgetWithMetadata extends LibraryWidget {
  metadata: ResolvedInvestigationMetadata;
}
