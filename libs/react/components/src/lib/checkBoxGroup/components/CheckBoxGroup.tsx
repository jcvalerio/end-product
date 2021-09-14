import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { ICheckBoxGroupProps } from '../CheckBoxGroup.model';
import { pathOr } from 'ramda';

const useStyles = makeStyles({
  formLabel: {
    maxWidth: 'var(--wh-3XL)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--outlined-input)',
    fontSize: 'var(--tx-M)',
    paddingBottom: 'var(--pm-1XS)',
    '&.Mui-focused': {
      color: 'var(--outlined-input-focus)',
    },
    '&.Mui-disabled': {
      color: 'var(--alt-mid-color);',
    },
  },
  formControlLabel: {
    fontSize: 'var(--size-textM)',
    color: 'var(--on-surface-color)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  formControlLabelCard: {
    maxWidth: 'var(--wh-7XL)',
  },
  formControlLabelCardOneElement: {
    maxWidth: 'var(--wh-5XL)',
  },
  tooltip: {
    fontSize: 'var(--tx-M)',
  },
});

/**
 * Renders a group with the options as checkboxes, multiple selector
 *
 * @param title above the radio group
 * @param options raw
 *      {isLoading: boolean, data: Array(3)}
 *      --transforming-->
 *      [{value1, label1}, {value2, label2} ... ]
 */
export function CheckBoxGroupComponent(props: ICheckBoxGroupProps): JSX.Element {
  const options = pathOr({}, ['options'], props);

  const initialCheckedValues = pathOr([], ['initialCheckedValues'], props);
  const onChange = pathOr(() => {}, ['onChange'], props);
  const classes = useStyles();
  const isDisabled: boolean = pathOr(false, ['disabled'], props);
  const optionsLength = options?.data?.length;
  const  maxCharactersAllowed = 43;

  /** In case we will have a different value and label in the future */
  let formattedOptions = [];
  if (options.isLoading === false) {
    formattedOptions = options.data.map((rawOption) => {
      return { value: rawOption.displayValue, label: rawOption.displayValue };
    });
  }

  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    const initialCheckedUniqueValues = [];
    initialCheckedValues.forEach((singleInitialCheckedValue) => {
      const valueToBeAdded = singleInitialCheckedValue.displayValue;
      if (!initialCheckedUniqueValues.includes(valueToBeAdded)) {
        initialCheckedUniqueValues.push(valueToBeAdded);
      }
    });

    setCheckedValues(initialCheckedUniqueValues);
  }, [initialCheckedValues]);

  const handleSingleBoxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newCheckedValues = [...checkedValues];
    const { checked, value } = event.target;
    if (checked) {
      /** Add new element to checked */
      newCheckedValues.push(value);
    } else {
      /** Remove element from checked */
      const indexOfElementToRemove = newCheckedValues.indexOf(value);
      if (indexOfElementToRemove > -1) {
        newCheckedValues.splice(indexOfElementToRemove, 1);
      }
    }

    setCheckedValues(newCheckedValues);

    /**
     * onChange needs to receive an item with the same shape
     * does not work with an array of string values
     * it only works by creating an object as {displayValue: 'theValueHere'}
     *
     * Shape of received {displayValue: "2", value: null, id: "5082e466-a933-4bfb-b100-4258667faa86"}
     */
    const formattedWithDisplayNameValues = [];
    newCheckedValues.forEach((newValue) => {
      const formattedItemToBeAdded = {
        displayValue: newValue,
      };
      formattedWithDisplayNameValues.push(formattedItemToBeAdded);
    });
    onChange(formattedWithDisplayNameValues);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {formattedOptions.map((option) => (
          <Tooltip
            placement="top-end"
            className={classes.tooltip}
            title={option?.label?.length > maxCharactersAllowed ? option.label : ''}
          >
            <FormControlLabel
              disabled={isDisabled}
              key={option.value}
              value={option.value}
              control={
                <Checkbox onChange={handleSingleBoxChange} checked={checkedValues.includes(option.value)} />
              }
              label={
                <Typography
                  className={`${classes.formControlLabel} ${
                    optionsLength === 1
                      ? classes.formControlLabelCardOneElement
                      : classes.formControlLabelCard
                  }`}
                >
                  {option.label}
                </Typography>
              }
            />
          </Tooltip>
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default CheckBoxGroupComponent;
