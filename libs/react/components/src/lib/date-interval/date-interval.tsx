import './date-interval.scss';
import 'react-calendar-datetime-picker/dist/index.css';

import React, { useEffect, useState } from 'react';

import { DateTimeIntervalProps } from './date-interval.model';
import { DtCalendar } from 'react-calendar-datetime-picker';
import { KUIConnect } from '@kleeen/core-react';
import { KsButton } from '../button';

import moment from 'moment';

function DateIntervalBase(props: DateTimeIntervalProps): JSX.Element {
  const { translate, datePickerState, handleCloseDateFilter, setOpenCustomRange } = props;
  const { from = moment(), to = moment(), setFrom, setTo } = datePickerState;
  const fromValue = from.toDate();
  const toValue = to.toDate();

  const defaultValue = {
    from: {
      year: fromValue.getFullYear(),
      month: fromValue.getMonth() + 1,
      day: fromValue.getDate(),
      hour: fromValue.getHours(),
      minute: fromValue.getMinutes(),
      seconds: fromValue.getSeconds(),
    },
    to: {
      year: toValue.getFullYear(),
      month: toValue.getMonth() + 1,
      day: toValue.getDate(),
      hour: toValue.getHours(),
      minute: toValue.getMinutes(),
      seconds: toValue.getSeconds(),
    },
  };

  const [value, setValue] = useState(defaultValue);
  const [initValue, setInitValue] = useState(defaultValue);
  const [toggleClear, setToggleClear] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
    setInitValue(defaultValue);
  }, [toggleClear]);

  const parseValue = (valueParser) => {
    return valueParser < 10 ? `0${valueParser}` : valueParser;
  };

  const parserMoment = (date) => {
    const dateFormat = `${date?.year}-${parseValue(date?.month)}-${parseValue(date?.day)}T${parseValue(
      date?.hour,
    )}:${parseValue(date?.minute)}`;
    return { dateFormat, moment: moment(dateFormat) };
  };

  const applyClick = (): void => {
    if (value.to) {
      datePickerState.setFrom(parserMoment(value.from).moment);
      datePickerState.setTo(parserMoment(value.to).moment);
    } else {
      const dateToday = new Date();
      const parsedMomentToday = parserMoment({
        year: dateToday.getFullYear(),
        month: dateToday.getMonth() + 1,
        day: dateToday.getDate(),
        hour: dateToday.getHours(),
        minute: dateToday.getMinutes(),
        seconds: dateToday.getSeconds(),
      }).moment;
      const parsedMomentFrom = parserMoment({
        year: value.from.year,
        month: value.from.month + 1,
        day: value.from.day,
        hour: dateToday.getHours(),
        minute: dateToday.getMinutes(),
        seconds: dateToday.getSeconds(),
      }).moment;
      if (moment(dateToday).isBefore(`${value.from.year}-${value.from.month + 1}-${value.from.day}`)) {
        datePickerState.setFrom(parsedMomentToday);
        datePickerState.setTo(parsedMomentFrom);
      } else {
        datePickerState.setFrom(parsedMomentFrom);
        datePickerState.setTo(parsedMomentToday);
      }
    }
    setOpenCustomRange(false);
    handleCloseDateFilter();
  };

  const clear = () => {
    datePickerState.setTo(undefined);
    datePickerState.setFrom(undefined);
    setToggleClear(!toggleClear);
  };

  return (
    <>
      <DtCalendar
        onChange={setValue}
        initValue={initValue}
        type="range"
        withTime
        todayBtn
        inputClass="custom-input"
        daysClass="custom-days"
        headerClass="custom-header"
      />
      <div className="date-interval-step">
        <KsButton onClick={() => clear()}>{translate('app.dateInterval.clear')}</KsButton>
        <KsButton onClick={() => applyClick()}>{translate('app.dateInterval.save')}</KsButton>
      </div>
    </>
  );
}

export const DateInterval = React.memo(KUIConnect(({ translate }) => ({ translate }))(DateIntervalBase));
