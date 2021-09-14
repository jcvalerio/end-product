import { Cell, WidgetDataAttributes } from '@kleeen/types';
import { useEffect, useState } from 'react';

import { INITIAL_ATTRIBUTE_VALUE_HAS_MANY } from '../components/Widgets/ConfigInputWidget/ConfigInputWidget.model';
import camelcase from 'lodash.camelcase';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { pathOr } from 'ramda';

export function useAttributeValue({
  attribute,
  data,
  isLoading,
  isDisplay = false,
  params,
}): undefined | Cell | Cell[] {
  const [attributeValue, setAttributeValue] = useState(undefined);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isNilOrEmpty(data)) {
      return;
    }

    const newAttributeValue = isDisplay
      ? getDisplayAttribute({
          attribute,
          data,
          params,
        })
      : getAttribute({
          attribute,
          data,
          params,
        });

    setAttributeValue(newAttributeValue);
  }, [isLoading]);

  return attributeValue;
}

//#region Private members
function getAttribute({ attribute, data, params }) {
  const { hasMany, name } = attribute;
  const attributePath = getAttributePath(params?.baseModel, name);
  const attributeValuePath = ['data', '0', attributePath];

  if (hasMany) {
    return pathOr(INITIAL_ATTRIBUTE_VALUE_HAS_MANY, attributeValuePath, data);
  } else {
    return pathOr({}, [...attributeValuePath], data);
  }
}

function getAttributePath(baseModel: string, name: string) {
  return baseModel && name === camelcase(baseModel) ? `${WidgetDataAttributes.DisplayValue}::${name}` : name;
}

function getDisplayAttribute({ attribute, data, params }) {
  const { name } = attribute;
  const attributePath = getAttributePath(params?.baseModel, name);
  const attributeValuePath = ['data', '0', attributePath];

  return pathOr({}, [...attributeValuePath], data);
}
//#endregion
