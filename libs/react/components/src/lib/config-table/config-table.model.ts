import { Action, Attribute, GenericFunctions, OnInputChangeEvent, RegisterEvents } from '@kleeen/types';

import { AddDialogPayload } from '../dialog';

export type AddPayload = AddDialogPayload;

export type CellDisplayValue = {
  id?: number | string;
  displayValue: boolean | number | string | JSX.Element;
};

export type CellData = string | CellDisplayValue | JSX.Element | boolean;

export interface DeletePayload {
  entityKey: string;
  id: unknown;
}

export interface UpdatePayload {
  entity: string;
  params: { [key: string]: string };
  hasErrors?: boolean;
}

export interface KsConfigTableOnSaveData {
  changes: {
    added: AddPayload[];
    deleted: DeletePayload[];
    updated: UpdatePayload[];
  };
  current: any[];
  id?: string;
}

export interface KsConfigTableProps {
  actions: Action[];
  attributes: Attribute[];
  customModalProps?: Record<string, any>;
  data: {
    data: {
      data: RowData[];
      format: TableFormat;
    };
    isLoading: boolean;
  };
  enableEditMode?: boolean;
  entityActions?: GenericFunctions;
  onInputChange?: OnInputChangeEvent;
  // TODO: @cafe Rename this field to registerEvents
  onRegisterEvents?: RegisterEvents;
  params: {
    /**
     * Use PascalCase for this value. Check entities.json as reference
     */
    baseModel: string;
    operationName?: string;
    taskName?: string;
  };
  // These are only required for autocomplete
  taskName?: string;
  widgetId?: string;
  orderColumnName?: string;
  isSortable?: boolean;
}

export interface RowData {
  id: string;
  [key: string]: CellData;
}

export interface TableFormat {
  [key: string]: any;
}
