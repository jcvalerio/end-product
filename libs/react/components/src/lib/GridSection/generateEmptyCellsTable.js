import { average, outerHeight } from '@kleeen/frontend/utils';
const MAX_NUMBER_OF_EMPTY_ROWS = 100;
const standardRowHeight = 34;
let hasRemainingRows = false;
const createArrayOfRows = (nrOfRows, averageHeight, className) => {
  let rRows = [];
  const upperLimit = Math.round(nrOfRows);
  const emptyRowsToCreate = Math.min(MAX_NUMBER_OF_EMPTY_ROWS, upperLimit);
  // @ts-ignore
  for (let i = 0; i < emptyRowsToCreate; i++) {
    rRows.push({
      id: `row-${i}`,
      height: averageHeight,
      className,
    });
  }
  return rRows;
};
const generateRows = (addRemainingRows, tableRowsContainerHeight, rowsData, widgetId) => {
  const tableContainerRows = document.querySelectorAll(`.table-container-row_${widgetId}`);
  let rowHeights = 0;
  let allRowHeights = [];

  if (rowsData && Array.isArray(rowsData) && rowsData.length > 0) {
    tableContainerRows.forEach((q) => {
      if (q.childNodes && q.getElementsByClassName('remaining-cells').length === 0) {
        const elementHeight = outerHeight(q);
        rowHeights += elementHeight;
        allRowHeights.push(elementHeight);
      }
    });
  } else {
    rowHeights = 0;
    allRowHeights = [];
  }

  if (hasRemainingRows) {
    addRemainingRows([]);
    hasRemainingRows = false;
  }

  if (allRowHeights && allRowHeights.length > 0) {
    const averageHeight = average(allRowHeights);
    if (rowHeights < tableRowsContainerHeight) {
      // @ts-ignore
      const diff = Math.round(parseFloat((tableRowsContainerHeight - rowHeights) / averageHeight)) + 1;
      if (diff > 0) {
        addRemainingRows(createArrayOfRows(diff, averageHeight, 'remaining-cells'));
      }
    } else {
      addRemainingRows([]);
      hasRemainingRows = false;
    }
  } else {
    if (!hasRemainingRows) {
      const nrOfRows = Math.round(parseFloat(tableRowsContainerHeight / standardRowHeight)) + 1;
      addRemainingRows(createArrayOfRows(nrOfRows, standardRowHeight, 'remaining-cells'));
      hasRemainingRows = true;
    }
  }
};

export const generateEmptyCellsTable = (addRemainingRows, rowsData, tableRowsContainerHeight, widgetId) => {
  window.dispatchEvent(new Event('resize'));
  generateRows(addRemainingRows, tableRowsContainerHeight, rowsData, widgetId);
};
