import { isEmptyAfterTrim } from './is-empty-after-trim';

describe('isEmptyAfterTrim', () => {
  it('should catch objects, arrays and empty strings', () => {
    expect(isEmptyAfterTrim(null)).toBeTruthy();
    expect(isEmptyAfterTrim(undefined)).toBeTruthy();
    expect(isEmptyAfterTrim('')).toBeTruthy();
    expect(isEmptyAfterTrim(' ')).toBeTruthy();
    expect(isEmptyAfterTrim('\t')).toBeTruthy();
    expect(isEmptyAfterTrim('\n')).toBeTruthy();
    expect(isEmptyAfterTrim('hello')).toBeFalsy();
  });
});
