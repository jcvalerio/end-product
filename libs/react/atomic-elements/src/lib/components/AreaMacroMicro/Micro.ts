export const microOptions = (defaultOptions): Highcharts.Options => {
  const resultOptions = {
    ...defaultOptions,
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      height: 45,
      xAxis: {
        labels: {
          enabled: false,
        },
      },
      maskInside: false,
      maskFill: 'rgb(0,0,0,0.3)',
    },
  };

  return resultOptions;
};
