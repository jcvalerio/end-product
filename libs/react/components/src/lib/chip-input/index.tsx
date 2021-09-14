import './chip-input.scss';

import React, { ReactElement } from 'react';

import { ChipInputProps } from './chip-input.model';
import MuiChipInput from 'material-ui-chip-input';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  helperText: {
    color: 'var(--checkbox-description-color)',
    fontSize: 'var(--tx-M)',
  },
});

// Component complete interface found here https://github.com/TeamWertarbyte/material-ui-chip-input#properties
export const KsChipInput = ({
  className,
  children,
  max,
  useSeverityColors = false,
  value,
  ...restProps
}: ChipInputProps & { children?: ReactElement | ReactElement[] }): ReactElement => {
  return (
    <MuiChipInput
      fullWidth={true}
      classes={useStyles()}
      value={value}
      onBeforeAdd={() => (max !== undefined ? value.length < max : true)}
      className={classNames(
        'chip-input',
        className,
        useSeverityColors ? `severity-chips-${value.length}` : '',
      )}
      {...restProps}
    >
      {children}
    </MuiChipInput>
  );
};
