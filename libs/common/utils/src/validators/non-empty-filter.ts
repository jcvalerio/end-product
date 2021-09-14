import { isNilOrEmpty } from './is-nil-or-empty';

/**
 * Specialization of `Array#filter(isNilOrEmpty)`.
 * It lets TypeScript know this will not return a `NonNullable` item.
 *
 * @example
 *
 * const list = [undefined, 'test-1', 'test-2', '']
 * const nonNullableList = list.filter(nonEmptyFilter) // ['test-1', 'test-2']
 * const trimmedList = nonNullableList.map((item) => item.toUpperCase()) // TS does not give any error.
 *
 * @param item the item list to be filtered.
 * @returns a list of NonNullable T's items.
 */
export const nonEmptyFilter = <T>(item: T): item is NonNullable<T> => !isNilOrEmpty(item);
