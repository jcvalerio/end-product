import { ReactElement } from '@kleeen/types';

export interface DialogProps {
  description: string | ReactElement;
  open: boolean;
  onClose: () => void;
  title: string | ReactElement;
}
