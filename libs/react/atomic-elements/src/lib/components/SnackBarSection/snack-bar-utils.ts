import { Maybe } from '@kleeen/types';

export interface DeleteDialogProps {
  entity: Maybe<string>;
  open: boolean;
  entityActions: Record<string, (d: any) => void>;
  selectedRows: any[];
  setSelectedRows: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearOnClose?: boolean;
  title?: string;
  description?: string;
}

export interface SelectedStatsSectionProps {
  showSelectAndExecute?: boolean;
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Action {
  disabled?: boolean;
  func?: (params?: any) => any;
  label?: string;
  tooltip?: string;
  type: string;
}

export const bem = 'ks-snack-bar-section';

export enum ActionEnum {
  DELETE = 'DELETE',
  CUSTOM = 'CUSTOM',
}
