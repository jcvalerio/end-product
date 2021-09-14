import { formatAxis, getContextInfo } from '@kleeen/frontend/utils';

import { CrossLinkingMatrix } from '@kleeen/types';
import { addDoubleBarOptions } from './subTypes/doubleBar/doubleBar';
import { addMacroMicroOptions } from './subTypes/macroMicro/macroMicro';
import { addSegmentedOptions } from './subTypes/segmented/segmented';
import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

interface IOptionsFormat {
  xAxis?: Highcharts.XAxisOptions | Array<Highcharts.XAxisOptions>;
  yAxis?: Highcharts.YAxisOptions | Array<Highcharts.YAxisOptions>;
}

interface XAxisOptions extends Highcharts.XAxisOptions {
  categories: [string];
  key: string;
  valueLabels: { label: string; value: number }[];
}

/**
 * Column Bar Visualization can have multiple shapes
 * based on the data received and the end-user selection
 */
export enum ColumnBarSubType {
  Segmented = '[WIDGET] COLUMN_BAR_SEGMENTED',
  DoubleBar = '[WIDGET] COLUMN_BAR_DOUBLE_BAR', // <!> DoubleBar is not completely implemented
  MacroMicro = '[WIDGET] COLUMN_BAR_MACRO_MICRO',
}

const addSubTypeOptions = (
  results: number[],
  subType: ColumnBarSubType,
  options: Highcharts.Options,
  containedIn: string,
): Highcharts.Options => {
  /** TODO: Cezar get the real data (a new array with the same size, type as results for compare) - this is used only for doubleBar subtype */
  const mockedResultCompare: number[] = results
    .slice()
    .map((singleRes: number) => (singleRes += Math.floor(Math.random() * Math.min(...results))));

  switch (subType) {
    case ColumnBarSubType.Segmented:
      options = addSegmentedOptions(results, options, containedIn);
      break;

    case ColumnBarSubType.DoubleBar:
      options = addDoubleBarOptions(results, mockedResultCompare, options);
      break;

    case ColumnBarSubType.MacroMicro:
      options = addMacroMicroOptions(options);
      break;

    default:
      break;
  }

  return options;
};

/**
 * Creates the appropriate Highcharts options based on the params
 * @param results - data received for plotting
 * @param format
 * @param baseOptions - shared options for consistency between different subTypes
 * @param containedIn - parent container, can be card (smaller) so data segmentation is done in bigger chunks
 * @param subType
 */
export const getOptions = (
  results,
  format: IOptionsFormat,
  baseOptions: Highcharts.Options,
  containedIn: string,
  subType: ColumnBarSubType,
  params,
  vizColors,
  crossLinking: CrossLinkingMatrix = [],
  openMenuIfCrossLink: Function,
  xAxis: XAxisOptions,
): Highcharts.Options => {
  const title = pathOr(null, ['title', 'text'], format);
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const isResultsArray = Array.isArray(results[0]);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);

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

  const resultToArray = (index, result) => {
    if (isResultsArray) {
      if (result.length > 1) {
        return result;
      } else if (result.length === 1) {
        return [index, result];
      }
      return [0, 0];
    }
    return [index, result];
  };

  const formattedResults = results.map((result, index: number) => {
    const [x, y] = resultToArray(index, result);
    const currentColor = vizColors[index % vizColors.length];
    const displayValue = xAxis?.categories ? xAxis.categories[x] : x;
    const contextInfo = getContextInfo({
      axes: [
        {
          key: xAxis.key,
          value: displayValue,
        },
        {
          key: yAxis.key,
          value: y,
        },
      ],
      crossLinkingMatrix: crossLinking,
      resultPosition: index,
    });

    return {
      x: xAxis?.type === 'datetime' ? x : undefined,
      y,
      color: currentColor,
      ...contextInfo,
    };
  });

  const xAxisValues = formatAxis(xAxis);

  const defaultOptions: Highcharts.Options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'column',
    },
    title: { text: title },
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxisValues,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
      max: null,
      min: null,
      stackLabels: {
        enabled: true,
      },
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    plotOptions: {
      ...baseOptions.plotOptions,
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        cursor: 'pointer',
      },

      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: (e) => {
              openMenuIfCrossLink(e);
            },
          },
        },
      },
    },

    series: [{ type: 'column', data: formattedResults }],
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.x)} | ${formatterValue(this.y)}`;
      },
    },
  };
  return addSubTypeOptions(results, subType, defaultOptions, containedIn);
};

// FIXME: Cezar: Segmented - when the number of columns is big there are performance issues on column hover
// FIXME: Cezar: In some cases, there is a lot of empty space above the columns ends
