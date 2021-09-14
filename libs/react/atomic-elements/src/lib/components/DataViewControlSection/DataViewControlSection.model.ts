import { Action, GenericFunctions, ViewOption } from '@kleeen/types';

export interface Attribute {
  name: string;
  type?: string;
}

export type HandleChangeTab = (value: number | unknown) => void;

export interface TabSwitcherProps {
  handleChangeTab: HandleChangeTab;
  viewOptions: ViewOption[];
  value: number;
  selectedOption?: ViewOption;
  taskName?: string;
  onTabIndexChanged?: (index: number, option: ViewOption) => void;
  tabIndex?: number;
}

export interface SwitcherProps extends TabSwitcherProps {
  showDropDown: boolean;
}

export interface DataViewControlSectionProps extends TabSwitcherProps {
  actions?: Action[];
  attributes: Attribute[];
  description?: string;
  entity?: string;
  entityActions?: GenericFunctions;
  hideRefreshControl?: boolean;
  isEntityDetails?: boolean;
  objectValue: string;
  parent?: { id: string; entity: string };
  results: string;
  showActions: boolean;
  showAvatar: boolean;
  showDesc: boolean;
  showDropDown: boolean;
  showTitle: boolean;
  taskName: string;
  title?: string;
  order?: number;
}

export enum DisplayViewType {
  FullView = 'fullView',
  Grid = 'grid',
  Listing = 'listing',
}
