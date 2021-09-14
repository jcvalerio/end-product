import { getDoubleBarSeries } from './series';

/**
 * Add options to obtain double column bar(s) comparison between
 * results and resultsCompare value to value
 *
 * @param results - first array of values (left)
 * @param resultsCompare - second array of values (right)
 * @param columnDefaultOptions - column bar options for the default, doubleBarr will extend this
 */
export const addDoubleBarOptions = (
  results: number[],
  resultsCompare: number[],
  columnDefaultOptions: Highcharts.Options,
): Highcharts.Options => {
  const options: Highcharts.Options = {
    ...columnDefaultOptions,

    series: getDoubleBarSeries(results, resultsCompare),

    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      /** TODO: Cezar investigate if this can be useful in generalBaseOptions */
      itemStyle: {
        color: 'var(--on-surface-color)',
        fontSize: 'var(--pm-M)',
      },
    },

    yAxis: {
      ...columnDefaultOptions.yAxis,
      gridLineWidth: 0,
      tickWidth: 0,
    },

    tooltip: {
      ...columnDefaultOptions.tooltip,
      headerFormat: '{point.key}<br/>',
      pointFormat: '<span style="color:{point.color}">● {point.y}</span><br/>',
      shared: true,
    },
  };

  return options;
};
