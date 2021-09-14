import { FormatProps, ValuesProps, VizCommonParams } from '@kleeen/types';
import { GetSeveritiesResultProps, getSeverities } from '@kleeen/frontend/utils';

import { YAxisPlotBandsOptions } from 'highcharts';
import { generalBaseOptions } from '../generalBaseOptions';
import { isEmpty } from 'ramda';
import merge from 'lodash.merge';
import { useTextFormatter } from '@kleeen/react/hooks';

const GAUGE_DEFAULT_WIDTH = 16;

interface GetGaugeOptions {
  originalResult: number | string;
  format: FormatProps;
  formatType: string;
  transformation: string;
  value: number | string;
}

function getDefaultPlotBands({ format, value }: GetGaugeOptions): YAxisPlotBandsOptions[] {
  if (typeof value === 'string') {
    return [];
  }
  /**
   * This value makes the gradient extend longer into the right for small values
   * so that the second color barely appears when the band is only a small segment.
   * It's the inverse value of the ratio that the value takes compared to the total/max.
   *
   * If the value = 100%, then the gradient stops at 1 (the right end of the band)
   * If the value = 50%, then the gradient stops at 2 (so we only get the left half of
   * the whole gradient)
   */
  const x2 = 1 / ((value - format.min) / (format.max - format.min));
  return [
    // The "filled" band that goes up to the value
    {
      from: format.min,
      to: value,
      thickness: GAUGE_DEFAULT_WIDTH,
      color: {
        linearGradient: { x1: 0.2, x2, y1: 0, y2: 0 },
        stops: [
          [0, generalBaseOptions.colors[0]],
          [1, generalBaseOptions.colors[2]],
        ],
      },
    },
    {
      // The "empty" band that only shows a small line
      from: format.min,
      to: format.max,
      thickness: 1,
      color: 'var(--surface-color)',
    },
  ];
}

function getEmptyBand({ max, min }: { max: number; min: number }): YAxisPlotBandsOptions {
  return {
    from: min,
    to: max,
    thickness: 1,
    color: 'var(--surface-color)',
  };
}

function getSeverityPlotBands(
  { format, value }: GetGaugeOptions,
  severityColors: GetSeveritiesResultProps[],
): YAxisPlotBandsOptions[] {
  const severityBands = severityColors
    .filter(({ bottomValue }) => bottomValue <= value)
    .map(({ bottomValue, color, topValue }) => ({
      from: bottomValue,
      to: topValue,
      thickness: GAUGE_DEFAULT_WIDTH,
      color: `hsl(${color})`,
    }));
  return [...severityBands, getEmptyBand({ max: format.max, min: format.min })];
}

function getSeverityLevelPlotBands(
  { format: { max, min }, value }: GetGaugeOptions,
  severityColors: GetSeveritiesResultProps[],
): YAxisPlotBandsOptions[] {
  const severityBands = severityColors
    .filter(({ bottomValue }) => bottomValue <= value)
    .map(({ bottomValue, topValue, color }) => ({
      from: bottomValue,
      to: topValue,
      thickness: GAUGE_DEFAULT_WIDTH,
      color: `hsl(${color})`,
    }));
  return [...severityBands, getEmptyBand({ max, min })];
}

function getDefaultOptions(params: GetGaugeOptions): Highcharts.Options {
  const { format, formatType, transformation } = params;
  const [labelFormatter] = useTextFormatter({
    format,
    formatType,
    transformation,
  });
  return {
    yAxis: {
      labels: {
        formatter() {
          return labelFormatter(this.value) as string;
        },
      },
      plotBands: getDefaultPlotBands(params),
      tickPositions: [format.min, format.max],
    },
  };
}

function getSeverityTickPositions(severityColors: GetSeveritiesResultProps[], params: GetGaugeOptions) {
  if (isEmpty(severityColors)) {
    return [];
  }

  const firstTickPosition = severityColors[0].bottomValue;
  const lastTickPosition = severityColors[severityColors.length - 1].topValue;
  const otherTickPositions = severityColors
    .slice(0, -1)
    .filter(({ bottomValue }) => bottomValue <= params.value)
    .map(({ topValue }) => Math.round(topValue * 100) / 100);
  return [firstTickPosition, ...otherTickPositions, lastTickPosition];
}

function getSeverityScoreOptions(params: GetGaugeOptions): Highcharts.Options {
  const severityColors = getSeverities(params.format);
  const tickPositions = getSeverityTickPositions(severityColors, params);
  return {
    yAxis: {
      plotBands: getSeverityPlotBands(params, severityColors),
      tickPositions,
    },
    tooltip: {
      pointFormat: '{point.y}',
    },
  };
}

function getSeverityLevelOptions(params: GetGaugeOptions): Highcharts.Options {
  const { format, originalResult } = params;
  // Normalized values to match categories
  const min = -0.5;
  const max = format.max - format.min + 0.5;
  const maxIsGood = format.severityBad < format.severityGood;
  const severities = getSeverities({
    ...format,
    severityBad: maxIsGood ? min : max,
    severityGood: maxIsGood ? max : min,
  });
  return {
    pane: {
      startAngle: -90,
      endAngle: 90,
      size: '150%',
      center: ['50%', '100%'],
      background: [
        {
          shape: 'arc',
        },
      ],
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      plotBands: getSeverityLevelPlotBands({ ...params, format: { max, min } }, severities),
      categories: Object.values(format.valueLabels || {}),
      tickAmount: 0,
      tickWidth: 0,
      min,
      max,
      labels: {
        distance: 22,
        formatter() {
          let title = `<span class="gauge-tick-label">${this.value}</span>`;
          if (originalResult === this.value) {
            const { color } = severities[this.pos];
            title = `<span class="gauge-tick-label-selected" style="color: hsl(${color});">${this.value}</span>`;
          }
          return title;
        },
      },
    },
  };
}

const optionResolverByFormatType: { [key: string]: (params: GetGaugeOptions) => Highcharts.Options } = {
  severity_score: getSeverityScoreOptions,
  severity_level: getSeverityLevelOptions,
};

interface GetResultParams {
  results: number | string;
  format: FormatProps;
}

function severityLevelResult({ results, format }: GetResultParams): number {
  const foundKey = Object.entries(format.valueLabels || {}).find(([_, value]) => results === value);
  if (!foundKey) {
    return -1;
  }
  return parseInt(foundKey[0]) - format.min;
}

const resultResolverByFormatType: { [key: string]: (params: GetResultParams) => number } = {
  severity_level: severityLevelResult,
};

/**
 * Creates the appropriate Highcharts options based on the params
 * @param results - data received for plotting
 * @param format
 * @param baseOptions - shared options for consistency between different subTypes
 * @param params
 */
export const getOptions = ({
  results,
  format,
  params,
}: {
  results: number | string;
  format: FormatProps;
} & VizCommonParams): Highcharts.Options => {
  const { formatType, transformations } = params.value as ValuesProps;
  const resultResolver = resultResolverByFormatType[formatType];
  const result = resultResolver ? resultResolver({ results: results as string, format }) : results;

  const optionResolver = optionResolverByFormatType[formatType] || getDefaultOptions;
  const optionsByFormat = optionResolver({
    originalResult: results,
    format,
    formatType,
    transformation: transformations[0]?.transformation || '',
    value: result,
  });

  const baseOptions: Highcharts.Options = {
    chart: {
      type: 'gauge',
      backgroundColor: generalBaseOptions.chart.backgroundColor,
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: generalBaseOptions.credits,
    pane: {
      startAngle: -150,
      endAngle: 150,
      size: '100%',
      background: [
        {
          backgroundColor: 'hsla(var(--on-surface-color-hsl), 0.03)',
          borderWidth: 0,
        },
      ],
    },
    plotOptions: {
      gauge: {
        dial: {
          backgroundColor: 'var(--on-surface-color)',
          baseWidth: 2.5,
          baseLength: '100%',
          rearLength: '25%',
          radius: '90%',
        },
        pivot: {
          backgroundColor: 'var(--on-surface-color)',
          radius: 11,
        },
      },
    },
    series: [
      {
        type: 'gauge',
        data: [result],
        dataLabels: {
          enabled: false,
        },
      },
    ],
    title: {
      text: undefined,
    },
    yAxis: {
      height: 50,
      labels: {
        style: {
          color: 'var(--on-surface-color)',
          fontSize: '10px',
        },
      },
      lineWidth: 0,
      tickColor: 'var(--surface-color)',
      min: format.min,
      max: format.max,
      minorTicks: false,
      tickAmount: 1,
      tickLength: GAUGE_DEFAULT_WIDTH,
      tickWidth: 1,
      tickPosition: 'inside',
    },
    tooltip: generalBaseOptions.tooltip,
  };
  return merge(baseOptions, optionsByFormat);
};
