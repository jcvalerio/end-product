import { CardSectionLayout, ViewType, Widget } from '@kleeen/types';
import { DataViewDisplaySectionAtomicProps, DisplaySectionViews } from './DataViewDisplaySection.model';
import { isNilOrEmpty, roleAccessKeyTag, sortByKeys } from '@kleeen/common/utils';

import CardSection from '../CardSection/CardSection';
import ConfigView from '../ConfigView/ConfigView';
import CustomView from '../custom-view/custom-view';
import DataViewDisplaySection from './DataViewDisplaySection';
import GridAreaSection from '../GridAreaSection/GridAreaSection';
import React from 'react';
import { useAccessControlChecker } from '@kleeen/core-react';
import { useGetWidgetsAmount } from '@kleeen/react/hooks';

const permissionOk = 'SHOW';

export const DataViewDisplaySectionAtomic = React.memo((props: DataViewDisplaySectionAtomicProps) => {
  const {
    selectedOption,
    widgets = [],
    selectedRows,
    setSelectedRows,
    taskName,
    value: indexToRender = 0,
    entityActions,
  } = props;

  const accessControlFilterViews = (view: Widget): boolean => {
    if (view.type === ViewType.dashboard || view.type === ViewType.report) {
      return (
        useAccessControlChecker(roleAccessKeyTag(`${props.taskName}.views.dashboard`)).permission ===
        permissionOk
      );
    }
    return (
      useAccessControlChecker(
        roleAccessKeyTag(`${props.taskName}.views.${view.title || view.params?.baseModel}`),
      ).permission === permissionOk
    );
  };
  const taskViews = widgets;

  const orderedTaskViews = sortByKeys<Widget>(taskViews, ['viewOrder', 'viewId']);

  useGetWidgetsAmount(props.setCardsNumber);

  // TODO: @Guaria this is just a workaround, the solution should be assign an ID to each entry on the DataViewControlSection
  // then use that selected ID to identify which section should be render.
  const isTheIndexToRender = (view: Widget): boolean => {
    return view.viewId === selectedOption?.viewId;
  };

  const children = orderedTaskViews.reduce((views, view) => {
    if (!isNilOrEmpty(view) && isTheIndexToRender(view) && accessControlFilterViews(view)) {
      return resolveViews({
        dashboardWidgets: [],
        indexToRender,
        selectedRows,
        setSelectedRows,
        taskName,
        widget: view,
        entityActions,
      });
    }
    return views;
  }, []);
  return <DataViewDisplaySection value={0}>{children}</DataViewDisplaySection>;
});

function resolveViews({
  widget,
  taskName,
  setSelectedRows,
  selectedRows,
  indexToRender,
  entityActions,
}: DisplaySectionViews) {
  const viewResolvers = {
    [ViewType.custom]: () => (
      <CustomView key={`data-view-display-section-full-view-viz-${widget.id}`} widget={widget} />
    ),
    [ViewType.dashboard]: () => (
      <CardSection
        justifyContent="center"
        key={`data-view-display-section-card-section-${indexToRender}`}
        taskName={taskName}
        widgets={widget.widgets}
      />
    ),
    [ViewType.report]: () => (
      <CardSection
        cardSectionLayout={CardSectionLayout.SingleWideColumn}
        justifyContent="center"
        key={`data-view-display-section-card-section-${indexToRender}`}
        taskName={taskName}
        widgets={widget.widgets}
      />
    ),
    [ViewType.config]: () => (
      <ConfigView widgets={widget.widgets} entityActions={entityActions} taskName={taskName} />
    ),
    [ViewType.table]: () => (
      <GridAreaSection
        entityId={widget.attributes[0]?.id}
        entityName={widget.params.baseModel}
        key={`data-view-display-section-grid-area-section-${widget.id}`}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        sortableColumns={true}
        taskName={taskName}
        widget={widget}
      />
    ),
  };

  const componentToRender = viewResolvers[widget.type];
  if (!componentToRender) {
    console.error(`There is no valid component for widget type ${widget.type}.`);
    return;
  }

  const ViewComponentBaseOnType = viewResolvers[widget.type];
  return <ViewComponentBaseOnType />;
}

export default DataViewDisplaySectionAtomic;
