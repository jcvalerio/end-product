// TODO: @Guaria move this into a new library like types to define as global
// move 'displayValue' enum and use here to append the display value in the function below
export interface KeyValueContext {
  [key: string]: unknown;
}

/**
 * Adds a display value to an object
 * @example
 * // returns { department: { displayValue: 'RH' } }
 * addDisplayValue({ department: 'RH' })
 */
export const addDisplayValue = (input?: KeyValueContext): KeyValueContext | undefined => {
  return (
    input &&
    Object.entries(input).reduce((acc: { [key: string]: KeyValueContext }, [key, value]) => {
      if (typeof value === 'object') {
        acc[key] = { ...value };
      } else {
        acc[key] = { displayValue: value };
      }

      return acc;
    }, {})
  );
};
