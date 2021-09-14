import { IDeltaResults, ILocalization } from './interfaces';
import { formatAxis, getContextInfo } from '@kleeen/frontend/utils';

import { CrossLinkingMatrix } from '@kleeen/types';
import Highcharts from 'highcharts';
import { XAxisOptions } from './interfaces';
import { clone } from 'ramda';
import merge from 'lodash.merge';

const addPlotLinesAndLables = (ticks: number, highchartsObject: Highcharts.Options): void => {
  for (let i = 0; i <= ticks; i++) {
    highchartsObject.xAxis[0].removePlotBand('plot-band-shadow' + i);
    highchartsObject.xAxis[0].addPlotBand({
      from: i - 0.35,
      to: i + 0.35,
      id: 'plot-band-shadow' + i,
      color: 'var(--visualization-plot-row-background)',
    });
  }
};

const getBaseOptions = (
  generalBaseOptions: Highcharts.Options,
  localization: ILocalization,
  sliceResultsBy: number,
  backBtnId: string,
): Highcharts.Options => {
  const baseOptions: Highcharts.Options = merge({}, generalBaseOptions, {
    chart: {
      type: 'bar',
      events: {
        render() {
          addPlotLinesAndLables(this.xAxis[0]?.dataMax, this);
        },
        drilldown() {
          let categories = this.series[0].xAxis.categories;
          categories = categories.filter((q) => q !== localization.restOfResultsLabel);
          categories = categories.slice(sliceResultsBy, categories.length - 1);
          this.xAxis[0].setCategories(categories);
          document.querySelector(`#${backBtnId}`).classList.add('show');
        },
      },
    },
  });
  return baseOptions;
};

const localization = (translate: Function): ILocalization => {
  return {
    restOfResultsLabel: translate('app.pieWidget.restOfResults') || '',
    backTo: translate('app.button.back') || '',
  };
};

const resultToArray = (results: any[], index: number, result: any[]): Array<any> => {
  const isResultsArray: boolean = Array.isArray(results[0]);
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

interface DeltaOfResultsProps {
  crossLinkingMatrix: CrossLinkingMatrix;
  results: any[];
  vizColors: string[];
  xAxis: XAxisOptions;
  yAxis: {
    key: string;
  };
}

const deltaOfResults = ({
  crossLinkingMatrix = [],
  results,
  vizColors,
  xAxis,
  yAxis,
}: DeltaOfResultsProps): Array<IDeltaResults> => {
  return results.map((result, index) => {
    const [x, y] = resultToArray(results, index, result);
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
      crossLinkingMatrix,
      resultPosition: index,
    });
    return {
      y,
      color: currentColor,
      ...contextInfo,
    };
  });
};

const backToClick = (
  highChartUpdate,
  xAxis: Highcharts.XAxisOptions,
  sliceResultsBy: number,
  translate: Function,
  backButtonRef: React.RefObject<HTMLDivElement>,
): void => {
  const categories = clone(xAxis.categories);
  categories.splice(sliceResultsBy, 0, localization(translate).restOfResultsLabel);
  highChartUpdate.xAxis[0].setCategories(categories);

  if (highChartUpdate?.drillUpButton) {
    highChartUpdate.drillUp();
    backButtonRef.current.classList.remove('show');
  }
};

const singleBarOptions = (
  widgetId: string,
  translate: Function,
  sliceResultsBy: number,
  baseOptions: Highcharts.Options,
  xAxis: Highcharts.XAxisOptions,
  xAxisCategories: [],
  labels: Highcharts.XAxisLabelsOptions,
  formatterGroupBy: Function,
  yAxis: Highcharts.YAxisOptions,
  formatterValue: Function,
  formatterGroupByForTooltip,
  otherButtonColor: string,
  axisStyle: Highcharts.AxisOptions,
  secondHalfOfResults: Array<IDeltaResults>,
  firstSliceOfResults: Array<IDeltaResults>,
  openMenuIfCrossLink: Function,
) => {
  const xAxisLabel =
    xAxis?.type !== 'datetime'
      ? {
          ...baseOptions.xAxis['labels'],
          ...labels,
          rotation: 0,
          formatter(this) {
            return this.value !== localization(translate).restOfResultsLabel
              ? formatterGroupBy(this.value)
              : this.value;
          },
        }
      : {
          ...baseOptions.xAxis['labels'],
          ...labels,
          rotation: 0,
        };

  const xAxisValues = formatAxis(xAxis);

  return {
    ...getBaseOptions(
      baseOptions,
      localization(translate),
      sliceResultsBy,
      `singlebar-hightlightmax-${widgetId}-container__backButton`,
    ),
    xAxis: {
      ...baseOptions.xAxis,
      xAxisValues,
      categories: xAxisCategories,
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        ...xAxisLabel,
      },
    },
    yAxis: {
      ...baseOptions.yAxis,
      ...yAxis,
      visible: false,
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
    drilldown: {
      activeAxisLabelStyle: {
        textDecoration: 'none',
        color: otherButtonColor,
        textTransform: 'uppercase',
      },
      activeDataLabelStyle: {
        color: axisStyle.labels.style.color,
        textDecoration: 'none',
        fontWeight: 'normal',
      },
      series: [
        {
          name: localization(translate).restOfResultsLabel,
          id: localization(translate).restOfResultsLabel,
          data: secondHalfOfResults,
          borderWidth: 0,
        },
      ],
    },
    plotOptions: {
      ...baseOptions.plotOptions,
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            fontWeight: 'normal',
            textOutline: 'none',
            color: axisStyle.labels.style.color,
          },
        },
      },
    },
    series: [
      {
        data: firstSliceOfResults,
        borderWidth: 0,
        cursor: 'pointer',
        events: {
          click: (e) => {
            openMenuIfCrossLink(e);
          },
        },
      },
    ],
  };
};

export { getBaseOptions, localization, deltaOfResults, singleBarOptions, backToClick };
