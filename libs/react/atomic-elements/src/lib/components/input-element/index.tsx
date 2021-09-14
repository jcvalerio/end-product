import './InputElement.scss';

import { Cell, ListItem, WidgetDataAttributes } from '@kleeen/types';
import { Loader, UpdatePayload } from '@kleeen/react/components';
import {
  getAttributeBackendFormat,
  getAttributeFormat,
  getAttributeFormatType,
  getAttributeTransformation,
  getFormat,
} from '../../utils/format';
import { useEffect, useRef, useState } from 'react';
import {
  useKleeenFormatChecker,
  useKsAutoComplete,
  useUrlQueryParams,
  useWidgetContext,
} from '@kleeen/react/hooks';

import { InputElementProps } from './input-element.model';
import camelCase from 'lodash.camelcase';
import classnames from 'classnames';
import { getInputElement } from './input-element-catalog';
import { getValidationResponseErrors } from '../../utils/validationResponseErrors';
import { useAttributeValue } from '../../hooks';

const bem = 'ks-input-element-section';

export function InputElement({
  attributes,
  elements,
  params,
  registerEvents,
  taskName,
  widgetId,
}: InputElementProps) {
  const [firstAttribute] = attributes;
  const { data: autoCompleteValues, isLoading: isLoadingAutocomplete } = useKsAutoComplete({
    entity: firstAttribute.rawEntityName,
    taskName,
    widgetId,
  });
  const { data, isLoading: isLoadingWidget } = useWidgetContext({
    params: { ...params, attributes },
    taskName,
    widgetId,
  });
  const attributeValue = useAttributeValue({
    attribute: firstAttribute,
    data,
    isLoading: isLoadingWidget,
    params,
  });

  const [{ validateFormField }, validationResponse] = useKleeenFormatChecker({
    taskName,
    widgetId,
    formField: firstAttribute.name,
  });

  const hasErrorsRef = useRef(false);

  useEffect(() => {
    hasErrorsRef.current = validationResponse?.errors?.length > 0;
  }, [validationResponse?.errors?.length]);

  const { paramsBasedOnRoute } = useUrlQueryParams();

  // Local state and refs
  const [selectedOption, setSelectedOption] = useState<ListItem | null>(null);
  const selectedOptionRef = useRef(selectedOption);
  const [value, setValue] = useState<any | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const attributeValueRef = useRef<any | Cell[]>(attributeValue); // eslint-disable-line @typescript-eslint/no-explicit-any
  const valueRef = useRef(value);

  // Props extraction
  const attributeFormat = getAttributeFormat(params);
  const attributeFormatType = getAttributeFormatType(params);
  const attributeHasMany = Boolean(firstAttribute.hasMany);
  const attributeName = firstAttribute.name;
  const attributeTransformation = getAttributeTransformation(params);
  const backendFormat = getAttributeBackendFormat(firstAttribute.name)(data);
  const format = getFormat({ attributeFormat, backendFormat });
  const isLoading = isLoadingAutocomplete || isLoadingWidget;

  useEffect(() => {
    const newAttributeValue = Array.isArray(attributeValue) ? attributeValue : attributeValue?.displayValue;

    attributeValueRef.current = newAttributeValue;
    setValue(newAttributeValue);
  }, [attributeValue]);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    valueRef.current = value;
    if (value) validateFormField(value);
  }, [value]);

  useEffect(() => {
    if (registerEvents) {
      registerEvents({
        id: firstAttribute.id,
        onSave,
        onCancel,
      });
    }
  }, []);

  function getInputPayload(): UpdatePayload {
    const baseModel = camelCase(params?.baseModel);
    const id = paramsBasedOnRoute[baseModel] || selectedOptionRef?.current?.id;
    const isDisplayValue = attributeName === baseModel;
    const paramKey = isDisplayValue ? WidgetDataAttributes.DisplayValue : attributeName;
    const paramValue = getPayloadParamValue({
      hasMany: attributeHasMany,
      inputValue: valueRef.current,
      isDisplayValue,
      selectedOptionValue: selectedOptionRef.current,
    });

    return {
      entity: params?.baseModel,
      params: {
        id,
        [paramKey]: paramValue,
      },
      hasErrors: hasErrorsRef.current,
    };
  }

  function onCancel() {
    setSelectedOption(null);
    setValue(attributeValueRef.current);
  }

  function onSave() {
    const hasValueChanged = JSON.stringify(attributeValueRef.current) !== JSON.stringify(valueRef.current);
    if (!hasValueChanged) {
      return;
    }

    const payload = getInputPayload();
    return payload;
  }

  if (isLoading) {
    return <Loader />;
  }

  const { inputComponent, rules } = elements;
  const InputComponent = getInputElement(inputComponent);

  return (
    <div className={classnames(bem, 'input-element-section')}>
      <InputComponent
        attribute={firstAttribute}
        autoCompleteValues={autoCompleteValues}
        element={inputComponent}
        format={format}
        formatType={attributeFormatType}
        getInputElement={getInputElement}
        rules={rules}
        setSelectedOption={setSelectedOption}
        setValue={setValue}
        transformation={attributeTransformation}
        value={value}
      />
      {getValidationResponseErrors(validationResponse, classnames(`${bem}__list`, 'input-lu-error'))}
    </div>
  );
}

//#region Private members
interface GetPayloadParamValue {
  hasMany: boolean;
  inputValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  isDisplayValue: boolean;
  selectedOptionValue: ListItem;
}

function getPayloadParamValue({
  hasMany,
  inputValue,
  isDisplayValue,
  selectedOptionValue,
}: GetPayloadParamValue): ListItem | any {
  const isSingleOrIsNotDisplayValue = hasMany || isDisplayValue;

  if (isSingleOrIsNotDisplayValue) {
    return inputValue;
  }

  const inputObject = {
    displayValue: inputValue,
    id: selectedOptionValue?.id,
  };

  return inputObject;
}
//#endregion
