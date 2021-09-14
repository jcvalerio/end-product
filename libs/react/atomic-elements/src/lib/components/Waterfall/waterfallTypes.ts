export interface PlottedPoint {
  category: any; // TODO: Cezar string | number; after updated useTextFormattersForViz
  value: any; // number;
}

export interface IWaterfallPlottingResult {
  index: number;
  // delta: y - prevY,
  originalY: number;

  /** y is actually DELTA - needs to be named y for highcharts plotting options */
  y: number;
  color: string;
  borderColor: string;
}

export interface ISplitResults {
  firstSliceOfResults: IWaterfallPlottingResult[];
  secondSliceOfResults: IWaterfallPlottingResult[];
  averageSecondSliceOfResults: number;
}

export interface ILocalization {
  restOfResultsLabel: string;
  backTo: string;
}
