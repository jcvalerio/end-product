import { ListItem } from '@kleeen/types';

export interface RadioGroupProps {
  title: string;
  options: {
    isLoading: boolean;
    data: ListItem[];
  };
  onSelect?: (selectedOption?: ListItem) => void;
  defaultSelectionValue: string;
  disabled: boolean;
  hideTitle: boolean;
  inSummaryDetails: boolean;
}
