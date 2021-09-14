import { CrossLinking, CrossLinkingMatrix } from '@kleeen/types';

import { Transformation } from '../utils';

export type ListItem = number | string | boolean | undefined;

// Duplicated type, must unify in types library
export interface Attribute {
  aggregation?: Transformation;
  name: string;
  // TODO @carreta remove this when XORs can be aggregated [KSE3-1735]
  isXor?: boolean;
  hasMany?: boolean;
  formatType?: string;
}

export interface Axis {
  categories?: string[] | ListItem[];
  key?: string;
  type?: string;
}

export interface GetWidgetDataResult {
  format: {
    xAxis?: Axis;
    yAxis?: Axis;
  };
  results: number[] | number[][];
  crossLinking?: CrossLinkingMatrix;
}

export interface WorkflowFiltersResults {
  filters: {
    name: string;
    statisticalType: string;
    accessLevel: AccessLevel;
  }[];
}

interface ListingItem {
  displayValue: any;
  id?: string;
}

interface EntityList {
  [key: string]: ListingItem | ListingItem[];
}

interface ListingFormatItem {
  aggregations?: null;
  examples?: null;
  max?: null;
  min?: null;
  prefix?: null;
  severityBad?: null;
  severityGood?: null;
  severityLevels?: null;
  suffix?: null;
}

export interface GetListingDataResults {
  data: EntityList[];
  format: { [key: string]: ListingFormatItem };
  pagination?: { totalCount: number };
}

interface ActionItem {
  link?: string;
  title?: string;
  type?: string;
}

// TODO: @cafe move this and other shared types to @kleeen/types
export interface DispatchCustomActionResults {
  data: {
    actions?: ActionItem[];
    context?: any;
    customMessage?: string;
    customTitle?: string;
    functionName: string;
    success: boolean;
  };
}

export interface MultiTransFormationArgs {
  attributes?: string[];
  entity: string;
  filters: any;
  transformations: Transformation[];
}

export interface MultiTransFormationResults {
  crossLinking?: CrossLinking[];
  format: {
    xAxis?: Axis;
    yAxis?: Axis;
  };
  results: number[] | number[][];
  transformation: Transformation;
}

export interface FormatCheckResults {
  isValid: boolean;
  errors?: {
    message: string;
  }[];
}

export enum AccessLevel {
  HIDE = 'HIDE',
  SHOW = 'SHOW',
  DISABLED = 'DISABLED',
}

export interface AccessControlCheckResults {
  accessLevel: AccessLevel;
}

export interface AuthContext {
  dataSources: Record<string, any>;
  headers: Record<string, any>;
  user: {
    email: string;
    'cognito:id': string;
  };
  token: string;
}
