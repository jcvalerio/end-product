import { Action, AttributeProps, ParentProps, Translate } from '@kleeen/types';
import { MouseEvent, ReactNode } from 'react';

import { DialogProps } from '../../dialog.model';
import { RowData } from '@kleeen/react/components';

/**
 * Interfaces
 */

export interface AddDialogPayload {
  entity: { [key: string]: any };
  entityKey: string;
  parent?: { id: string; entity: string };
}

export interface BaseAddDialogProps extends DialogProps {
  action: Action;
  attributes: AttributeProps[];
  onAction: (e: MouseEvent, payload: AddDialogPayload) => void;
  parent?: ParentProps;
  taskName: string;
  translate: Translate;
}

export interface CurrentRowsProps extends RowData {
  objectId: {
    displayValue: number;
  };
}

export interface AddDialogProps extends BaseAddDialogProps {
  children: ReactNode;
  className?: string;
  context: {
    currentRows?: CurrentRowsProps[];
    customModalProps?: Record<string, any>;
    editedRows?: any[]; // TODO @cafe to add a shape for rows and use it everywhere
  };
  containerId?: string;
}

/**
 * Types
 */

export type AttributesDialogMap = { [key: string]: string };
