import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { MouseEvent } from 'react';

import { CustomDialogProps } from './custom-dialog.model';
import { KsButton } from '../../../button';
import { KsDialog } from '../../dialog.styles';
import capitalize from 'lodash.capitalize';
import { useTheme } from '@kleeen/react/hooks';

export function KsCustomDialog({ children, onAction, onClose, open, title }: CustomDialogProps): JSX.Element {
  const { themeClass } = useTheme();

  function handleAction(e: MouseEvent): void {
    onAction(e);
    onClose();
  }

  function handleClose(): void {
    onClose();
  }

  // TODO: @guaria check if this refactor make sense
  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={open}>
      <DialogTitle id="form-dialog-title">
        {typeof title === 'string' ? capitalize(title.toString()) : title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <KsButton onClick={handleClose}>Cancel</KsButton>
        <KsButton onClick={handleAction} color="primary">
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}

export * from './custom-dialog.model';
