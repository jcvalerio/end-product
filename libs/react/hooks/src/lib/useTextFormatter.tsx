import { AggregationType, Attribute, DateTimeFormatOptions, FormatProps } from '@kleeen/types';
import { IntlShape, createIntl, createIntlCache } from '@formatjs/intl';
import { Language, useLocalization } from './useLocalization';

import { ReactNode } from 'react';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { omit } from 'ramda';

interface AttributeFormatProps {
  format: FormatProps;
  formatType: string;
  transformation?: string;
}

enum FormatTypes {
  date = 'formatDate',
  number = 'formatNumber',
}

type FormatOptions = DateTimeFormatOptions | { style?: string; maximumFractionDigits?: number };

interface FormatConfiguration {
  format: string;
  options: FormatOptions;
  transformValue?: (value: ReactNode) => ReactNode;
}

const cache = createIntlCache();
let globalIntl: IntlShape<string>;
let globalLocale: Language;

const getIntl = (lang: Language): IntlShape<string> => {
  if (!globalIntl || lang !== globalLocale) {
    globalIntl = createIntl({ locale: lang }, cache);
    globalLocale = lang;
  }
  return globalIntl;
};

const formatByTransformation = {
  [AggregationType.Average]: FormatTypes.number,
  [AggregationType.Min]: FormatTypes.number,
  [AggregationType.Max]: FormatTypes.number,
  [AggregationType.Sum]: FormatTypes.number,
  [AggregationType.Latest]: FormatTypes.number,
  [AggregationType.Oldest]: FormatTypes.number,
  [AggregationType.SelfSingle]: FormatTypes.number,
  [AggregationType.SelfMulti]: FormatTypes.number,
  [AggregationType.MaxSparkline]: FormatTypes.number,
};

const decimalOptions = { style: 'decimal', maximumFractionDigits: 2 };

export const formatByType = {
  USD: {
    transformations: formatByTransformation,
    options: { style: 'currency', currency: 'USD' },
  },
  percent: {
    transformations: formatByTransformation,
    options: { style: 'percent', maximumFractionDigits: 2 },
    transformValue: (value: ReactNode) => Number(value) / 100,
  },
  double: {
    transformations: formatByTransformation,
    options: decimalOptions,
  },
  random: {
    transformations: formatByTransformation,
    options: decimalOptions,
  },
  latitude: {
    transformations: formatByTransformation,
    options: decimalOptions,
  },
  longitude: {
    transformations: formatByTransformation,
    options: decimalOptions,
  },
  integer: {
    transformations: omit([AggregationType.SelfSingle, AggregationType.SelfMulti], formatByTransformation),
    options: decimalOptions,
  },
  severity_score: {
    transformations: formatByTransformation,
    options: decimalOptions,
  },
  timestamp: {
    defaultFormat: FormatTypes.date,
    options: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
  },
};

const getMaxFractionDigits = (format: FormatProps) => {
  return !isNilOrEmpty(format.maximumFractionDigits)
    ? { maximumFractionDigits: format.maximumFractionDigits }
    : null;
};

const formatMapByType = {
  timestamp: (format: FormatProps) => format.dateTime,
  double: getMaxFractionDigits,
  random: getMaxFractionDigits,
  latitude: getMaxFractionDigits,
  longitude: getMaxFractionDigits,
};

function getConfigurationByType(type: string, transformation: AggregationType): FormatConfiguration {
  const { transformations, options, defaultFormat, transformValue } = formatByType[type] || {};
  const format = !isNilOrEmpty(transformations) && transformations[transformation];

  return { format: format || defaultFormat, options, transformValue };
}

export type Formatter = (value: ReactNode) => ReactNode;

const defaultFormatter = (value: ReactNode) => value;

export const useTextFormatter = (textFormatter: AttributeFormatProps): [Formatter] => {
  // TODO: @cafe control language and textFormatter in an effect
  const { language } = useLocalization();
  const formatter = getTextFormatter({
    attributeFormat: textFormatter,
    language,
  });

  // TODO: @cafe check if we really need to return this as an array
  return [formatter];
};

export function getTextFormatter({
  attributeFormat,
  language,
}: {
  attributeFormat: AttributeFormatProps;
  language: Language;
}): Formatter {
  const { format, options, transformValue } = getConfigurationByType(
    attributeFormat.formatType,
    (attributeFormat.transformation as AggregationType) || AggregationType.SelfSingle,
  );

  if (isNilOrEmpty(format)) {
    return defaultFormatter;
  }

  const intl = getIntl(language);
  const typeFormatMap = formatMapByType[attributeFormat.formatType];
  const typeFormat = !isNilOrEmpty(typeFormatMap) && typeFormatMap(attributeFormat.format || {});
  const formatToUse = typeFormat || options;

  const formatter = (value: ReactNode): ReactNode => {
    const transformedValue = !isNilOrEmpty(transformValue) ? transformValue(value) : value;

    return intl[format](transformedValue, formatToUse);
  };

  return formatter;
}
