import {
  AttributeInputEvents,
  FormatProps,
  OnInputChangeEvent,
  StatisticalDataType,
  WidgetProps,
} from '@kleeen/types';

export enum elementCase {
  FIELD_NOT_ADD_HAVE_MANY = 'Field Can Not Add Values and Have Many',
  FIELD_ADD = 'Field Can Add Values',
  FIELD_ADD_NOT_MANY = 'Field Can Add Values and Not Have Many',
  FIELD_CAN_NOT_ADD = 'Field Can Not Add Values',
  RADIO_GROUP = 'Group - Radio',
  CHECK_GROUP = 'Group - Check',
}

export enum airTableElementType {
  SELECT_ONLY = 'Selection Only',
  NEW_PLUS_EXISTING = 'New + Existing',
}

export enum transformationElements {
  SELF_SINGLE = 'selfSingle',
  SELF_MULTI = 'selfMulti',
}

export const KS_GLOBAL_APP = '[KS] GlobalApp';

export const INITIAL_ATTRIBUTE_VALUE_HAS_MANY = [];
export const INITIAL_ATTRIBUTE_VALUE_SINGLE = '';

export interface ConfigInputWidgetProps extends WidgetProps {
  disabled?: boolean;
  hideSaveAndClose?: boolean;
  hideTitle?: boolean;
  icon: boolean;
  inSummaryDetails?: boolean;
  onInputChange?: OnInputChangeEvent;
  registerEvents?: (events: AttributeInputEvents) => void;
  statisticalType: StatisticalDataType;
  title: string;
}

export interface TransformToElementProps {
  attrLabel: any;
  autoCompleteValues?: any;
  canAddValues: boolean;
  disabled: boolean;
  elementToUse: any;
  errors?: any;
  format?: FormatProps;
  formatType?: string;
  helpText?: string;
  hideTitle: boolean;
  inputValue: any;
  inSummaryDetails: boolean;
  refValue?: any;
  setInputValue: any;
  setSelectedOption: any;
  statisticalType: StatisticalDataType;
  transformation?: string;
}
