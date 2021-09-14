interface SegmentedChunkData {
  cellSize: number;
  chunkedData: number[];
}

/**
 * Computes a new array based on a cell size that look good for both big and small numbers
 * @param defaultData - before segmenting
 */
export const getChunkedData = (defaultData: number[], containedIn: string): SegmentedChunkData => {
  const max = Math.max(...defaultData);
  const numberOfDigits = max.toString().length;
  const firstDigit = parseInt(max.toString()[0]);

  let cellSize = Math.pow(10, numberOfDigits - 2);
  if (firstDigit > 5) {
    cellSize *= 2;
  }

  /** Card has less space (about 3.5 times less space) */
  if (containedIn === 'card') {
    cellSize *= 4;
  }

  const chunkedData = defaultData.map((single) => Math.floor(single / cellSize));

  return {
    cellSize,
    chunkedData,
  } as SegmentedChunkData;
};

/**
 * Builds chart.series[columnIndex].data
 * Highcharts will interpret and render segmented cells om each column bar
 *
 * columnIndex will will be doubled
 * a pair of two for each of the result
 * one filled on top and one empty behind
 *
 * @param numberOfCells that are added in this specific column
 * @param columnPosition on x-Axis
 * */
export const getSegmentedSeriesData = (numberOfCells: number, columnPosition: number): [number, number][] => {
  const segmented: [number, number][] = [];
  /**
   * Segments for positive [posVar,1]
   * Segments for negative [posVar,-1]
   */
  let segmentEqualValue = 1;
  if (numberOfCells < 0) {
    numberOfCells *= -1;
    segmentEqualValue = -1;
  }
  for (let cellIterator = 0; cellIterator < numberOfCells; cellIterator++) {
    /** Each cell (either empty or filled) is segmented equally with the value of 1 */
    segmented.push([columnPosition, segmentEqualValue]);

    // TODO: Future improvement Cezar if there is a rest smaller than chunk add smaller segments at the end
  }
  return segmented;
};
