import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import { IRadioGroupFormProps } from './radioGroup-form.model';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { useStyles } from './radioGroup-form.styles';

function RadioGroupForm({ title, ...props }: IRadioGroupFormProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <div className={classes.labelContainer}>
        <span className={classes.label}>{title}</span>
      </div>
      <div className={classes.radioGroupContainer}>
        <FormControl component="fieldset">
          <RadioGroup name="value" value={props.value} onChange={props.onChange}>
            {props.options.map((option) => (
              <FormControlLabel
                className={classes.formControlLabel}
                control={<Radio />}
                key={option.id}
                label={option.value}
                value={option.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export const KsRadioGroupForm = React.memo(KUIConnect(({ translate }) => ({ translate }))(RadioGroupForm));
