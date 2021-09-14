import './TextFormatter.scss';

import { AggregationType, FormatProps, SameSDTAggregations } from '@kleeen/types';

import KsFilledCircle from '../ksFilledCircle/ksFilledCircle';
import KsDisplayMedia from '../KsDisplayMedia/KsDisplayMedia';
import React from 'react';
import { TextFormatterProps } from './TextFormat.model';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';
import { isNil } from 'ramda';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useTextFormatter } from '@kleeen/react/hooks';

function getPercentage(value: number, format: FormatProps) {
  const max = format.max + 1;
  const min = format.min + 1;
  return Math.abs(((value - min) * 100) / (max - min));
}

const FormattedSeverityValue = ({
  children,
  format,
  transformation,
  textAlignment,
  formatType,
  formatter,
  hasDisplayMedia,
  cell,
}): JSX.Element => {
  const { severityLevels, severityGood, severityBad } = format;
  const hasSeverityColorFormat =
    !(isNil(severityLevels) && isNil(severityGood) && isNil(severityBad)) &&
    SameSDTAggregations.includes(transformation as AggregationType);

  if (!hasSeverityColorFormat) return formatter(children);

  const value = children as number | string;
  const color = getColorForSeverityValues(value, format, transformation);

  return (
    <div className={'text-formatter-root'} style={{ justifyContent: textAlignment }}>
      {!hasDisplayMedia ? (
        <KsFilledCircle
          color={color}
          percentage={formatType?.toString() === 'severity_score' ? getPercentage(children, format) : 100}
        />
      ) : (
        <div className={'text-formatter-display-media'}>
          <KsDisplayMedia
            color={color}
            value={cell.displayMedia.value}
            type={cell.displayMedia.type}
            size={21}
          />
        </div>
      )}
      <span className={'text-formatter'} style={{ color, textTransform: 'capitalize' }}>
        {formatter(children)}
      </span>
    </div>
  );
};

export const TextFormatter = ({
  children,
  format,
  transformation = '',
  formatType = '',
  textAlignment = 'left',
  hasDisplayMedia = false,
  cell,
}: TextFormatterProps): JSX.Element => {
  if (isNilOrEmpty(format)) return <>{children}</>;

  const [formatter] = useTextFormatter({ format, formatType, transformation });

  if (['severity_score', 'severity_level'].includes(formatType)) {
    return (
      <FormattedSeverityValue
        format={format}
        transformation={transformation}
        textAlignment={textAlignment}
        formatType={formatType}
        formatter={formatter}
        hasDisplayMedia={hasDisplayMedia}
        cell={cell}
      >
        {children}
      </FormattedSeverityValue>
    );
  }

  return <>{formatter(children)}</>;
};

export default React.memo(TextFormatter);
