import { ISwitchProps, IlabelPlacement } from '../Switch.model';
import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { makeStyles } from '@material-ui/core/styles';
import { pathOr } from 'ramda';
import { GenericFunction } from '@kleeen/types';

const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 'var(--tx-M)',
  },
}));

const MAX_LABEL_LENGTH = 16;

function BootstrapTooltip(localProps: React.PropsWithChildren<any>): JSX.Element {
  const classes = useStyles();
  return <Tooltip arrow classes={classes} {...localProps} />;
}

export function SwitchComponent(props: ISwitchProps): JSX.Element {
  const isDisabled: boolean = pathOr(false, ['disabled'], props);
  const onChangeHandler: GenericFunction = pathOr(() => undefined, ['handleOnChange'], props);
  const defaultValue = Boolean(pathOr(false, ['defaultValue'], props));
  const switchLabel: string = pathOr('', ['label'], props);
  const labelPlacementValue: IlabelPlacement = pathOr('start', ['labelPlacement'], props);

  const [switchState, setSwitchState] = useState({
    checked: defaultValue,
  });

  useEffect(() => {
    setSwitchState({ ...switchState, checked: defaultValue });
  }, [defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchState({ ...switchState, checked: event.target.checked });
    onChangeHandler(event.target.checked);
  };

  const truncateString = (): string => {
    return switchLabel.trim().length > MAX_LABEL_LENGTH ? 'has-ellipsis' : '';
  };

  const switchComponent = () => {
    return (
      <Switch
        checked={switchState.checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }}
        disabled={isDisabled}
      />
    );
  };

  return (
    <div>
      <BootstrapTooltip
        placement="top"
        title={switchLabel.trim().length > 0 && !isDisabled ? switchLabel : ''}
      >
        {!isNilOrEmpty(switchLabel) ? (
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={switchComponent()}
                label={switchLabel}
                labelPlacement={labelPlacementValue}
                className={truncateString()}
              />
            </FormGroup>
          </FormControl>
        ) : (
          switchComponent()
        )}
      </BootstrapTooltip>
    </div>
  );
}
