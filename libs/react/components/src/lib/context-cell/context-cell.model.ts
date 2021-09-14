import { Attribute, Cell, ChangeDirectionsProps, DisplayValue, FormatProps, Row } from '@kleeen/types';

export interface ContextMenuProps {
  attr: Attribute;
  cell: Cell | Cell[];
  displayColumnAttribute?: Attribute;
  format?: FormatProps;
  hasDisplayMedia?: boolean;
  openShowMoreModal?: (ListingModalSettings) => void;
  row?: Row;
  rowDisplayValue?: DisplayValue;
  widgetId?: string;
}

export interface LabelResultsProps extends ChangeDirectionsProps {
  results: string | number;
  transformation: string;
  format?: FormatProps;
  formatType?: string;
  hasDisplayMedia?: boolean;
  cell?: Cell | Cell[];
}
