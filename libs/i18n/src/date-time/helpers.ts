import 'moment-timezone';

import { DateTimeFormat, Timezone } from './enums';

import { DEFAULT_TIME_ZONE } from './constants';
import { isNilOrEmpty } from '@kleeen/common/utils';
import moment from 'moment';

type PossibleDate = string | Date | moment.Moment;

interface ConvertToMomentResult {
  success: boolean;
  value?: moment.Moment;
}

export function convertToServerTimezone(value: PossibleDate): string | undefined {
  const dateAsMoment: ConvertToMomentResult = toMoment(value);
  if (dateAsMoment.success) {
    return dateAsMoment?.value?.utc().format();
  }
  return;
}

export function convertToClientTimezone(date: PossibleDate, timezone: Timezone): moment.Moment | undefined {
  const dateAsMoment = convertToMoment(date);
  if (!dateAsMoment) return dateAsMoment;
  const { value }: ConvertToMomentResult = toMoment(dateAsMoment, timezone);
  return value;
}

export function toMoment(
  value: PossibleDate,
  timezone = Timezone.UTC,
  format = DateTimeFormat.DEFAULT_DATE_TIME,
): ConvertToMomentResult {
  if (isNilOrEmpty(value)) {
    return {
      success: false,
      value: undefined,
    };
  }

  let momentDate: moment.Moment | undefined;
  if (moment.isMoment(value)) {
    momentDate = value;
  } else {
    momentDate =
      timezone === Timezone.UTC ? moment.utc(new Date(value), format) : moment.tz(new Date(value), timezone);
  }

  if (momentDate.isValid()) {
    if (timezone) {
      momentDate = convertToTimezone(momentDate, timezone);
    }
    return {
      success: true,
      value: momentDate,
    };
  }
  return {
    success: false,
    value: undefined,
  };
}

export function convertToMoment(
  date: PossibleDate,
  timezone = DEFAULT_TIME_ZONE,
  format = DateTimeFormat.DEFAULT_DATE_TIME,
): moment.Moment | undefined {
  const { success, value } = toMoment(date, timezone, format);
  return success ? value : undefined;
}

export function convertToTimezone(
  momentDate: moment.Moment,
  timezone = Timezone.UTC,
): moment.Moment | undefined {
  if (isNilOrEmpty(momentDate) || !moment.isMoment(momentDate) || !momentDate.isValid()) {
    return;
  }
  const toTimezone = timezone || DEFAULT_TIME_ZONE;
  return momentDate.tz ? momentDate.tz(toTimezone) : moment.tz(momentDate, toTimezone);
}

export function getClientTimezone(): string {
  return moment.tz.guess();
}

export function getTimezone(timezone: Timezone): string {
  if (!isNilOrEmpty(timezone) && moment.tz.zone(timezone)) {
    return timezone;
  }
  return getClientTimezone();
}

export function toDateTimeFormat(value: moment.Moment, format = DateTimeFormat.DEFAULT_DATE_TIME): string {
  return isNilOrEmpty(value) ? '' : value.format(format);
}

export function getCurrentDateTime(): moment.Moment {
  return moment();
}
