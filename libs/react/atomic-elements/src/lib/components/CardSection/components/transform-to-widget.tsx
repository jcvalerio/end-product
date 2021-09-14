/* eslint-disable complexity */
import {
  AreaWidget,
  BubbleChartWidget,
  ColumnBarWidget,
  ConfigInputWidget,
  ConfigTableWidget,
  CustomActionWidget,
  CustomWidgetContainer,
  DonutVariantWidget,
  DonutWidget,
  GaugeWidget,
  LineWidget,
  PieWidget,
  PolarAreaWidget,
  PositiveNegativeAreaWidget,
  RankedListWidget,
  ReadOnlyTextWidget,
  ScatterWidget,
  SingleBarHighlightMaxWidget,
  StepLineWidget,
  SummaryStatisticsWidget,
  TableWidget,
} from '../../Widgets';
import { OnInputChangeEvent, RegisterEvents, Widget, WidgetProps, WidgetTypes } from '@kleeen/types';
import { ReactElement, useState } from 'react';

import CardWidget from '../CardWidget';
import { ErrorBoundaryComponent } from '@kleeen/react/components';
import GridAreaSection from '../../GridAreaSection/GridAreaSection';
import { RenderWidgetProps } from '../CardWidget.model';
import { VisualizationSelector } from '../../VisualizationSelector/VisualizationSelector';
import WaterfallWidget from '../../Widgets/WaterfallWidget/WaterfallWidget';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function TransformToWidgetComponent({
  CardWidgetElement = CardWidget,
  disableHeightCalculation = false,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  taskName,
  widget,
}: {
  CardWidgetElement?: any;
  disableHeightCalculation?: boolean;
  hideSaveAndClose?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widget: Widget;
}): ReactElement {
  const { viableSolutions } = widget;
  const hasViableSolutions = !isNilOrEmpty(viableSolutions);
  const [preferredWidgetIndex, setPreferredWidgetIndex] = useState(0);

  function getChartTypeToRender(): WidgetTypes {
    if (
      hasViableSolutions &&
      preferredWidgetIndex < viableSolutions.length &&
      viableSolutions[preferredWidgetIndex]
    ) {
      return viableSolutions[preferredWidgetIndex];
    }
    return widget.chartType;
  }

  return widget.chartType === WidgetTypes.CUSTOM ? (
    renderWidget({
      disableHeightCalculation,
      onInputChange,
      preferredWidget: getChartTypeToRender(),
      registerEvents,
      taskName,
      widget,
    })
  ) : (
    <CardWidgetElement
      disableHeightCalculation={disableHeightCalculation}
      icon={false}
      selectedViz={preferredWidgetIndex}
      title={widget.title}
      widgetSelector={
        hasViableSolutions ? (
          <VisualizationSelector
            items={viableSolutions}
            onItemPress={setPreferredWidgetIndex}
            preferredWidgetIndex={preferredWidgetIndex}
          />
        ) : null
      }
    >
      <ErrorBoundaryComponent>
        {renderWidget({
          hideSaveAndClose,
          onInputChange,
          preferredWidget: getChartTypeToRender(),
          registerEvents,
          taskName,
          widget,
          disableHeightCalculation,
        })}
      </ErrorBoundaryComponent>
    </CardWidgetElement>
  );
}

//#region Private members
function renderWidget({
  disableHeightCalculation,
  hideSaveAndClose,
  onInputChange,
  preferredWidget,
  registerEvents,
  taskName,
  widget,
}: RenderWidgetProps): ReactElement {
  const { actions, attributes, id: widgetId, params, statisticalType } = widget;
  const widgetProps: WidgetProps = {
    actions,
    attributes,
    chartType: preferredWidget,
    params,
    taskName,
    widgetId,
  };

  // TODO: @cafe Check if this could be turned into a map instead of a switch
  switch (preferredWidget) {
    case WidgetTypes.AREA_GRADIENT:
    case WidgetTypes.AREA_MACRO_MICRO:
    case WidgetTypes.AREA_MASTER_DETAIL:
    case WidgetTypes.AREA:
      return <AreaWidget {...widgetProps} />;

    case WidgetTypes.BUBBLE_CHART:
      return <BubbleChartWidget {...widgetProps} disableHeightCalculation={disableHeightCalculation} />;

    case WidgetTypes.COLUMN_BAR_DOUBLE_BAR:
    case WidgetTypes.COLUMN_BAR_MACRO_MICRO:
    case WidgetTypes.COLUMN_BAR_SEGMENTED:
    case WidgetTypes.COLUMN_BAR:
      return <ColumnBarWidget {...widgetProps} />;

    case WidgetTypes.CONFIG_INPUT_FIELD_USER_DEFINED:
      return (
        <ConfigInputWidget
          {...widgetProps}
          hideSaveAndClose={hideSaveAndClose}
          icon={false}
          onInputChange={onInputChange}
          registerEvents={registerEvents}
          statisticalType={statisticalType}
          title={widget.title}
        />
      );
    case WidgetTypes.CONFIG_TABLE:
      return (
        <ConfigTableWidget {...widgetProps} onInputChange={onInputChange} registerEvents={registerEvents} />
      );

    case WidgetTypes.CUSTOM: {
      return (
        <CustomWidgetContainer
          disableHeightCalculation={disableHeightCalculation}
          widget={widget}
          onInputChange={onInputChange}
          registerEvents={registerEvents}
          taskName={taskName}
        />
      );
    }

    case WidgetTypes.CUSTOM_ACTION:
      return <CustomActionWidget {...widgetProps} />;

    case WidgetTypes.DONUT:
      return <DonutWidget {...widgetProps} />;

    case WidgetTypes.DONUT_VARIANT:
      return <DonutVariantWidget {...widgetProps} />;

    case WidgetTypes.GAUGE_SEVERITY_LEVEL:
    case WidgetTypes.GAUGE_SEVERITY_SCORE:
    case WidgetTypes.GAUGE:
      return <GaugeWidget {...widgetProps} />;

    case WidgetTypes.LINE:
      return <LineWidget {...widgetProps} />;

    case WidgetTypes.PIE:
      return <PieWidget {...widgetProps} />;

    case WidgetTypes.POLAR_AREA:
      return <PolarAreaWidget {...widgetProps} />;

    case WidgetTypes.POSITIVE_NEGATIVE_AREA:
      return <PositiveNegativeAreaWidget {...widgetProps} />;

    case WidgetTypes.READ_ONLY_TEXT:
      return <ReadOnlyTextWidget {...widgetProps} />;

    case WidgetTypes.SCATTER:
      return <ScatterWidget {...widgetProps} />;

    case WidgetTypes.SIMPLE_LIST_RANKED:
      return <RankedListWidget {...widgetProps} />;

    /** TODO: Add subtype as in COLUMN_BAR */
    case WidgetTypes.SINGLE_BAR_HIGHLIGHT_MAX:
      return <SingleBarHighlightMaxWidget {...widgetProps} />;

    case WidgetTypes.STEP_LINE:
      return <StepLineWidget {...widgetProps} />;

    case WidgetTypes.SUMMARY:
    case WidgetTypes.SUMMARY_STATISTICS:
      return <SummaryStatisticsWidget {...widgetProps} />;

    case WidgetTypes.SIMPLE_LIST:
      return <TableWidget {...widgetProps} />;

    case WidgetTypes.TABLE:
      return (
        <div className="report-table-height">
          <GridAreaSection
            className="report-table-height"
            columnWidth={100}
            entityId={widget.attributes[0].id.toString()}
            entityName={widget.params.baseModel}
            key={`data-view-display-section-grid-area-section-${widget.id}`}
            selectedRows={[]}
            setSelectedRows={() => ({})}
            sortableColumns={true}
            taskName={taskName}
            widget={widget}
          />
        </div>
      );

    case WidgetTypes.WATERFALL:
      return <WaterfallWidget {...widgetProps} />;
  }
}
//#endregion
