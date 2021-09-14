import { ILocalization, ISplitResults, IWaterfallPlottingResult } from './waterfallTypes';
import { axisStyle, generalBaseOptions } from '../generalBaseOptions';

import { useTextFormattersForViz } from '@kleeen/react/hooks';

/** Adds extra fields (index, originalY, y-asDelta ...) for each point that needs to be plotted */
export const getPlottingResultsData = (results): IWaterfallPlottingResult[] => {
  const vizColors = generalBaseOptions.colors.slice(0, 10);
  const isResultsArray = Array.isArray(results[0]);

  return results.map((result, index) => {
    const [x, y] = isResultsArray ? result : [index, result];
    let prevY = y;

    if (index > 0) {
      prevY = isResultsArray ? results[index - 1][1] : results[index - 1];
    }

    const currentColor = vizColors[index % vizColors.length];

    return {
      index,
      // delta: y - prevY,
      originalY: y,

      /** y is actually DELTA - needs to be named y for highcharts plotting options */
      y: index === 0 ? y : y - prevY,
      color: currentColor,
      borderColor: currentColor,
    };
  });
};

/** Splits into 2 parts, first part shown initially, second part when 'Other' button is toggled */
export const splitResults = (
  completedResults: IWaterfallPlottingResult[],
  sliceResultsBy: number,
  xAxisCategories: number[] | string[],
  localization: ILocalization,
): ISplitResults => {
  let firstSliceOfResults;
  let secondSliceOfResults;
  let averageSecondSliceOfResults: number;
  if (completedResults.length > sliceResultsBy * 2) {
    secondSliceOfResults = completedResults.slice(sliceResultsBy, completedResults.length - 1);
    /** First element from each part (including secondSliceOfResults) needs to be plotted as value not only as delta */
    secondSliceOfResults[0].y = secondSliceOfResults[0].originalY;

    const sum: number = secondSliceOfResults.reduce((a, b) => {
      return a + b.y;
    }, 0);
    averageSecondSliceOfResults = Math.round(sum / secondSliceOfResults.length) || 0;

    xAxisCategories.splice(sliceResultsBy, 0, localization.restOfResultsLabel);
    firstSliceOfResults = completedResults.slice(0, sliceResultsBy);
    firstSliceOfResults.push({
      name: localization.restOfResultsLabel,
      y: averageSecondSliceOfResults,
      drilldown: localization.restOfResultsLabel,
      index: sliceResultsBy,
    });
  } else {
    firstSliceOfResults = completedResults;
  }

  return { firstSliceOfResults, secondSliceOfResults, averageSecondSliceOfResults };
};

export const getWaterfallSpecificOptions = (
  localization: ILocalization,
  sliceResultsBy: number,
  widgetId: string,
  xAxisCategories: number[] | string[],
  firstSliceOfResults: IWaterfallPlottingResult[],
  secondSliceOfResults: IWaterfallPlottingResult[],
  params,
) => {
  // TODO: Use one of : Highcharts.PlotOptions | Highcharts.Options
  const [formatterGroupBy] = useTextFormattersForViz(params);

  const otherButtonColor = generalBaseOptions.colors[generalBaseOptions.colors.length - 1];

  return {
    chart: {
      type: 'waterfall',
      events: {
        drilldown(e) {
          //hack to show back button
          let categories = this.series[0].xAxis.categories;
          categories = categories.filter((q) => q !== localization.restOfResultsLabel);
          categories = categories.slice(sliceResultsBy, categories.length - 1);
          this.xAxis[0].setCategories(categories);
          document.querySelector(`#waterfall-${widgetId}-container__backButton`).classList.add('show');
        },
      },
    },

    xAxis: {
      categories: xAxisCategories,
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        formatter(this) {
          if (this.value === localization.restOfResultsLabel) {
            return localization.restOfResultsLabel;
          }
          return formatterGroupBy(this.value);
        },
      },
    },
    yAxis: {
      visible: true,
      crosshair: {
        color: 'var(--good-on)',
      },
      labels: {
        formatter() {
          return this.value;
        },
      },
    },

    /** Other - clickable */
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
      /** All series after other is clicked */
      series: [
        {
          type: 'waterfall',
          name: localization.restOfResultsLabel,
          id: localization.restOfResultsLabel,
          data: secondSliceOfResults,
          dashStyle: 'Solid',
        },
      ],
    },

    /** Last piece (column) - the one for "Other" */
    /** TODO: further investigate Highcharts.PlotOptions vs Highcharts.Options */
    series: [
      {
        type: 'waterfall',
        data: firstSliceOfResults,
        color: otherButtonColor,
        borderColor: otherButtonColor,
        dashStyle: 'Solid',
      },
    ],
  };
};
