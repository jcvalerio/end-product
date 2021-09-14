import { getChunkedData, getSegmentedSeriesData } from './utils';

import { getNumericValueFromPxTailedVar } from '../../utils/highcharts-utils';
import { vizColors } from '../../../generalBaseOptions';

/**
 * Builds chart.series by segmenting and grouping initial default column data
 *
 * @param rawData
 * @param matchingBorderColor - assures that is the same as the chart background
 */
const getSegmentedSeries = (
  rawData: number[],
  matchingBorderColor: string,
): Array<Highcharts.SeriesColumnOptions> => {
  const cellColors: { filled: string; empty: string }[] = [];
  /**
   * Array of pairs [{filled: "hsl(var(--viz1), 1)", empty: "hsl(var(--viz1), .15)"}, ... ]
   */
  vizColors.default.forEach((_singleColor, index) => {
    /** Skip color for other */
    if (vizColors.default[index] !== 'hsl(var(--vizOther), 1)') {
      cellColors.push({
        filled: vizColors.default[index],
        empty: vizColors.faded[index],
      });
    }
  });
  const DEFAULT_NUMBER_OF_CELLS_TO_ADD_AS_EMPTY_SPACE = 5;

  /** Number of empty cells for each segmented column behind */
  const max: number = Math.max(...rawData);

  /** Target - TODO: Cezar consider receiving a target value for number of background cells - for now max + 5 */
  const NUMBER_OF_BACKGROUND_CELLS = max + DEFAULT_NUMBER_OF_CELLS_TO_ADD_AS_EMPTY_SPACE;

  const segmentedSeries: Array<Highcharts.SeriesColumnOptions> = [];

  /** Options for both empty cell and filled cell */
  const sharedCellOptions: Highcharts.SeriesColumnOptions = {
    type: 'column',
    stacking: 'normal',
    grouping: false,

    borderWidth: 1, // further investigate dynamic border width (bigger width when the cells are fewer)
    borderColor: matchingBorderColor,
  };

  rawData.forEach((singleColumn, index) => {
    /**
     * Segments for positive [posVar,1]
     * Segments for negative [posVar,-1]
     * numberOfBackgroundCells needs reset for each singleColumn
     */
    const numberOfBackgroundCells =
      singleColumn < 0 ? NUMBER_OF_BACKGROUND_CELLS * -1 : NUMBER_OF_BACKGROUND_CELLS;

    const singleSegmentedEmpty: Highcharts.SeriesColumnOptions = {
      color: cellColors[index % cellColors.length].empty,
      data: getSegmentedSeriesData(numberOfBackgroundCells, index),
      showInLegend: false,
      stack: 'emptyCells',
      ...sharedCellOptions,
    };

    const singleSegmentedFilled: Highcharts.SeriesColumnOptions = {
      color: cellColors[index % cellColors.length].filled,
      data: getSegmentedSeriesData(singleColumn, index),
      stack: 'filledCells',
      ...sharedCellOptions,
    };

    segmentedSeries.push(singleSegmentedEmpty);
    segmentedSeries.push(singleSegmentedFilled);
  });
  return segmentedSeries;
};

/**
 * Add options to obtain segmented column bar(s) based on the default column bar
 *
 * @param results - original data used to plot column bar before segmentation
 * @param columnDefaultOptions - column bar options for the default, segmenting will extend this
 * @param containedIn - visualization (default), card (small-widget)
 */
export const addSegmentedOptions = (
  results,
  columnDefaultOptions: Highcharts.Options,
  containedIn: string,
): Highcharts.Options => {
  /** Cells border and chart background must be the same color */
  const contextualBackgroundColor = 'var(--surface-color)';
  const isResultsArray = Array.isArray(results[0]);

  /** eachResult = [index, valueForPlotting] */
  const newResults = isResultsArray ? results.map((eachResult) => eachResult[1]) : results;

  const { cellSize, chunkedData } = getChunkedData(newResults, containedIn);
  const options = {
    ...columnDefaultOptions,
    chart: {
      ...columnDefaultOptions.chart,
      backgroundColor: contextualBackgroundColor,
      marginTop: getNumericValueFromPxTailedVar('--pm-L'),
      events: {
        /** Text with cell dimension */
        load() {
          const message = `Each cell represents ${cellSize}`;
          this.renderer
            .text(message, this.plotWidth / 2 + this.plotLeft, getNumericValueFromPxTailedVar('--pm-L'))
            .attr({
              align: 'center',
            })
            .css(this.xAxis[0].userOptions.labels.style)
            .add();
        },

        /** Top Label with value on top of each column bar */
        /** FIXME: Label needs a better implementation */
        // render() {
        //   const ticks = this.xAxis[0]?.paddedTicks;
        //   for (let i = 0; i < ticks.length; i++) {
        //     this.xAxis[0].addPlotBand({
        //       color: 'transparent',
        //       from: ticks[i],
        //       to: ticks[i],
        //       id: 'plot-band-under' + i,
        //       label: {
        //         text: newResults[i],
        //         align: 'center',
        //         style: {
        //           color: this.xAxis[0].userOptions.labels.style.color,
        //         },
        //       },
        //     });
        //   }
        // },
      },
    },
    series: getSegmentedSeries(chunkedData, contextualBackgroundColor),
    yAxis: {
      ...columnDefaultOptions.yAxis,
      visible: false,
    },
    tooltip: {
      ...columnDefaultOptions.tooltip,

      pointFormatter() {
        let tooltipMessage = this.category;
        if (this.series.index % 2 === 1) {
          /** Filled */
          tooltipMessage += ` current: ${newResults[(this.series.index - 1) / 2]}`;
        } else {
          /** Empty */
          tooltipMessage += ` target: ${Math.max(...newResults) + 5 * cellSize}`;
        }
        return tooltipMessage;
      },
    },
  };

  return options;
};
