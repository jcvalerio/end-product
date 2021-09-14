import { VizParams } from '@kleeen/types';
import { formatAxis } from '@kleeen/frontend/utils';
import merge from 'lodash.merge';
import { microOptions } from './Micro';
import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

export const getOptions = (
  format: object,
  baseOptions: Highcharts.Options,
  params: VizParams,
  results: [],
) => {
  const type = pathOr('areaspline', ['chart', 'type'], format);
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const [formatterGroupBy] = useTextFormattersForViz(params);

  const plotOptions = merge({}, baseOptions.plotOptions, {
    areaspline: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, `hsl(var(--viz1), .7)`],
          [1, `hsl(var(--viz1), 0)`],
        ],
      },
      marker: {
        radius: 2,
      },
      lineWidth: 2,
      threshold: null,
    },
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, `hsl(var(--viz1), .7)`],
          [1, `hsl(var(--viz1), 0)`],
        ],
      },
      lineWidth: 2,
      marker: {
        radius: 2,
      },
      threshold: null,
    },
  });

  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.xAxis['labels'],
          ...labels,
          formatter(this) {
            return formatterGroupBy(this.value);
          },
        }
      : {
          ...baseOptions.xAxis['labels'],
          ...labels,
        };

  const xAxisValues = formatAxis(xAxis);

  return microOptions({
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type,
    },
    plotOptions: {
      ...plotOptions,
    },
    colors: ['hsl(var(--viz1), .7)'],
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      labels: {
        ...baseOptions.xAxis['labels'],
        ...xAxisLabel,
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
    },
    series: [{ data: results }],
    tooltip:
      xAxis?.type === 'datetime'
        ? {
            headerFormat: '',
            pointFormat: '{point.x:%m-%d-%Y}: {point.y}',
          }
        : { ...baseOptions.tooltip },
  });
};
