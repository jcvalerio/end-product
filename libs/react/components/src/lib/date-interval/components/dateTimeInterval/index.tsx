import './dateTimeInterval.scss';

import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/moment';
import { DateValueIntervalProps } from '../../date-interval.model';
import MuiTextField from '@material-ui/core/TextField';
import React from 'react';
import { styled } from '@material-ui/core';

const TextField = styled(MuiTextField)({
  '& Label': {
    color: 'var(--outlined-input)',
  },
  '& .Mui-focused': {
    color: 'var(--outlined-input-focus)',
  },
  '& .Mui-disabled': {
    color: 'var(--alt-mid-color);',
  },
  '& .MuiFormHelperText-root': {
    color: 'var(--on-surface-color)',
    opacity: 0.5,
    fontSize: 'var(--tx-1XS)',
  },
  '& .MuiInputBase-root': {
    color: 'var(--on-surface-color)',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'var(--pm-7XS) solid var(--outlined-input)',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-hover)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-focus)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--outlined-input)',
    borderRadius: '8px',
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-hover)',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    color: 'var(--outlined-input-focus)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--outlined-input-focus)',
    },
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});

export const DateTimeInterval = (value: DateValueIntervalProps): JSX.Element => {
  const { date, set, props, step } = value;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={'date-interval-detail'}>
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/**step === 0 && (
          <DatePicker
            autoOk
            variant="static"
            openTo="date"
            value={date}
            onChange={set}
            showTodayButton={false}
            {...props}
          />
        )}
        {step === 1 && (
          <TimePicker
            autoOk
            ampm={false}
            variant="static"
            openTo="hours"
            views={['hours', 'minutes']}
            format="HH:mm"
            minutesStep={5}
            value={date}
            onChange={set}
            readOnly={false}
          />
        )*/}
      </div>
    </MuiPickersUtilsProvider>
  );
};
