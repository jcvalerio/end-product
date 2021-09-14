import { IntervalDate } from '@kleeen/types';
import { KUIConnect } from '@kleeen/core-react';
import { KsButton } from '@kleeen/react/components';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { RelativeTimePickerProps } from './RelativeTimePicker.model';
import { isNil } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './RelativeTimePicker.style';

export const RelativeTimePickerBase = ({
  translate,
  handleOpenCustomRange,
  setRelativeDate,
  datePickerState,
  handleCloseDateFilter,
  handleFilter,
}: RelativeTimePickerProps): JSX.Element => {
  const classes = useStyles();
  const isApply = !isNil(handleFilter);

  const handleCloseDateFilterTimeOut = (): void => {
    setTimeout(() => {
      handleCloseDateFilter();
    }, 250);
  };

  const menuItemClick = (opt: string): void => {
    setRelativeDate(IntervalDate[opt]);
    if (!isApply) {
      handleCloseDateFilterTimeOut();
    }
  };

  const actionButton = (): void => {
    if (!isNilOrEmpty(handleFilter)) {
      handleFilter();
    } else {
      datePickerState.setTo(undefined);
      datePickerState.setFrom(undefined);
      datePickerState.setRelativeDate(undefined);
      handleCloseDateFilterTimeOut();
    }
  };

  const { relativeDate } = datePickerState;

  return (
    <div className={classes.relativePickerContainer}>
      <div className="header">{translate('app.dateInterval.title')}</div>
      <Paper className={classes.paper}>
        <MenuList>
          {Object.keys(IntervalDate).map((opt) => {
            return (
              <MenuItem
                key={opt}
                onClick={() => menuItemClick(opt)}
                className={
                  IntervalDate[opt] === relativeDate ? classes.selectedOptionButton : classes.optionButtons
                }
              >
                {translate('app.dateInterval.interval.' + opt)}
              </MenuItem>
            );
          })}
          <MenuItem
            key="customDateInterval"
            className={!relativeDate ? classes.selectedOptionButton : classes.optionButtons}
            onClick={handleOpenCustomRange}
          >
            {translate('app.dateInterval.custom')}
          </MenuItem>
        </MenuList>
      </Paper>
      <div className="footer">
        {/**TODO add apply translation */}
        <KsButton onClick={actionButton}>
          {isApply ? translate('app.dateInterval.apply') : translate('app.dateInterval.clear')}
        </KsButton>
      </div>
    </div>
  );
};

export const RelativeTimePicker = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(RelativeTimePickerBase),
);
