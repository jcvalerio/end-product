export enum Order {
  asc,
  desc,
  none,
}

function descendingComparator<T>(a: T, b: T, orderBy: any) {
  if (!a[orderBy] || !b[orderBy]) {
    return 0;
  }
  if (b[orderBy].displayValue < a[orderBy].displayValue) {
    return -1;
  }
  if (b[orderBy].displayValue > a[orderBy].displayValue) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === Order.desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: any[], order: Order, orderBy: string): any[] {
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
