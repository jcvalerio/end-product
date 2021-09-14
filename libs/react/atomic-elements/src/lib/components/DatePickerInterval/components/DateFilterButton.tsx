import React from 'react';
import Grid from '@material-ui/core/Grid';
import TodayIcon from '@material-ui/icons/Today';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { StyledButton } from './DateFilterButton.style';
import { DateFilterButtonProps } from './DateFilterButton.model';
import { IntervalDate } from '@kleeen/types';
import { KUIConnect } from '@kleeen/core-react';

export const DateFilterButtonComponent = ({
  onClick,
  datePickerState,
  translate,
}: DateFilterButtonProps): JSX.Element => {
  const { from, to, relativeDate } = datePickerState;
  const getIntervalDateKey = (value: string): string => {
    let auxKey = '';
    Object.keys(IntervalDate).forEach((key) => {
      if (value === IntervalDate[key]) {
        auxKey = key;
      }
    });
    return auxKey;
  };
  return (
    <StyledButton
      onClick={() => {
        onClick();
      }}
    >
      <Grid container>
        <Grid container alignItems="center" className="calendar-icon-container">
          <TodayIcon />
        </Grid>
        <Grid container alignItems="center" className="dates-container">
          {relativeDate ? (
            <div>
              <div>
                <span className="on-surface-color">
                  {translate('app.dateInterval.interval.' + getIntervalDateKey(relativeDate))}
                </span>
              </div>
            </div>
          ) : (
            <>
              {from && (
                <div className={to ? 'date-from' : ''}>
                  <span className="on-surface-color">From</span>
                  {` ${from?.format('MM/DD/YYYY')} `}
                  <span className="on-surface-color">at</span>
                  {` ${from?.format('HH:mm')}`}
                </div>
              )}
              {to && (
                <div>
                  <span className="on-surface-color">To</span>
                  {` ${to?.format('MM/DD/YYYY')} `}
                  <span className="on-surface-color">at</span>
                  {` ${to?.format('HH:mm')}`}
                </div>
              )}
              {!from && !to && <div className="placeholder">Pick a date...</div>}
            </>
          )}
        </Grid>
        <Grid container alignItems="center" className="arrow-container">
          <ArrowDropDownIcon />
        </Grid>
      </Grid>
    </StyledButton>
  );
};

export const DateFilterButton = React.memo(
  KUIConnect(({ translate }) => ({ translate }))(DateFilterButtonComponent),
);
