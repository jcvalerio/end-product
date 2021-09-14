import { LegendOptions } from 'highcharts';

export const maxLabelLength = 14;
export const maxCategories = 10;
export const defaultStaggerLines = 2;

export const axisStyle: Highcharts.AxisOptions = {
  gridLineColor: 'var(--on-surface-color)',
  lineColor: 'var(--on-surface-color)',
  tickColor: 'var(--on-surface-color)',
  tickWidth: 1,
  labels: {
    // staggerLines: defaultStaggerLines, // TODO move to specific charts that need this
    style: {
      color: 'var(--on-surface-color)',
      fontSize: '13px', // css var break highcharts sizes.
    },
  },
};

export const otherColors = {
  default: 'hsl(var(--vizOther), 1)',
  faded: 'hsl(var(--vizOther), .15)',
  lightFade: 'hsl(var(--vizOther), .7)',
};

export const vizColors = {
  default: [
    'hsl(var(--viz1), 1)',
    'hsl(var(--viz2), 1)',
    'hsl(var(--viz3), 1)',
    'hsl(var(--viz4), 1)',
    'hsl(var(--viz5), 1)',
    'hsl(var(--viz6), 1)',
    'hsl(var(--viz7), 1)',
    'hsl(var(--viz8), 1)',
    'hsl(var(--viz9), 1)',
    'hsl(var(--viz10), 1)',
    otherColors.default,
  ],
  faded: [
    'hsl(var(--viz1), .15)',
    'hsl(var(--viz2), .15)',
    'hsl(var(--viz3), .15)',
    'hsl(var(--viz4), .15)',
    'hsl(var(--viz5), .15)',
    'hsl(var(--viz6), .15)',
    'hsl(var(--viz7), .15)',
    'hsl(var(--viz8), .15)',
    'hsl(var(--viz9), .15)',
    'hsl(var(--viz10), .15)',
    otherColors.faded,
  ],
  lightFade: [
    'hsl(var(--viz1), .7)',
    'hsl(var(--viz2), .7)',
    'hsl(var(--viz3), .7)',
    'hsl(var(--viz4), .7)',
    'hsl(var(--viz5), .7)',
    'hsl(var(--viz6), .7)',
    'hsl(var(--viz7), .7)',
    'hsl(var(--viz8), .7)',
    'hsl(var(--viz9), .7)',
    'hsl(var(--viz10), .7)',
    otherColors.lightFade,
  ],
};

export const generalBaseOptions: Highcharts.Options = {
  chart: {
    backgroundColor: 'var(--transparent)',
    type: 'area',
    zoomType: 'xy',
  },
  credits: { enabled: false },
  colors: vizColors.default,
  title: { text: '' },
  xAxis: {
    ...(axisStyle as Highcharts.XAxisOptions),
    labels: {
      ...(axisStyle.labels as Highcharts.XAxisOptions),
      rotation: -20,
    },
  },
  yAxis: {
    ...axisStyle,
    title: { text: null },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    headerFormat: '',
    pointFormat: '{point.category}: {point.y}',
    backgroundColor: 'var(--surface-color)',
    style: {
      color: 'var(--on-surface-color)',
      fontSize: 'var(--tx-M)',
    },
  },
  plotOptions: {
    area: {
      lineWidth: 1,
    },
    pie: {
      allowPointSelect: true,
      borderWidth: 0,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
        color: 'var(--on-surface-color)',
        style: {
          textOutline: '0',
        },
      },
      showInLegend: true,
    },
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            lineWidth: 0,
          },
        },
      },
    },
    variablepie: {
      borderWidth: 0,
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
};

export const radialLegend: LegendOptions = {
  align: 'right',
  backgroundColor: 'var(--transparent)',
  enabled: true,
  itemHoverStyle: {
    color: 'var(--secondary-color-variant)',
  },
  itemStyle: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-S)',
    fontWeight: 'light',
  },
  layout: 'vertical',
  navigation: {
    activeColor: 'var(--secondary-color)',
    inactiveColor: 'var(--transparent)',
    style: {
      color: 'var(--on-surface-color)',
    },
  },
  verticalAlign: 'middle',
};

export const radialCrosshair = {
  events: {
    mouseOver() {
      const shapeArgs = this.shapeArgs;
      const chart = this.series.chart;

      chart.customCrosshair = chart.renderer
        .circle(shapeArgs.x + chart.plotLeft, shapeArgs.y + chart.plotTop, shapeArgs.r)
        .attr({
          fill: 'var(--transparent)',
          stroke: 'var(--primary-color)',
          'stroke-width': 1,
        })
        .add();
    },
    mouseOut() {
      this.series.chart.customCrosshair.destroy();
    },
  },
};
