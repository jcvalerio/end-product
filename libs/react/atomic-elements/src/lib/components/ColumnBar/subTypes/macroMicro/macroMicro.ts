/**
 * Add the options needed for [WIDGET] COLUMN_BAR_MACRO_MICRO
 * to the default (shared) options for all columnBar subTypes
 * @param columnDefaultOptions
 *
 * Design:
 * https://kleeensoftware.invisionapp.com/console/Elements---Visualizations-ckccf5hbo02ib01znu7p3flyl/ckfzurxyh005s012kaggo8c7o/inspect
 */
export const addMacroMicroOptions = (columnDefaultOptions: Highcharts.Options): Highcharts.Options => {
  const resultOptions = {
    ...columnDefaultOptions,
    /** <Disabled> Default Highstock Top-left buttons and top right inputs for range selection */
    rangeSelector: {
      enabled: false,
    },
    /** <Disabled> Default Highstock Bottom Navigator scrollbar */
    scrollbar: {
      enabled: false,
    },
    navigator: {
      /** In px, Default is 40 */
      height: 42,
      xAxis: {
        labels: {
          enabled: false,
        },
      },
      /** maskInside defaults to true, this makes the zoomed selection clean  */
      maskInside: false,
      maskFill: 'rgb(0,0,0,0.3)', // possible alternative from design: 'rgb(242,241,241,0.2)',
      // TODO: Cezar: Use css variables for maskFill, and height
    },
  };

  return resultOptions;
};
