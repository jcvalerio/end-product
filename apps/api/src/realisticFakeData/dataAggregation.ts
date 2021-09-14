import * as ActionData from './actionData';
import * as ListingData from './listingData';
import * as VisualizationData from './visualizationData';

import {
  CustomActionArgs,
  DataAggregationArgs,
  DispatchCustomActionResults,
  GetListingDataResults,
  GetWidgetDataResult,
  MultiTransFormationArgs,
  MultiTransFormationResults,
} from '../types';
import { DataListingArgs, GetWidgetData } from './types';

export const getListingData = (input: DataListingArgs): GetListingDataResults | any => {
  return ListingData.getListingData(input);
};

export const getListingDataNoAggregations = (input: DataListingArgs): GetListingDataResults | any => {
  return ListingData.getListingData(input);
};

export const getWidgetData: GetWidgetData = (input: DataAggregationArgs): GetWidgetDataResult | any => {
  return VisualizationData.getWidgetData(input);
};

export const dispatchCustomAction = (input: CustomActionArgs): DispatchCustomActionResults | any => {
  return ActionData.dispatchCustomAction(input);
};

export const getMultiTransFormationData = (
  input: MultiTransFormationArgs,
): MultiTransFormationResults | any => {
  const transformationsData = input.transformations.map((transformation, index) => {
    const pointFormat = { name: input.attributes ? input.attributes[index] : input.entity, transformation };
    const dataByTransformation = VisualizationData.getWidgetData({ value: pointFormat });

    return { ...dataByTransformation, transformation };
  });

  return transformationsData;
};
