interface ILocalization {
  restOfResultsLabel: string;
  backTo: string;
}
interface IDeltaResults {
  y: number;
  color?: string;
  name?: string;
  drilldown?: string;
}
interface IHighChartUpdate {
  highChartUpdate: {};
}

interface XAxisOptions extends Highcharts.XAxisOptions {
  categories: [string];
  key: string;
  valueLabels: { label: string; value: number }[];
}

export { ILocalization, IDeltaResults, IHighChartUpdate, XAxisOptions };
