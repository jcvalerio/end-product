import React, { MouseEvent } from 'react';

import { ConfirmationDialogProps } from './ConfirmationDialog.model';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button as KsButton } from '../../ActionDialogs.styles';
import { KsDialog } from '../../../dialog';
import { ReactElement } from '@kleeen/types';
import { Translate } from '@kleeen/core-react';
import capitalize from 'lodash.capitalize';
import { useTheme } from '@kleeen/react/hooks';

export function ConfirmationActionDialog({
  description,
  onAction,
  onClose,
  open,
  title,
}: ConfirmationDialogProps): JSX.Element {
  const { themeClass } = useTheme();

  function handleAction(e: MouseEvent): void {
    onAction(e);
    onClose();
  }

  function handleClose(): void {
    onClose();
  }

  return (
    <KsDialog aria-labelledby="form-dialog-title" className={themeClass} onClose={handleClose} open={open}>
      <DialogTitle id="form-dialog-title">
        {typeof title === 'string' ? capitalize(title.toString()) : title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <KsButton onClick={handleClose}>
          <Translate id="app.modal.action.cancel" type="html" />
        </KsButton>
        <KsButton color="primary" onClick={handleAction}>
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}
