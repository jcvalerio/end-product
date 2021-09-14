import { AggregationType, DataPoint, Filters, WidgetScope } from '@kleeen/types';

import { LibraryWidget } from '@kleeen/widgets';
import { isSingleCardinalityTransformation } from '@kleeen/frontend/utils';

interface GetFiltersForDataPointsProps {
  contextDataPoints: DataPoint[];
  dataPoint: DataPoint;
  scope: WidgetScope;
}

interface FilterVariants {
  defaultFilters: Filters;
  contextFilters: Filters;
}

export function getFiltersForDataPoints({
  contextDataPoints,
  dataPoint,
  scope,
}: GetFiltersForDataPointsProps): FilterVariants {
  return {
    contextFilters: getContextFilters({
      contextDataPoints,
    }),
    defaultFilters: getDefaultFilters({ dataPoint, scope }),
  };
}

interface GetWidgetsWithFiltersProps extends GetFiltersForDataPointsProps {
  widgets: LibraryWidget[];
}

interface WidgetsWithFilters {
  widgetsWithDefaultFilters: LibraryWidget[];
  widgetsWithContextFilters: LibraryWidget[];
}

export function getWidgetsWithFilters({ widgets, ...rest }: GetWidgetsWithFiltersProps): WidgetsWithFilters {
  const { contextFilters, defaultFilters } = getFiltersForDataPoints(rest);
  return {
    widgetsWithContextFilters: widgets.map(
      mapFilterToWidget({
        filtersToApply: {
          ...defaultFilters,
          ...contextFilters,
        },
      }),
    ),
    widgetsWithDefaultFilters: widgets.map(
      mapFilterToWidget({
        filtersToApply: {
          ...defaultFilters,
        },
      }),
    ),
  };
}

interface GetWidgetWithFiltersProps {
  filters: Filters;
  overridePreviousFilters?: boolean;
  widget: LibraryWidget;
}

export function getWidgetWithFilters({
  filters,
  overridePreviousFilters = false,
  widget,
}: GetWidgetWithFiltersProps): LibraryWidget {
  return {
    ...widget,
    params: {
      ...widget?.params,
      filters: {
        ...(overridePreviousFilters ? {} : widget?.params?.filters),
        ...filters,
      },
    },
  };
}

//#region Private Members
interface GetFiltersProps {
  contextDataPoints: DataPoint[];
}

function getContextFilters({ contextDataPoints }: GetFiltersProps): Filters {
  const filters = contextDataPoints
    .filter((dataPoint) => {
      return isSingleCardinalityTransformation(dataPoint.attribute.aggregation as AggregationType);
    })
    .reduce((acc: Filters, dataPoint) => {
      // TODO: @cafe This filter composition may change after the filters refactor
      acc[dataPoint.attribute.name] = dataPoint.value.id;

      return acc;
    }, {});

  return filters;
}

interface GetDefaultFiltersProps {
  dataPoint: DataPoint;
  scope: WidgetScope;
}

function getDefaultFilters({ dataPoint, scope }: GetDefaultFiltersProps): Filters {
  if (scope !== WidgetScope.Single) {
    return {};
  }
  return {
    [dataPoint.attribute.name]: dataPoint.value.id,
  };
}

interface MapFilterToWidgetProps {
  filtersToApply: Filters;
}

function mapFilterToWidget({
  filtersToApply,
}: MapFilterToWidgetProps): (widget: LibraryWidget) => LibraryWidget {
  return (widget: LibraryWidget) => {
    return getWidgetWithFilters({
      widget,
      filters: filtersToApply,
    });
  };
}
//#endregion
