import { ElementDisplayType, ElementInputType } from '../enums/elements';

export interface ElementComponentRules {
  component: ElementInputType;
  maxChoices?: number;
}

export interface ElementComponents {
  displayComponent: ElementDisplayType;
  inputComponent?: ElementInputType;
  rules?: ElementComponentRules[];
}
