import { AggregationType, StatisticalDataType, ViewType } from '../enums';
import { Attribute, ChangeDirectionsProps } from './attributes';
import { Maybe, OnInputChangeEvent, RegisterEvents } from './base';

import { Action } from './actions';
import { Filters } from './filters';
import { WidgetTypes } from '../enums/widgets';

export interface Widget extends VizCommonParams {
  actions: Action[];
  attributes: Attribute[];
  chartType: WidgetTypes;
  component?: Maybe<string>;
  entityId?: string;
  id: string;
  sortOrder?: number;
  statisticalType?: StatisticalDataType;
  title?: string;
  type?: ViewType;
  viableSolutions?: WidgetTypes[];
  viewId?: string;
}

export interface GroupByProps {
  name: string;
  transformation: string;
  formatType: string;
}

export interface MenuListProps {
  func?: () => void;
  icon?: string;
  path: string;
  title: string;
}

export interface TransformationProps {
  isPrimary?: boolean;
  transformation: AggregationType;
  transformationMetadata?: ChangeDirectionsProps;
  metadata?: ChangeDirectionsProps;
}
export interface ValueProp {
  name: string;
  transformation?: string;
  formatType?: string;
}

export interface ValuesProps {
  label: string;
  name: string;
  transformations: TransformationProps[];
  formatType: string;
}

export interface VizParams {
  baseModel: string;
  cardinality?: string;
  displayName?: string;
  filters?: Filters;
  groupBy?: GroupByProps;
  operationName?: string;
  taskName?: string;
  value?: ValueProp | ValuesProps;
}

export interface VizCommonParams {
  params: VizParams;
}

export interface WidgetProps extends VizCommonParams {
  actions?: Action[];
  attributes?: Attribute[];
  chartType?: string;
  taskName: string;
  widgetId: string;
}

export interface CustomWidgetContainerProps {
  disableHeightCalculation: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: RegisterEvents;
  taskName: string;
  widget: Widget;
}

export interface CustomWidgetProps extends CustomWidgetContainerProps {
  className: string;
  key: string;
  title: string;
}

export interface VisualizationWidgetProps extends VizCommonParams {
  chartType?: string;
  context: WidgetState;
  widgetId: string;
}

export interface WidgetState {
  isLoading: boolean;
  data: any;
  error: any;
}
