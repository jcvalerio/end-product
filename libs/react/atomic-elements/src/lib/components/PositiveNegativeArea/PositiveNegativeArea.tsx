import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Loader } from '@kleeen/react/components';
import React from 'react';
import { VisualizationWidgetProps } from '@kleeen/types';
import { clone } from 'ramda';
import { formatAxis } from '@kleeen/frontend/utils';
import { generalBaseOptions } from '../generalBaseOptions';
import merge from 'lodash.merge';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
  tooltip: {
    pointFormat: '{point.category}: {point.value} <br> Delta: {point.delta}',
  },
} as Highcharts.Options);

export function PositiveNegativeArea({
  context,
  params,
  ...props
}: VisualizationWidgetProps & HighchartsReact.Props) {
  const results = context?.data?.results || [];
  const format = context?.data?.format || {};
  const { xAxis = {}, yAxis = {} } = format || {};
  const isResultsArray = Array.isArray(results[0]);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);

  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.yAxis['labels'],
          formatter(this) {
            return formatterGroupBy(this.value);
          },
        }
      : {
          ...baseOptions.yAxis['labels'],
        };

  const xAxisValues = formatAxis(xAxis);

  const deltaOfResults = results.map((result, index) => {
    const [x, y] = isResultsArray ? result : [index, result];

    let prevY = y;
    if (index > 0) {
      prevY = isResultsArray ? results[index - 1][1] : results[index - 1];
    }
    return {
      x,
      y: y - prevY,
      value: y,
      delta: y - prevY,
    };
  });

  const options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'area',
      events: {
        render() {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const self = this;
          const [firstYAxis] = self.yAxis;

          const shouldUpdate =
            firstYAxis && (firstYAxis.max !== firstYAxis.old?.max || firstYAxis.min !== firstYAxis.old?.min);
          if (!shouldUpdate) {
            return;
          }

          const posGrad = (firstYAxis.max - 0) / (firstYAxis.max - firstYAxis.min) || 1;
          const negGrad = (0 - firstYAxis.min) / (firstYAxis.max - firstYAxis.min) || 1;
          self.series[0].update({
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, 'var(--good-on)'],
                [posGrad, 'var(--good-on-opacity-0)'],
              ],
            },
            zones: [
              {
                value: 0,
                color: 'var(--bad-off)',
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0,
                  },
                  stops: [
                    [0, 'var(--bad-off)'],
                    [negGrad, 'var(--bad-off-opacity-0)'],
                  ],
                },
              },
            ],
          });
        },
      },
    },
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      type: xAxis.type,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      crosshair: {
        color: 'var(--good-on)',
      },
      ...baseOptions.yAxis,
      type: yAxis.type,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    series: [
      {
        color: 'var(--good-on)',
        negativeColor: 'var(--bad-off)',
        data: deltaOfResults,
      },
    ],
    tooltip: {
      ...baseOptions.tooltip,
      ...format,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.point.category)}:  ${formatterValue(
          this.point.value,
        )} <br> Delta:  ${this.point.delta}`;
      },
    },
  };
  const containerProps = { ...props.containerProps, style: { height: '100%', width: '100%' } };

  if (context.isLoading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={clone(options)}
      containerProps={containerProps}
      {...props}
    />
  );
}

export default React.memo(PositiveNegativeArea);
