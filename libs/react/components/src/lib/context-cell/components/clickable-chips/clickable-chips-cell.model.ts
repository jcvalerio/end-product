import { Attribute, Cell, DisplayValue, FormatProps, Row, Translate } from '@kleeen/types';

import { ListingModalSettings } from '../../../ListingModal/ListingModal.model';

export interface ClickableChipsCellProps {
  attribute: Attribute;
  cellEntityType?: string;
  cellItems: Cell[];
  columnLabel: string;
  displayColumnAttribute?: Attribute;
  format: FormatProps;
  isIdTemporary?: boolean;
  openShowMoreModal: (listSettings: ListingModalSettings) => void;
  row?: Row;
  rowDisplayValue?: string;
  translate: Translate;
  widgetId?: string;
}

export interface PreviewChipsProps {
  attribute: Attribute;
  displayColumnAttribute?: Attribute;
  format: FormatProps;
  isClickable: boolean;
  items: Cell[];
  row?: Row;
  rowDisplayValue?: DisplayValue;
  translate: Translate;
  widgetId?: string;
}
