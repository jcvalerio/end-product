import { ReactText } from 'react';
import { ViewOption, ViewType, Widget } from '@kleeen/types';

export interface DataViewDisplaySectionAtomicProps {
  widgets: Widget[];
  selectedOption: ViewOption;
  dashboardWidgets: Widget[];
  entityName: string;
  selectedRows: Row[];
  setSelectedRows: () => void;
  singleViewWidgets?: Widget[];
  atomicCustomViews?: any[];
  tableWidgets: Widget[];
  taskName: string;
  value: any;
  entityActions: { [key: string]: Function };
  setCardsNumber?: (e: number) => void;
}

export interface Row {
  [key: string]: string | number;
}

export type DisplaySectionViews = {
  widget: any;
  taskName?: string;
  selectedRows?: Row[];
  setSelectedRows?: () => void;
  dashboardWidgets?: any;
  indexToRender: number;
  entityActions: { [key: string]: Function };
};

export type DashboardView = {
  type: ViewType;
  viewOrder: number;
  dashboardWidgets: Widget[];
  viewId: ReactText;
};
