import { ExportConfig, InfusionType, NavPosition, crosslinkingInteractionType } from '../enums';
import { Key, ReactElement, ReactNode } from 'react';

import { Action } from './actions';
import { Attribute } from './attributes';

/**
 * Interfaces
 */

export interface AutocompleteState {
  data: AutocompleteStateOption[];
  isLoading: boolean;
}

export interface ContextMenuDataPoint extends DataPoint {
  ignoreInContextMenu?: boolean;
}

export interface CrossLinking {
  id: string;
  $metadata: {
    entityType: string;
  };
}

export type CrossLinkingMatrix = CrossLinking[][];

export interface DataListItem {
  [key: string]: Result;
}

export interface DataListMetaData {
  groupByColumnName: string;
  max?: number;
  min?: number;
  negativeBarSpace: number;
  positiveBarSpace: number;
  valueColumnName: string;
}

export interface DataListResult {
  data: DataListItem[];
  metadata?: DataListMetaData;
}

export interface DataPoint {
  attribute: Attribute;
  transformationKeyToUse?: string; // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
  value: DataPointValue;
}

export interface DataPointWithFormattedValue extends DataPoint {
  formattedValue: ReactNode;
}

export interface DataPointValue {
  displayMedia?: DisplayMedia;
  displayValue?: DisplayValue;
  id: Key;
  $metadata?: {
    entityType?: string;
  };
}

export interface DisplayMedia {
  type: string;
  value: string;
}

export interface GenericFunctions {
  [key: string]: GenericFunction;
}

export interface LabelResultsReturnProps extends ResultsProps {
  resultsElement: ReactElement;
}

export interface ListItem {
  displayValue: string;
  id?: string;
  value?: any;
}

// TODO: @guaria decide where is the best place to keep shared prop types
export interface ParentProps {
  entity: string;
  id: string;
}

export interface ResultsProps {
  results: Results;
}

/**
 * Types
 */

export type AmendCellUpdate = (cellUpdate: {
  rowId: string;
  attributeName: string;
  value: any;
  temporaryValue?: any;
}) => void;

export type AutocompleteStateOption = ListItem;

export type Cell = DataPointValue & {
  displayValue: DisplayValue;
};

export type DisplayValue = string | number | boolean;

export type GenericFunction = (...params: any[]) => void;

export type Maybe<T> = T | undefined;

export type Result = Cell;

export type Results = number[] | string[] | number | string;

export type Row = {
  id: Key;
} & {
  [key: string]: Cell;
};

export type Translate = (key: string | { id: string }) => string;
export type FormatMessage = (key: { id: string }, interpolation: { [key: string]: string }) => string;
export interface TranslateProps {
  formatMessage?: FormatMessage;
  translate: Translate;
}

export type VizColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ViewOption = {
  actions?: Action[];
  entity: string;
  entityName: string;
  name: string;
  type: string;
  viewId?: string;
  viewOrder?: number;
};

export type ViewOptionFormattedType = {
  label: string;
  viewOrder: number;
  value: string;
  option: ViewOption;
};

export interface AppSettings {
  companyName: string;
  exportConfig: ExportConfig;
  crossLinkingInteraction: crosslinkingInteractionType;
  defaultHomePage: string;
  infusionType: InfusionType;
  layout: {
    position: NavPosition;
  };
  productName: string;
}

export interface AttributeInputEvents {
  id?: Key;
  onSave: () => any;
  onCancel: () => void;
}

export type OnInputChangeEvent = (hasChanged: boolean) => void;

export type RegisterEvents = (event: AttributeInputEvents) => void;
