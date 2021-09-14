import merge from 'lodash.merge';
import { pathOr } from 'ramda';

export const getOptions = (
  results: [],
  format: object,
  baseOptions: Highcharts.Options,
  setMainChartOptions: Function,
  mainChartOptions: any,
) => {
  const type = pathOr('area', ['chart', 'type'], format);
  const title = pathOr(null, ['title', 'text'], format);
  const labels = pathOr({}, ['xAxis', 'labels'], format);
  const xAxis = pathOr({}, ['xAxis'], format);
  const yAxis = pathOr({}, ['yAxis'], format);

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
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
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
      marker: {
        radius: 2,
      },
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  });

  if (!setMainChartOptions) {
    return {
      ...baseOptions,
      chart: {
        ...baseOptions.chart,
        type,
      },
      title: { text: title },
      plotOptions: {
        ...plotOptions,
      },
      colors: ['hsl(var(--viz1), .7)'],
      xAxis: {
        ...baseOptions.xAxis,
        ...xAxis,
        labels: {
          ...baseOptions.xAxis['labels'],
          ...labels,
        },
      },
      yAxis: {
        ...baseOptions.yAxis,
        ...yAxis,
      },
      rangeSelector: {
        enabled: false,
      },
      series: [{ data: results }],
      tooltip:
        xAxis?.type === 'datetime'
          ? {
              headerFormat: '',
              pointFormat: '{point.x:%m-%d-%Y}: {point.y}',
            }
          : { ...baseOptions.tooltip },
    };
  }
  return {
    dataLength: [],
    chart: {
      borderWidth: 0,
      backgroundColor: null,
      zoomType: 'x',
      events: {
        selection(event) {
          const extremesObject = event.xAxis[0],
            min = extremesObject.min,
            max = extremesObject.max,
            detailData = [],
            xAxis = this.xAxis[0];
          this.series[0].data.forEach((data) => {
            if (data.x > min && data.x < max) {
              detailData.push([data.x, data.y]);
            }
          });

          // move the plot bands to reflect the new detail span
          xAxis.removePlotBand('mask-before');
          xAxis.addPlotBand({
            id: 'mask-before',
            from: 0,
            to: min,
            color: 'rgba(0, 0, 0, 0.3)',
            zIndex: 5,
          });

          xAxis.removePlotBand('mask-after');
          xAxis.addPlotBand({
            id: 'mask-after',
            from: max,
            to: extremesObject.axis.dataMax,
            color: 'rgba(0, 0, 0, 0.3)',
            zIndex: 5,
          });

          setMainChartOptions({
            ...mainChartOptions,
            series: [{ data: detailData }],
          });
          return false;
        },
      },
    },
    xAxis: {
      showLastTickLabel: true,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    title: {
      text: null,
    },
    accessibility: {
      enabled: false,
    },
    tooltip: {
      formatter() {
        return false;
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: results,
      },
    ],
    exporting: {
      enabled: false,
    },
  };
};
