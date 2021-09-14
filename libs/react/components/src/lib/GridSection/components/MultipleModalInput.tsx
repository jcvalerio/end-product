import { Cell } from '@kleeen/types';
import { CellInputProps } from './CellInput.model';
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { KsButton } from '../../button';
import { KsDialogStreamlined } from '../../dialog/dialog.styles';
import { KsToken } from '../../token';
import { KUIConnect } from '@kleeen/core-react';
import { useTheme } from '@kleeen/react/hooks';
import React, { useEffect, useState } from 'react';

function MultipleModalInputBase({
  amendCellUpdate,
  attr,
  autocomplete,
  cell,
  editingCell,
  setEditingCell,
  rowDisplayValue,
  translate,
}: CellInputProps) {
  const { themeClass } = useTheme();
  const [inputValue, setInputValue] = useState<Cell[]>([]);
  const dialogTitle = `${translate('app.edit')} ${attr.name} ${translate('app.for')} ${rowDisplayValue}`;

  useEffect(() => {
    const isValidCell = !isNilOrEmpty(cell);

    if (isValidCell) {
      setInputValue(cell as Cell[]);
    }
  }, [cell]);

  function handleSave(): void {
    amendCellUpdate({
      attributeName: editingCell.attributeName,
      rowId: editingCell.rowId,
      value: inputValue,
    });
  }

  return (
    <>
      <span>{translate('app.editing')}...</span>
      <KsDialogStreamlined aria-labelledby="input-dialog-title" className={themeClass} open={true}>
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <KsToken
            inputMaxHeight="70vh"
            isAddable={attr.canAddValues}
            options={autocomplete.data || []}
            placeholder={attr.label}
            getOptionLabel={({ displayValue }) => (displayValue ? String(displayValue) : '')}
            onInputChange={(e, value, signal) => {
              if (signal === 'clear' || (signal === 'input' && value === '')) {
                setInputValue([]);
              } else if (value) setInputValue(value);
            }}
            value={inputValue}
            onChange={(_, options, eventType) => {
              if (options) {
                if (eventType === 'create-option' && attr.canAddValues) {
                  const lastOption = options[options.length - 1];
                  const newOptions = [...options.slice(0, options.length - 1), { displayValue: lastOption }];
                  setInputValue(newOptions);
                  return;
                } else {
                  setInputValue(options);
                }
              }
            }}
            format={attr.format}
            formatType={attr.formatType}
          />
          <DialogActions>
            <KsButton onClick={() => setEditingCell({})}>{translate('app.modal.action.cancel')}</KsButton>
            <KsButton onClick={handleSave}>{translate('app.modal.action.save')}</KsButton>
          </DialogActions>
        </DialogContent>
      </KsDialogStreamlined>
    </>
  );
}

export const MultipleModalInput = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(MultipleModalInputBase),
);
