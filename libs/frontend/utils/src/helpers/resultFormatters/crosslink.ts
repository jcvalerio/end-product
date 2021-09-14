import { CrossLinking, CrossLinkingMatrix, Maybe } from '@kleeen/types';

export function getCrossLinkingForAxes({
  crossLinkingMatrix,
  resultPosition,
}: {
  crossLinkingMatrix: CrossLinkingMatrix;
  resultPosition: number;
}): Maybe<CrossLinking>[] {
  return crossLinkingMatrix.map((crossLinkArray) => crossLinkArray[resultPosition]);
}
