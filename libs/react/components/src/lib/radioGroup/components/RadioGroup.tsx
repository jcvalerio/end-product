import { ChangeEvent, useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MaterialRadioGroup,
  Radio,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { RadioGroupProps } from '../RadioGroup.model';
import { ReactElement } from '@kleeen/types';
import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './RadioGroup.style';

/**
 * Renders a group with the options as radio buttons, single selector
 * wraps RadioGroup from Material-ui
 *
 * @param title above the radio group
 * @param options raw
 *      {isLoading: boolean, data: Array(3)}
 *      --transforming-->
 *      [{value1, label1}, {value2, label2} ... ]
 */
export function RadioGroupComponent(props: RadioGroupProps): ReactElement {
  const [valueSelect, setValueSelect] = useState('');
  const {
    formControlLabelCardOneElement,
    formControlLabelCard,
    tooltip,
    formControlLabel,
    formControlLabelDetails,
    formLabel,
  } = useStyles();

  const {
    options,
    defaultSelectionValue,
    title,
    onSelect,
    disabled = false,
    hideTitle = false,
    inSummaryDetails = false,
  } = props;

  const { data = [], isLoading = false } = options;

  const getValue = (option) => {
    if (!option) return;
    const { value, id, displayValue } = option;
    return value || id || displayValue;
  };

  const formattedOptions = data.filter(Boolean).map((option) => ({
    value: getValue(option),
    label: option.displayValue,
    id: option.id,
  }));
  const getSelected = (ev: string, val: string) => formattedOptions.find((e) => e[ev] === val);

  useEffect(() => {
    const selected = getSelected('label', defaultSelectionValue);
    const selectedValue = selected?.value || defaultSelectionValue;
    setValueSelect(selectedValue);
  }, [defaultSelectionValue]);

  const maxCharactersAllowed = inSummaryDetails ? 15 : 43;
  const withMarginLeft = inSummaryDetails ? '' : 'withMarginLeft';
  const classesToUse = data.length === 1 ? formControlLabelCardOneElement : formControlLabelCard;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSelect(event.target.value);
    if (isNilOrEmpty(onSelect)) return;
    const { id, value, label } = getSelected('value', event.target.value);
    const selected = { id, value, displayValue: label };
    onSelect(selected);
  };

  if (isLoading) return null;

  return (
    <FormControl component="fieldset" className={withMarginLeft}>
      {hideTitle && (
        <Tooltip placement="top" className={tooltip} title={title}>
          <FormLabel className={formLabel} disabled={disabled}>
            {title}
          </FormLabel>
        </Tooltip>
      )}
      <MaterialRadioGroup
        row
        aria-label={title}
        name={`materialRadioGroup-${title}`}
        value={valueSelect}
        onChange={handleChange}
      >
        {formattedOptions.map(({ label, value }) => (
          <Tooltip
            placement="top"
            className={tooltip}
            title={label?.length > maxCharactersAllowed ? label : ''}
          >
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              disabled={disabled}
              label={
                <Typography
                  className={classnames(formControlLabel, {
                    [formControlLabelDetails]: inSummaryDetails,
                    [classesToUse]: !inSummaryDetails,
                  })}
                >
                  {label}
                </Typography>
              }
            />
          </Tooltip>
        ))}
      </MaterialRadioGroup>
    </FormControl>
  );
}

export default RadioGroupComponent;
