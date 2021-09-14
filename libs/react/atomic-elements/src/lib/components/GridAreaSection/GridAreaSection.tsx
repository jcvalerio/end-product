import './GridAreaSection.scss';

import {
  getWidgetContextName,
  useKleeenActions,
  useLocalStorage,
  useUrlQueryParams,
  useWidgetContext,
} from '@kleeen/react/hooks';

import { KsVirtualTable } from '@kleeen/react/components';
import { ReactElement } from 'react';
import { Row } from '../DataViewDisplaySection/DataViewDisplaySection.model';
import { Widget } from '@kleeen/types';
import useSort from './useSort';
import { Order } from '@kleeen/common/utils';

export interface GridAreaSectionProps {
  entityName: string;
  selectedRows: Row[];
  setSelectedRows: () => void;
  taskName: string;
  widget: Widget;
  entityId?: string;
  sortableColumns?: boolean;
  columnWidth?: number;
  className?: string;
}

export const GridAreaSection = (props: GridAreaSectionProps): ReactElement => {
  const { taskName, widget } = props;
  const { actions, id: widgetId, attributes, entityId, params } = widget;
  const entityActions = useKleeenActions(taskName);
  const contextName = getWidgetContextName({ taskName, widgetId: widgetId as string });
  const keySortingLocalStorage = `sorting-widget-${widgetId}`;
  const {
    localStorageValue: sorting,
    setLocalStorageValue: setSorting,
    removeLocalStorageValue: removeSorting,
  } = useLocalStorage(keySortingLocalStorage, []);
  const order = sorting.length ? sorting[0].sort : Order.none;
  const orderBy = sorting.length ? sorting[0].columnName : '';
  const [{ order: nonUseOrder, orderBy: nonUseOrderBy }, onSort] = useSort({ setSorting });
  const widgetActions = useKleeenActions(contextName);
  const widgetData = useWidgetContext({
    taskName,
    widgetId,
    params: { ...params, attributes, sorting },
  });
  const data = widgetData?.data?.data;
  const format = widgetData?.data?.format;
  const isLoading = widgetData?.isLoading;
  const pagination = widgetData?.data?.pagination;
  const entityData = { data, format, isLoading, pagination };
  const paramsBasedOnRoute = useUrlQueryParams({ useNestedObjects: true });

  const getMoreRows = (nextPage) => {
    widgetActions.getMoreData({
      taskName,
      widgetId,
      params: { ...params, attributes, pagination: nextPage, sorting },
      paramsBasedOnRoute,
    });
  };

  return (
    <KsVirtualTable
      actions={actions}
      attributes={attributes}
      entity={entityData}
      entityActions={entityActions}
      entityId={entityId}
      getMoreRows={getMoreRows}
      onSort={onSort}
      order={order}
      orderBy={orderBy}
      sortableColumns={props.sortableColumns}
      sorting={sorting}
      widgetId={widgetId}
      {...props}
    />
  );
};

export default GridAreaSection;
