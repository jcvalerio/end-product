import { InvestigationCard, Maybe } from '@kleeen/types';
import { LibraryWidget, getWidget, getWidgetsByEntity } from '@kleeen/widgets';

import { WidgetWithMetadata } from '../types';
import { getWidgetWithFilters } from '../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface ResolveInvestigationProps {
  investigationCard: InvestigationCard;
  cardLevel?: number;
}

export function resolveInvestigation(props: ResolveInvestigationProps): WidgetWithMetadata[] {
  const resolvedCards = resolveInvestigationCard(props);
  return getSortedWidgets({ widgets: resolvedCards });
}

function resolveInvestigationCard({
  investigationCard,
  cardLevel = 0,
}: ResolveInvestigationProps): WidgetWithMetadata[] {
  const widgets: WidgetWithMetadata[] = [];

  const resolvedWidget = resolveInvestigationCardWidget(investigationCard);
  if (!isNilOrEmpty(resolvedWidget)) {
    const resolvedWidgetWithFilters = getWidgetWithFilters({
      widget: resolvedWidget,
      filters: investigationCard.filters,
    });
    widgets.push({ ...resolvedWidgetWithFilters, metadata: { ...investigationCard.metadata, cardLevel } });
  }
  // TODO: Include the concept of a missing widget around here

  if (!isNilOrEmpty(investigationCard.followUpCards)) {
    const resolvedInvestigations = investigationCard.followUpCards.reduce(
      (acc: WidgetWithMetadata[], followUpCard): WidgetWithMetadata[] => {
        const resolvedInvestigation = resolveInvestigationCard({
          investigationCard: followUpCard,
          cardLevel: cardLevel + 1,
        });

        acc.push(...resolvedInvestigation);

        return acc;
      },
      [],
    );
    widgets.push(...resolvedInvestigations);
  }

  return widgets;
}

//#region Private Members
// TODO: Return all possible solutions
function resolveInvestigationCardWidget(investigationCard: InvestigationCard): Maybe<LibraryWidget> {
  // Compute the best widget
  if (investigationCard.dataPoint) {
    const { entityId, scope } = investigationCard.dataPoint;
    const widgetsByEntity = getWidgetsByEntity({ entityId, scope });

    if (isNilOrEmpty(widgetsByEntity)) {
      return;
    }

    // If there's a specific widgetId, try to use that one
    if (!isNilOrEmpty(investigationCard.widgetId)) {
      const widgetIdMatch = widgetsByEntity.find((widget) => widget.id === investigationCard.widgetId);

      if (isNilOrEmpty(widgetIdMatch)) {
        // TODO: Decide what to do if the requested widget id is not a valid solution
        // For now, return the first valid widget
        return widgetsByEntity[0];
      }

      return widgetIdMatch;
    }

    // There's no specified widget to use, return the first one from the widget library response
    return widgetsByEntity[0];
  }

  // There's no data point to evaluate, just try to find by widgetId
  if (!isNilOrEmpty(investigationCard.widgetId)) {
    return getWidget(investigationCard.widgetId);
  }

  return;
}

function getSortedWidgets({ widgets }: { widgets: WidgetWithMetadata[] }): WidgetWithMetadata[] {
  return widgets.sort((a, b) => {
    const aCreatedAt = Date.parse(a.metadata.createdAt);
    const bCreatedAt = Date.parse(b.metadata.createdAt);

    if (aCreatedAt == bCreatedAt) {
      return b.metadata.cardLevel - a.metadata.cardLevel;
    }

    return aCreatedAt - bCreatedAt;
  });
}
//#endregion
