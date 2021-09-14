import { isNilOrEmpty } from './is-nil-or-empty';

export function isEmptyAfterTrim(value: string | null | undefined): boolean {
  if (isNilOrEmpty(value)) {
    return true;
  }
  return value.trim().length <= 0;
}
