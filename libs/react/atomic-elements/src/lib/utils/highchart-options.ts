export function getOptions(baseOptions: Highcharts.Options) {
  return {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      zoomType: 'none',
    },
    title: { text: '' },
    xAxis: { ...baseOptions.xAxis, visible: false },
    yAxis: { ...baseOptions.yAxis, visible: false },
    tooltip: {
      enabled: false,
    },
    credits: false,
    plotOptions: {
      pie: {
        borderWidth: 1,
        borderColor: 'var(--surface-color)',
        colors: ['hsla(var(--viz1), 1)', 'hsla(var(--on-surface-color-hsl), .3)'],
      },
    },
  };
}
