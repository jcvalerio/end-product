import { clone, pathOr } from 'ramda';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { formatAxis } from '@kleeen/frontend/utils';
import { generalBaseOptions } from '../generalBaseOptions';
import merge from 'lodash.merge';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  chart: { type: 'scatter' },
  colors: ['hsl(var(--viz1), .6)'],
} as Highcharts.Options);

export function Scatter({
  containerProps,
  context,
  params,
  ...rest
}: VisualizationWidgetProps & HighchartsReact.Props): JSX.Element {
  const results = pathOr([], ['results'], context.data);
  const format = pathOr({}, ['format'], context.data);
  const { xAxis = {}, yAxis = {} } = format || {};
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);

  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.xAxis['labels'],
          formatter(this) {
            return formatterGroupBy(this.value);
          },
        }
      : {
          ...baseOptions.xAxis['labels'],
        };

  const xAxisValues = formatAxis(xAxis);

  const options = {
    ...baseOptions,
    series: [{ name: '', data: results }],
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      type: xAxis.type,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      type: yAxis.type,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.category)}: ${formatterValue(this.point.y)}`;
      },
    },
  };
  const containerPropsPlus = { ...containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      containerProps={containerPropsPlus}
      highcharts={Highcharts}
      options={clone(options)}
      {...rest}
    />
  );
}

export default React.memo(Scatter);
