import { AggregationType, StatisticalDataType } from '../enums';

import { ElementComponents } from './element-components';
import { FormatProps } from './format';
import { Link } from './link';

// TODO: @Guaria decide where is the best place to keep shared prop types
export interface AttributeProps {
  name: string;
  canAddValues?: boolean;
  type?: string;
}

export interface ChangeDirectionsProps {
  changeDirections?: string;
}

export interface Attribute {
  aggregation?: string | null;
  aggregationMetadata?: ChangeDirectionsProps;
  canAddValues?: boolean;
  canEditValues?: boolean;
  crossLinking: Link[];
  dataType?: string;
  deepDataType?: string;
  description?: string;
  editable?: boolean;
  elements?: ElementComponents;
  format?: FormatProps;
  formatType?: string;
  hasMany?: boolean;
  id?: number;
  isDisplayValue?: boolean;
  isFilterable?: { in: boolean; out: boolean };
  isNullable?: boolean;
  label?: string;
  multiple?: boolean;
  name: string;
  prototypeId?: number;
  rawEntityName?: string;
  statisticalType?: StatisticalDataType;
  settings?: {
    isAvatarEditable?: boolean;
    isFilledByEU?: boolean;
    isEditable?: boolean;
  };
  transformation?: AggregationType;
  type?: string;
}
