import { CrossLinking, CrossLinkingMatrix, DisplayValue } from '@kleeen/types';

import { getCrossLinkingForAxes } from './crosslink';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface ContextInfoForAxis extends Partial<CrossLinking> {
  displayValue: DisplayValue;
}

interface ContextInfo {
  [key: string]: ContextInfoForAxis;
}

interface GetContextInfoAxis {
  key: string;
  value: DisplayValue;
}

export interface GetContextInfoProps {
  crossLinkingMatrix: CrossLinkingMatrix;
  axes: GetContextInfoAxis[];
  resultPosition: number;
}

/**
 * Gets a context info object.
 * The axes array order should match the crossLinkingMatrix order.
 */
export function getContextInfo({
  axes,
  crossLinkingMatrix,
  resultPosition,
}: GetContextInfoProps): ContextInfo {
  const crossLinking = getCrossLinkingForAxes({
    crossLinkingMatrix,
    resultPosition,
  });

  return axes.reduce((acc: ContextInfo, axis, index) => {
    if (isNilOrEmpty(axis.key)) {
      return acc;
    }

    acc[axis.key] = {
      displayValue: axis.value,
      ...crossLinking[index],
    };

    return acc;
  }, {});
}
