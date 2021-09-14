import camelcase from 'lodash.camelcase';

/**
 * Generates a standard key name to be used by KAPI and the Parser.
 * @example
 * // returns myKey
 * asConceptualModelKey('MyKey')
 * @param key string identifier to be transformed into a standard key
 */
export function asConceptualModelKey(key: string): string {
  return camelcase(key);
}
