import { ListItem } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function getOptionLabel({ displayValue }: ListItem): string {
  return isNilOrEmpty(displayValue) ? '' : String(displayValue);
}
