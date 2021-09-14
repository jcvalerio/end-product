import { MouseEvent, ReactNode } from 'react';

import { DialogProps } from '../../dialog.model';

export interface BaseCustomDialogProps extends DialogProps {
  onAction: (e: MouseEvent) => void;
}

export interface CustomDialogProps extends BaseCustomDialogProps {
  children: ReactNode;
}
