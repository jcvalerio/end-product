import './SnackBarSection.scss';

import { Action, ActionEnum, SelectedStatsSectionProps, bem } from './snack-bar-utils';
import { FormControl, InputLabel, Select } from './styled-components';

import { KsButton as Button } from '@kleeen/react/components';
import MenuItem from '@material-ui/core/MenuItem';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiTypography from '@material-ui/core/Typography';
import React from 'react';
import classnames from 'classnames';

// Select And Execute
const SelectedStatsSection1 = (props: {
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <FormControl variant="outlined" className={classnames(bem, 'select-action-form')}>
        <InputLabel id="select-action-label" className={classnames(`${bem}__label`, 'select-action-label')}>
          Select Action
        </InputLabel>
        <Select
          labelId="select-action-label"
          id="select-action-label"
          className={classnames(`${bem}__action`, 'select-action')}
          label="Select Action"
        >
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
        <MuiTypography
          variant="caption"
          display="block"
          className={classnames(`${bem}__action-tip`, 'action-tip')}
        >
          Select an action to bulk perform
        </MuiTypography>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classnames(`${bem}__cta`, 'action-button')}
        onClick={() => {
          console.log('GO');
        }}
      >
        GO
      </Button>
    </>
  );
};

// Multi button group
const SelectedStatsSection2 = (props: {
  actions: Action[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  return (
    <>
      {props.actions.map(({ type, label, func, disabled, tooltip = '' }, index) => {
        switch (type) {
          case ActionEnum.DELETE:
            return (
              <MuiTooltip key={`${label}-${index}`} title={tooltip} placement="top">
                <span>
                  <Button
                    className={classnames(`${bem}__cta--delete`, 'multi-button')}
                    color="primary"
                    data-kleeen-analytics-attrs={`component:ActionsSection,action:${type.toLowerCase()}`}
                    data-kleeen-analytics-name="click"
                    data-kleeen-analytics-on="click"
                    disabled={disabled}
                    key={'delete'}
                    onClick={handleClickOpen}
                    variant="contained"
                  >
                    DELETE
                  </Button>
                </span>
              </MuiTooltip>
            );
          case ActionEnum.CUSTOM:
            return (
              <MuiTooltip key={`${label}-${index}`} title={tooltip} placement="top">
                <span>
                  <Button
                    className={classnames(`${bem}__cta--custom`, 'multi-button')}
                    color="primary"
                    data-kleeen-analytics-attrs={`component:ActionsSection,action:${type.toLowerCase()}`}
                    data-kleeen-analytics-name="click"
                    data-kleeen-analytics-on="click"
                    data-testid={`${(label || '').toLowerCase()}-action`}
                    disabled={disabled}
                    key={label}
                    onClick={func}
                    variant="contained"
                  >
                    {label}
                  </Button>
                </span>
              </MuiTooltip>
            );
        }
      })}
    </>
  );
};

export const SelectedStatsSection = ({
  showSelectAndExecute,
  actions,
  setOpen,
}: SelectedStatsSectionProps) => {
  return showSelectAndExecute ? (
    <SelectedStatsSection1 actions={actions} setOpen={setOpen} />
  ) : (
    <SelectedStatsSection2 actions={actions} setOpen={setOpen} />
  );
};
