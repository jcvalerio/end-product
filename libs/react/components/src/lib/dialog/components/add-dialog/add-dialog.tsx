import { AddDialogProps, AttributesDialogMap } from './add-dialog.model';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { KsDialog, useDialogStyles as useStyles } from '../../dialog.styles';
import React, { MouseEvent, useEffect, useState } from 'react';

import { AttributeProps } from '@kleeen/types';
import { KsButton } from '../../../button';
import capitalize from 'lodash.capitalize';
import { useTheme } from '@kleeen/react/hooks';

export function KsAddDialog({
  attributes,
  children,
  className,
  containerId,
  onAction,
  onClose,
  open,
  parent,
  title,
}: AddDialogProps): JSX.Element {
  const [form, setForm] = useState({});
  const classes = useStyles();
  const { themeClass } = useTheme();

  useEffect(() => {
    if (Array.isArray(attributes)) {
      setForm(attributes.reduce(reduceAttributes, {}));
    }

    function reduceAttributes(acc: AttributesDialogMap, attribute: AttributeProps): AttributesDialogMap {
      acc[attribute.name] = `New ${attribute.name}`;

      return acc;
    }
  }, [attributes]);

  function handleAction(e: MouseEvent): void {
    const payload = {
      entity: form,
      parent,
      entityKey: attributes[0]?.name,
    };

    onAction(e, payload);
  }

  function handleClose(): void {
    onClose();
  }

  return (
    <KsDialog
      aria-labelledby="form-dialog-title"
      className={`${className} ${themeClass}`}
      data-testid="add-dialog"
      maxWidth="md"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {typeof title === 'string' ? capitalize(title.toString()) : title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent} id={containerId}>
        {children}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <KsButton data-testid="add-dialog-cancel" onClick={handleClose}>
          Cancel
        </KsButton>
        <KsButton data-testid="add-dialog-add" onClick={handleAction} color="primary">
          {title}
        </KsButton>
      </DialogActions>
    </KsDialog>
  );
}

export * from './add-dialog.model';
