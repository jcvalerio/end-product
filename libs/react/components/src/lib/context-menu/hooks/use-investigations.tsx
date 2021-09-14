import {
  AggregationType,
  DataPointWithFormattedValue,
  Filters,
  InvestigationDataPoint,
  KsManagedModulePaths,
  ReactElement,
  WidgetScope,
} from '@kleeen/types';
import {
  ContextMenuClickHandler,
  ContextMenuSectionItem,
  HandleContextMenuClose,
} from '../context-menu.model';
import {
  INVESTIGATION_URL_PARAM,
  getContextDataPoints,
  getEncodedInvestigationCard,
  getFiltersForDataPoints,
  getInitialInvestigationCards,
} from '@kleeen/investigations';
import { useEffect, useState } from 'react';

import { DEFAULT_TRANSFORMATION_KEY_TO_USE } from '../utils';
import { Translate } from '@kleeen/core-react';
import { entityHasWidgets } from '@kleeen/widgets';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { isSingleCardinalityTransformation } from '@kleeen/frontend/utils';
import { path } from 'ramda';
import { useUrlQueryParams } from '@kleeen/react/hooks';

const ENABLE_INVESTIGATION = false;

export function useInvestigations({
  dataPoints,
  dataPointsToShow,
  handleClose,
  widgetId,
}: {
  dataPoints: DataPointWithFormattedValue[];
  dataPointsToShow: DataPointWithFormattedValue[];
  handleClose: HandleContextMenuClose;
  widgetId?: string;
}): ContextMenuSectionItem[] {
  const [investigationSections, setInvestigationSections] = useState<ContextMenuSectionItem[]>([]);
  const { paramsBasedOnRoute } = useUrlQueryParams();

  useEffect(() => {
    if (isNilOrEmpty(dataPointsToShow) || !ENABLE_INVESTIGATION) {
      return;
    }

    const tempInvestigationSections = dataPointsToShow.reduce((acc: ContextMenuSectionItem[], dataPoint) => {
      const investigationItems = getInvestigationItems({ dataPoint, dataPoints, paramsBasedOnRoute });

      if (isNilOrEmpty(investigationItems)) {
        return acc;
      }

      const investigationSection: ContextMenuSectionItem = {
        key: 'investigation',
        label: (
          <Translate
            id="app.contextMenu.investigation"
            type="html"
            values={{
              entity: dataPoint.attribute.name,
            }}
          />
        ),
        menuItems: investigationItems.map((item) => {
          return {
            handleClick: getClickHandler({
              handleClose,
              item,
              widgetId,
            }),
            key: `investigation.single`,
            label: item.label,
            roleAccessKey: `investigation.single`,
          };
        }),
      };
      acc.push(investigationSection);
      return acc;
    }, []);

    setInvestigationSections(tempInvestigationSections);
  }, [dataPointsToShow?.length]);

  return investigationSections;
}

//#region Private Members
interface InvestigationItem {
  investigationDataPoint: InvestigationDataPoint;
  investigationFilters: Filters;
  label: ReactElement;
  pageFilters: Filters;
}

interface InvestigationItemClickHandler extends ContextMenuClickHandler<InvestigationItem> {
  widgetId?: string;
}

function getClickHandler({ handleClose, item, widgetId }: InvestigationItemClickHandler) {
  return () => () => {
    const { investigationFilters, investigationDataPoint, pageFilters } = item;
    const initialInvestigationCard = getInitialInvestigationCards({
      investigationDataPoint,
      investigationFilters,
      originWidgetId: widgetId,
      pageFilters,
    });
    const encodedInvestigationCard = getEncodedInvestigationCard(initialInvestigationCard);
    const investigateURL = `${KsManagedModulePaths.Investigate}?${INVESTIGATION_URL_PARAM}=${encodedInvestigationCard}`;
    window.open(investigateURL);
    handleClose();
  };
}

interface GetInvestigationItemsProps {
  dataPoint: DataPointWithFormattedValue;
  dataPoints: DataPointWithFormattedValue[];
  paramsBasedOnRoute: Filters;
}

function getInvestigationItems({
  dataPoint,
  dataPoints,
  paramsBasedOnRoute,
}: GetInvestigationItemsProps): InvestigationItem[] {
  const { attribute, formattedValue, value } = dataPoint;

  // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
  const { transformationKeyToUse = DEFAULT_TRANSFORMATION_KEY_TO_USE } = dataPoint;
  const attributeTransformation = path<AggregationType>([transformationKeyToUse], attribute);
  const isSingleCardinality = isSingleCardinalityTransformation(attributeTransformation);
  const scope = isSingleCardinality ? WidgetScope.Single : WidgetScope.Collection;
  const entityId = attribute.id;

  if (scope === WidgetScope.Single && isNilOrEmpty(value?.id)) {
    return [];
  }

  const showInvestigations = entityHasWidgets({
    entityId: attribute.id,
    scope,
  });

  if (!showInvestigations) {
    return;
  }

  const contextDataPoints = getContextDataPoints({
    dataPointToShow: dataPoint,
    dataPoints,
  });
  const { contextFilters, defaultFilters } = getFiltersForDataPoints({
    contextDataPoints,
    dataPoint,
    scope,
  });

  // TODO: @cafe Handle more than 1 context data point in the future (i.e.: 3 data points)
  const [firstContextDataPoint] = contextDataPoints;
  const filteredBy = firstContextDataPoint?.value.displayValue;
  const filteredByEntity = firstContextDataPoint?.attribute.name;

  const values = {
    entity: attribute.name,
    filteredBy: filteredBy || filteredByEntity,
    filteredByEntity,
    value: formattedValue,
  };

  if (scope === WidgetScope.Single) {
    const singleInvestigationItems: InvestigationItem[] = [
      {
        investigationDataPoint: {
          entityId,
          scope,
        },
        investigationFilters: {
          ...defaultFilters,
        },
        pageFilters: paramsBasedOnRoute,
        label: <Translate id="app.contextMenu.investigation.single" type="html" values={values} />,
      },
    ];
    if (!isNilOrEmpty(firstContextDataPoint)) {
      singleInvestigationItems.push({
        investigationDataPoint: {
          entityId,
          scope,
        },
        investigationFilters: {
          ...defaultFilters,
          ...contextFilters,
        },
        pageFilters: paramsBasedOnRoute,
        label: <Translate id="app.contextMenu.investigation.singleFiltered" type="html" values={values} />,
      });
    }
    return singleInvestigationItems;
  } else {
    const collectionInvestigationItems: InvestigationItem[] = [
      {
        investigationDataPoint: {
          entityId,
          scope,
        },
        investigationFilters: {
          ...defaultFilters,
        },
        pageFilters: paramsBasedOnRoute,
        label: <Translate id="app.contextMenu.investigation.collection" type="html" values={values} />,
      },
    ];
    if (!isNilOrEmpty(firstContextDataPoint)) {
      collectionInvestigationItems.push({
        investigationDataPoint: {
          entityId,
          scope,
        },
        investigationFilters: {
          ...defaultFilters,
          ...contextFilters,
        },
        pageFilters: paramsBasedOnRoute,
        label: (
          <Translate id="app.contextMenu.investigation.collectionFiltered" type="html" values={values} />
        ),
      });
    }
    return collectionInvestigationItems;
  }
}
//#endregion
