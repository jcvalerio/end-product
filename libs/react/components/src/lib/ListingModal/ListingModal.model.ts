import { Attribute, FormatProps, Result } from '@kleeen/types';
export interface ListingModalSettings {
  attribute: Attribute;
  columnLabel: string;
  data: Result[];
  format: FormatProps;
  isOpen: boolean;
  rowDisplayValue?: string;
  widgetId?: string;
}

export interface ListingModalProps extends ListingModalSettings {
  onClose: () => void;
}
