import { isNilOrEmpty } from './is-nil-or-empty';

describe('isNilOrEmpty', () => {
  it('should catch objects, arrays and empty strings', () => {
    expect(isNilOrEmpty([1, 2, 3])).toBeFalsy();
    expect(isNilOrEmpty([])).toBeTruthy();
    expect(isNilOrEmpty('')).toBeTruthy();
    expect(isNilOrEmpty(' ')).toBeFalsy();
    expect(isNilOrEmpty(null)).toBeTruthy();
    expect(isNilOrEmpty(undefined)).toBeTruthy();
    expect(isNilOrEmpty({})).toBeTruthy();
    expect(isNilOrEmpty({ length: 0 })).toBeFalsy();
  });
});
