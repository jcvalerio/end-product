/**
 * Groups the two arrays into appropriate series for doubleBar, compare
 * @param results
 * @param resultsCompare
 */
export const getDoubleBarSeries = (
  results: number[],
  resultsCompare: number[],
): Array<Highcharts.SeriesColumnOptions> => {
  const barColors = {
    left: 'hsl(var(--viz1),1)',
    right: 'hsl(var(--viz8),1)',
  };

  return [
    {
      data: results,
      id: 'main',
      color: barColors.left,
      showInLegend: true,
    },
    {
      data: resultsCompare,
      linkedTo: 'main',
      color: barColors.right,
      showInLegend: true,
    },
  ] as Array<Highcharts.SeriesColumnOptions>;
};
