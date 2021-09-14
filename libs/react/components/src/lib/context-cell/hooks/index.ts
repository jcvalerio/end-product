import { areFiltersInUse, isLinkFilterableByEntityType, useIsInvestigation } from '@kleeen/react/hooks';
import { useEffect, useState } from 'react';

import { ClickableChipsCellProps } from '../components/clickable-chips/clickable-chips-cell.model';
import { WidgetScope } from '@kleeen/types';
import { entityHasWidgets } from '@kleeen/widgets';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { isSingleCardinalityTransformation } from '@kleeen/frontend/utils';
import { pathOr } from 'ramda';

type InteractionValidations = {
  hasCrossLinking: boolean;
  hasFilters: boolean;
  hasPreview: boolean;
};

type UseIsAttributeClickable = Pick<
  ClickableChipsCellProps,
  'attribute' | 'cellEntityType' | 'isIdTemporary'
> & {
  transformationKeyToUse?: string;
};

const DEFAULT_TRANSFORMATION_KEY_TO_USE = 'aggregation';
const defaultInteractionValidationsState = {
  hasCrossLinking: false,
  hasFilters: false,
  hasPreview: false,
};

export function useAttributeInteractions(props: UseIsAttributeClickable): InteractionValidations {
  const isInvestigationPage = useIsInvestigation();
  const [interactionValidations, setInteractionValidations] = useState<InteractionValidations>(
    defaultInteractionValidationsState,
  );

  const filtersInUse = areFiltersInUse();

  const { attribute, transformationKeyToUse = DEFAULT_TRANSFORMATION_KEY_TO_USE } = props;

  useEffect(() => {
    const shouldNotSetInteractionValidations = isInvestigationPage || isNilOrEmpty(attribute);

    if (shouldNotSetInteractionValidations) return;

    // TODO @cafe THIS MUST BE REMOVED ONCE WE GET RID OF THE AGGREGATION VS TRANSFORMATION DILEMMA.
    const attributeTransformation = pathOr(attribute?.aggregation, [transformationKeyToUse], attribute);

    if (isNilOrEmpty(attributeTransformation)) return;

    const isASingleCardinalityTransformation = isSingleCardinalityTransformation(attributeTransformation);
    const scope = isASingleCardinalityTransformation ? WidgetScope.Single : WidgetScope.Collection;

    const hasCrossLinking = checkIfAttributeHasCrosslinking(props);
    const hasFilters = filtersInUse && isASingleCardinalityTransformation;
    const hasPreview = entityHasWidgets({
      entityId: attribute?.id,
      scope,
    });

    setInteractionValidations({ hasCrossLinking, hasFilters, hasPreview });
  }, [attribute, isInvestigationPage]);

  return interactionValidations;
}

//#region Private members
function checkIfAttributeHasCrosslinking({
  attribute,
  cellEntityType,
  isIdTemporary,
}: UseIsAttributeClickable): boolean {
  const { crossLinking } = attribute;

  // *We need this for CrossLinking support
  const filteredCrossLinks = isNilOrEmpty(cellEntityType)
    ? [...crossLinking]
    : crossLinking.filter((link) => isLinkFilterableByEntityType(cellEntityType, link));

  return !isIdTemporary && !isNilOrEmpty(crossLinking) && !isNilOrEmpty(filteredCrossLinks);
}
//#endregion
