export const validateOrderColum = (rowData: any, orderColumnName?: string) => {
  if (orderColumnName && rowData[orderColumnName]) return Number(rowData[orderColumnName].displayValue) + 1;
  return '';
};
