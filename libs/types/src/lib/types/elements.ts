import { Dispatch, SetStateAction } from 'react';
import { ElementDisplayType, ElementInputType } from '../enums/elements';
import { FormatProps, ListItem } from '../types';

import { AggregationType } from '../enums';
import { Attribute } from './attributes';
import { ElementComponentRules } from './element-components';

//#region BaseComponentProps
interface BaseComponentProps {
  format?: FormatProps;
  formatType?: string;
  highlighted?: boolean;
  transformation?: AggregationType;
  value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  widgetId?: string;
}

export type BaseDisplayComponentsProps = BaseComponentProps;

export interface BaseInputComponentProps extends BaseComponentProps {
  setSelectedOption: Dispatch<SetStateAction<ListItem | ListItem[]>>;
  setValue: Dispatch<SetStateAction<any>>;
}
//#endregion

//#region DisplayComponentProps
export interface DisplayComponentProps extends BaseDisplayComponentsProps {
  attribute: Attribute;
  element?: ElementDisplayType;
  highlighted?: boolean;
}

export type DisplayElement = (props: DisplayComponentProps) => JSX.Element;

export type DisplayCatalog = { [key in ElementDisplayType]: DisplayElement };
//#endregion

//#region InputComponentProps
export interface InputComponentProps extends BaseInputComponentProps {
  attribute: Attribute;
  autoCompleteValues: ListItem[];
  element?: ElementInputType;
  getInputElement: (inputComponent: string) => InputElement;
  rules: ElementComponentRules[];
}

export type InputElement = (props: InputComponentProps) => JSX.Element;

export type InputCatalog = { [key in ElementInputType]: InputElement };
//#endregion
