import { CrossLinkingMatrix, FormatProps } from '@kleeen/types';
import { getColor, getContextInfo, getSeveritiesFn, vizColorsFormatted } from '@kleeen/frontend/utils';

import _ from 'lodash';
import { pathOr } from 'ramda';
import { useTextFormattersForViz } from '@kleeen/react/hooks';

interface IOptionsFormat {
  xAxis?: Highcharts.XAxisOptions | Array<Highcharts.XAxisOptions>;
  yAxis?: Highcharts.YAxisOptions | Array<Highcharts.YAxisOptions>;
}

interface TransformToObjectFormatProps {
  crossLinkingMatrix: CrossLinkingMatrix;
  data: any[];
  xAxis?: FormatProps;
  yAxis?: FormatProps;
}

const transformToObjectFormat = ({
  crossLinkingMatrix = [],
  data,
  xAxis,
  yAxis,
}: TransformToObjectFormatProps): Highcharts.PointOptionsObject[] => {
  const isValueAnArray = Array.isArray(data[0]);
  const max = isValueAnArray ? Math.max(...data.map(([, y]) => y), 1) : Math.max(...data, 1);
  const min = isValueAnArray ? Math.min(...data.map(([, y]) => y), 1) : Math.min(...data, 1);

  const totalUniqueValues = _.uniq(data).length <= 1 ? 2 : _.uniq(data).length;
  const bucket = totalUniqueValues >= 30 ? 30 : totalUniqueValues;

  const interpolateColor = (color1, color2, level) => {
    const resultColor = color1.slice();
    for (let i = 0; i < 3; i++) {
      resultColor[i] = Math.round(resultColor[i] + level * (color2[i] - color1[i]));
    }
    return `rgb(${resultColor[0]},${resultColor[1]},${resultColor[2]})`;
  };

  const getLevelsColors = (colorBottom, colorTop, levels) => {
    const level = 1 / (levels - 1);
    const colorsArrayValues = [];
    colorBottom = colorBottom.match(/\d+/g).map(Number);
    colorTop = colorTop.match(/\d+/g).map(Number);
    for (let i = 0; i < levels; i++) {
      colorsArrayValues.push(interpolateColor(colorBottom, colorTop, level * i));
    }
    return colorsArrayValues;
  };

  const colorsLevels = getSeveritiesFn(
    { severityLevels: bucket, severityBad: min, severityGood: max },
    getLevelsColors,
  );

  return data.map((dataPoint, index) => {
    const name = xAxis.categories[index];
    const value = isValueAnArray ? dataPoint[1] : dataPoint;
    const color = getColor(value, colorsLevels);

    const [groupBy, val] = isValueAnArray ? dataPoint : [index, dataPoint];
    const displayValue = xAxis?.categories ? xAxis.categories[groupBy] : groupBy;
    const contextInfo = getContextInfo({
      axes: [
        {
          key: xAxis.key,
          value: displayValue,
        },
        {
          key: yAxis.key,
          value,
        },
      ],
      crossLinkingMatrix,
      resultPosition: index,
    });
    return { name, value, color, ...contextInfo };
  });
};

const getValueAVG = (data: Highcharts.PointOptionsObject[]): number => {
  let datmin = 0,
    datmax = 0,
    dat = 0;
  data.forEach((dataPoint) => {
    if (datmin > dataPoint.value) {
      datmin = dataPoint.value;
    }
    if (datmax < dataPoint.value) {
      datmax = dataPoint.value;
    }
  });
  const dif = datmax - datmin;
  dat = (80 * dif) / 100;
  return dat;
};

/**
 * Creates the appropriate Highcharts options based on the params
 * @param results - data received for plotting
 * @param format
 * @param baseOptions - shared options for consistency between different subTypes
 * @param params
 */
export const getOptions = (
  results: [],
  format: IOptionsFormat,
  baseOptions: Highcharts.Options,
  params,
  openMenuIfCrossLink: Function,
  crossLinkingMatrix: CrossLinkingMatrix,
): Highcharts.Options => {
  const type = pathOr('column', ['chart', 'type'], format);
  const title = pathOr(null, ['title', 'text'], format);
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);
  const [formatterGroupBy, formatterGroupByForTooltip, formatterValue] = useTextFormattersForViz(params);
  const formattedResults = transformToObjectFormat({ crossLinkingMatrix, data: results, xAxis, yAxis });
  const { bottomColor, topColor } = vizColorsFormatted();

  const defaultOptions: Highcharts.Options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type,
    },
    title: { text: title },
    xAxis: {
      ...baseOptions.xAxis,
      ...xAxis,
      labels: {
        ...baseOptions.xAxis['labels'],
        ...labels,
        formatter(this) {
          return formatterGroupBy(this.value);
        },
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
      labels: {
        ...baseOptions.yAxis['labels'],
        formatter(this) {
          return formatterValue(this.value);
        },
      },
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
    },
    colorAxis: {
      minColor: topColor,
      maxColor: bottomColor,
      labels: {
        formatter(this) {
          return formatterValue(this.value) as string;
        },
        style: {
          color: 'var(--on-surface-color)',
          fontSize: 'var(--tx-S)',
          fontWeight: 'light',
        },
      },
    },
    plotOptions: {
      packedbubble: {
        minSize: '10%',
        maxSize: '120%',
        marker: { fillOpacity: 1 },
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: getValueAVG(formattedResults),
          },
          style: {
            color: 'var(--on-surface-color)',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
      },
    },
    series: [
      {
        type: 'packedbubble',
        data: formattedResults,
        borderWidth: 0,
        cursor: 'pointer',
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
          },
        },
      },
    ],
    tooltip: {
      ...baseOptions.tooltip,
      formatter(this) {
        return `${formatterGroupByForTooltip(this.key)}: ${formatterValue(this.y)}`;
      },
    },
  };
  return defaultOptions;
};
