import { ElementDisplayType, FormatProps } from '@kleeen/types';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { path } from 'ramda';

interface GetFormat {
  attributeFormat: FormatProps;
  backendFormat: FormatProps;
}

export const getAttributeFormat = path(['value', 'format']);
export const getAttributeFormatType = path(['value', 'formatType']);
export const getAttributeTransformation = path(['value', 'transformation']);

export function getAttributeBackendFormat(name: string) {
  return path(['format', name]);
}

export function getFormat({ attributeFormat, backendFormat }: GetFormat): FormatProps {
  return isNilOrEmpty(backendFormat) ? attributeFormat : backendFormat;
}

export const getFormatedResults = (component, results, crosslinking) => {
  let formatedResults;
  if (component === ElementDisplayType.Chips && Array.isArray(results) && results.length) {
    formatedResults = results.map((result, index) => {
      return {
        displayValue: result.value || result,
        id: crosslinking[index].id,
      };
    });
  } else {
    formatedResults = {
      displayValue: results,
      id: crosslinking?.id,
    };
  }
  return formatedResults;
};
