import { DialogProps } from '@kleeen/react/components';
import { MouseEvent } from 'react';

export interface ConfirmationDialogProps extends DialogProps {
  onAction: (e: MouseEvent) => void;
}
