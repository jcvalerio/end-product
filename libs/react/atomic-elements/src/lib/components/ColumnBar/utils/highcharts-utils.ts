/**
 * Highcharts uses numeric values for properties like 'marginTop'
 * This gets the value of our SIZE css variables and removes the trailing 'px'
 * @param cssVariable - Note: works only for those trailed with px
 */
export const getNumericValueFromPxTailedVar = (cssVariable: string): number => {
  const pxTailedValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
  return parseInt(pxTailedValue, 10);
};
