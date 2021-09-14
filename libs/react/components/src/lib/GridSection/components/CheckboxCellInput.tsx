import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import { CellInputProps } from './CellInput.model';
import { makeStyles } from '@material-ui/core/styles';
import { Cell } from '@kleeen/types';

export const useStyles = makeStyles({
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const CheckboxCellInput = ({ amendCellUpdate, attr, cell, row }: CellInputProps) => {
  const classes = useStyles();
  const singleValueCell = cell as Cell;
  return (
    <div className={classes.checkboxContainer}>
      <Checkbox
        onChange={(e) => {
          amendCellUpdate({
            attributeName: attr.name,
            rowId: row.id,
            value: { displayValue: e.target.checked },
          });
        }}
        checked={Boolean(singleValueCell?.displayValue)}
      />
    </div>
  );
};

export default CheckboxCellInput;
