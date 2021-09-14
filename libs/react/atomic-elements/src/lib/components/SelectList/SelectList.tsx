import './SelectList.scss';

import { FormControl, makeStyles, styled } from '@material-ui/core';
import { KsMenuItem } from '@kleeen/react/components';
import { useTheme } from '@kleeen/react/hooks';
import { ViewOption } from '@kleeen/types';
import classnames from 'classnames';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect, { SelectProps } from '@material-ui/core/Select';
import React from 'react';

const bem = 'ks-select-list';

interface SelectListProps extends SelectProps {
  onChange: (value: unknown, child?: React.ReactNode) => void;
  options: { label: string; value: string | number; option?: ViewOption }[];
  taskName?: string;
}

const InputLabel = styled(MuiInputLabel)({
  color: 'var(--outlined-input)',
  fontSize: 'var(--tx-M)',
  left: 'auto',
  '&.Mui-focused': {
    color: 'var(--outlined-input-hover)',
  },
});

const MenuItem = styled(KsMenuItem)({
  '&.Mui-selected': {
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--on-secondary-color)',
    '&:hover': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  },
  '&:hover': {
    backgroundColor: 'inherit',
    color: 'inherit',
  },
});

const Select = styled(MuiSelect)({
  '& .MuiSelect-select': {
    '&:focus': {
      backgroundColor: 'var(--transparent)',
    },
  },
  '& fieldset': {
    'border-color': 'var(--outlined-input)',
    borderRadius: '8px',
  },
  '&:hover': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--outlined-input-hover)',
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--outlined-input-hover)',
    },
    '& .MuiSelect-root': {
      color: 'var(--outlined-input)',
    },
  },
  '& .MuiSelect-root': {
    color: 'var(--outlined-input)',
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'var(--menu-bg-color)',
    boxShadow: 'var(--shadow-elevation-mid-key)',
    color: 'var(--on-surface-color)',
  },
  popover: {
    backdropFilter: 'blur(4px)',
  },
});

export const SelectList = ({
  onChange,
  value,
  options,
  labelId,
  id,
  label,
  taskName,
  ...rest
}: SelectListProps): JSX.Element => {
  const { themeClass } = useTheme();
  const styles = useStyles();
  return (
    <FormControl
      className={classnames(bem, 'select-action-container')}
      data-testid="select-list"
      variant="outlined"
    >
      <InputLabel id="select-action-label" className={classnames(`${bem}__label`, 'select-action-label')}>
        {label}
      </InputLabel>
      <Select
        className={classnames(`${bem}__action`, 'select-action')}
        data-testid="select-list-action"
        disabled={options?.length === 1}
        id={id}
        key={value.toString()}
        label={label}
        labelId={labelId}
        MenuProps={{
          className: themeClass,
          classes: { paper: styles.paper },
          PopoverClasses: { paper: styles.popover },
        }}
        value={value}
        {...rest}
      >
        {options.map((option) => {
          const { value: optionValue, label: optionLabel, option: rawOption } = option;
          return (
            <MenuItem
              key={optionValue}
              value={optionValue}
              onClick={() => {
                onChange(optionValue, rawOption);
              }}
            >
              {optionLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
