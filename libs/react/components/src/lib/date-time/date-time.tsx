import './date-time.scss';

import { DateTimeFormat, convertToMoment } from '@kleeen/i18n';
import { path, pathOr } from 'ramda';

import DateFnsUtils from '@date-io/moment';
import { DateTimePicker } from './components';
import { DateTimeProps } from './date-time.model';
import { KUIConnect } from '@kleeen/core-react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useStyles } from './date-time.styles';

function DateTimeBase({ translate, ...props }: DateTimeProps): JSX.Element {
  const classes = useStyles();

  const handleOnChange = path(['handleOnChange'], props);
  const localization = {
    defaultLabel: translate('app.datetime.label') || '',
  };

  const disabled = pathOr(false, ['disabled'], props);
  const variant = pathOr('inline', ['inline'], props);
  const label = pathOr(localization.defaultLabel, ['label'], props);
  const defaultValueToUse = path(['defaultValue'], props);
  const defaultValue = convertToMoment(defaultValueToUse);

  const handleOnChangeLocal = (date: moment.Moment): void => {
    if (handleOnChange) {
      handleOnChange(date);
    }
  };

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={defaultValue}
          variant={variant}
          onChange={handleOnChangeLocal}
          label={label}
          disabled={disabled}
          format={DateTimeFormat.DEFAULT_DATE_TIME}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export const DateTime = React.memo(KUIConnect(({ translate }) => ({ translate }))(DateTimeBase));
