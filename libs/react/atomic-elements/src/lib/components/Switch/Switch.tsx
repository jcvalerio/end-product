import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MuiSwitch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { pathOr } from 'ramda';

export interface SwitchProps {
  checked?: boolean;
  handleOnChange: () => void;
  label?: string;
  size?: 'small' | 'medium';
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

const useStyles = makeStyles(() => ({
  rootSwitch: {},
  switchBase: {
    '&.Mui-checked': {
      color: 'var(--primary-color)',
      '& +.MuiSwitch-track': {
        backgroundColor: 'var(--primary-color-variant)',
      },
    },
  },
  labelColor: {
    color: 'var(--on-primary-color)',
  },
}));

export const Switch: React.FC<SwitchProps> = (props: SwitchProps): JSX.Element => {
  const classes = useStyles();
  const checked = pathOr(false, ['checked'], props);
  const handleOnChange = pathOr(
    () => {
      return;
    },
    ['handleOnChange'],
    props,
  );
  const hasLabel = pathOr(null, ['label'], props);
  const disabled = pathOr(false, ['disabled'], props);
  const labelPlacement = pathOr('end', ['labelPlacement'], props);
  const size = pathOr('medium', ['size'], props);
  const [isChecked, setChecked] = useState(checked);

  const handleChange = (event): void => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      handleOnChange();
    }
  };

  return (
    <>
      {hasLabel ? (
        <FormGroup row>
          <FormControlLabel
            disabled={disabled}
            classes={{
              label: classes.labelColor,
            }}
            control={
              <MuiSwitch
                checked={isChecked}
                onChange={handleChange}
                size={size}
                {...props}
                classes={{
                  root: classes.rootSwitch,
                  switchBase: classes.switchBase,
                }}
              />
            }
            label={hasLabel}
            labelPlacement={hasLabel ? labelPlacement : 'right'}
          />
        </FormGroup>
      ) : (
        <MuiSwitch
          size={size}
          classes={{
            root: classes.rootSwitch,
            switchBase: classes.switchBase,
          }}
          disabled={disabled}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
      )}
    </>
  );
};
export default Switch;
