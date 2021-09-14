import { LibraryWidget, WidgetByEntityBaseParam, WidgetsByEntity } from './types';
import { isNilOrEmpty, isNotNilOrEmpty } from '@kleeen/common/utils';
import { widgets, widgetsByEntity } from './data';

import { Maybe } from '@kleeen/types';

const decoratedWidgetsByEntity = getDecoratedWidgetsByEntity();

export function entityHasWidgets({ entityId, scope }: WidgetByEntityBaseParam): boolean {
  return (
    !isNilOrEmpty(decoratedWidgetsByEntity[entityId]) &&
    !isNilOrEmpty(decoratedWidgetsByEntity[entityId][scope])
  );
}

export function getWidget(widgetId: string): Maybe<LibraryWidget> {
  return widgets[widgetId];
}

export function getWidgetsByEntity({ entityId, scope }: WidgetByEntityBaseParam): LibraryWidget[] {
  if (!entityHasWidgets({ entityId, scope })) return [];

  return decoratedWidgetsByEntity[entityId][scope];
}

//#region Private members
function getDecoratedWidgetsByEntity(): WidgetsByEntity {
  const newWidgetsByEntity = Object.keys(widgetsByEntity).reduce((acc: WidgetsByEntity, strKey) => {
    const key = parseInt(strKey);
    const widgetByEntity = widgetsByEntity[key];

    acc[key] = {
      single: widgetByEntity?.single?.map((id) => getWidget(id))?.filter(isNotNilOrEmpty) || [],
      collection: widgetByEntity?.collection?.map((id) => getWidget(id))?.filter(isNotNilOrEmpty) || [],
    };

    return acc;
  }, {});

  return newWidgetsByEntity;
}
//#endregion
