import { Action, AttributeProps, ParentProps, Translate } from '@kleeen/types';

export interface ActionDialogsProps {
  action: Action;
  attributes?: AttributeProps[]; // For "Add" action only
  context?: any;
  dispatchAction: (...args: any[]) => void;
  entity?: string; // For "Add" action only
  isConfirmationOpen: boolean;
  isCustomOpen: boolean;
  onIsConfirmationOpenChange: (action: Action) => void;
  onIsCustomOpenChange: (action: Action) => void;
  parent?: ParentProps; // For "Add" action only
  taskName?: string;
  translate?: Translate;
}
