import './Gauge.scss';

import { ValuesProps, VisualizationWidgetProps, VizCommonParams } from '@kleeen/types';
import { clone, isEmpty, isNil, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { TextFormatter } from '@kleeen/react/components';
import classnames from 'classnames';
import { getFullLabel } from '../../../types';
import { getOptions } from './options';
import more from 'highcharts/highcharts-more';

const bem = 'ks-gauge';

more(Highcharts);

const hideLabelFormatTypes = ['severity_level'];

function shouldHideLabel(formatType: string): boolean {
  return formatType && hideLabelFormatTypes.includes(formatType);
}

export function Gauge({
  containerProps,
  context,
  params,
  ...rest
}: VisualizationWidgetProps & HighchartsReact.Props & VizCommonParams): JSX.Element {
  if (context.isLoading) {
    return <Loader />;
  }

  const beFormat = pathOr({}, [0, 'format'], context.data);
  const ksFormat = pathOr({}, ['format'], params.value);
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const results = pathOr([], [0, 'results'], context.data);
  const transformation = pathOr({}, [0, 'transformation'], context.data);

  const options = getOptions({ results, format, params });

  const { value } = params;
  const hideLabel = shouldHideLabel(value?.formatType);
  const gaugeWidth = hideLabel ? '100%' : '50%';
  const containerPropsPlus = { ...containerProps, style: { height: '100%', width: gaugeWidth } };
  const labelTransformation = pathOr('', ['transformations', 0, 'transformation'], value);

  const fullLabel = getFullLabel({
    label: (value as ValuesProps)?.label,
    transformation: labelTransformation,
  });

  return (
    <div className={classnames(bem, 'gauge-container')}>
      <HighchartsReact
        containerProps={containerPropsPlus}
        highcharts={Highcharts}
        options={clone(options)}
        {...rest}
      />
      {!hideLabel && (
        <div className={classnames(`${bem}__value`, 'gauge-value')}>
          <TextFormatter format={format} transformation={transformation} formatType={value?.formatType}>
            {results}
          </TextFormatter>
          <p className={classnames(`${bem}__label`)}>{fullLabel}</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(Gauge);
