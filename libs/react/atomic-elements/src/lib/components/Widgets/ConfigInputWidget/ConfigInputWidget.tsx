/* eslint-disable complexity, max-lines */
import { Button, TransformToElement } from './components';
import {
  ConfigInputWidgetProps,
  INITIAL_ATTRIBUTE_VALUE_HAS_MANY,
  INITIAL_ATTRIBUTE_VALUE_SINGLE,
  KS_GLOBAL_APP,
  airTableElementType,
  elementCase,
  transformationElements,
} from './ConfigInputWidget.model';
import React, { ReactElement, useEffect, useState } from 'react';
import { isEmpty, isNil, pathOr } from 'ramda';
import {
  useKleeenActions,
  useKsAutoComplete,
  useKleeenFormatChecker,
  useMasonry,
  useUrlQueryParams,
  useWidgetContext,
} from '@kleeen/react/hooks';

import { Loader } from '@kleeen/react/components';
import { WidgetDataAttributes } from '@kleeen/types';
import camelcase from 'lodash.camelcase';
import classNames from 'classnames';
import elementsData from './../../../assets/elements.json';
import { useConfigInputStyles } from './ConfigInputWidget.style';
import { getValidationResponseErrors } from '../../../utils/validationResponseErrors';

export function ConfigInputWidget({
  attributes = [],
  disabled = false,
  hideSaveAndClose = false,
  hideTitle = false,
  inSummaryDetails,
  onInputChange,
  params,
  registerEvents,
  statisticalType,
  taskName,
  widgetId,
}: ConfigInputWidgetProps): ReactElement {
  const [
    soloAttribute = {
      canAddValues: false,
      crossLinking: [],
      deepDataType: '',
      format: {},
      hasMany: false,
      isFilterable: { in: false, out: false },
      label: '',
      name: '',
      rawEntityName: '',
      settings: {
        isAvatarEditable: false,
        isEditable: false,
        isFilledByEU: false,
      },
    },
  ] = attributes;
  const widgetData = params
    ? useWidgetContext({ taskName, widgetId, params: { ...params, attributes } })
    : { isLoading: false };
  const attrName = widgetData && soloAttribute.name;
  const autoCompleteValues = useKsAutoComplete({
    taskName,
    widgetId,
    entity: attrName,
  });

  const [{ validateFormField }, validationResponse] = useKleeenFormatChecker({
    taskName,
    widgetId,
    formField: attrName,
  });

  const { updateRequest } = useKleeenActions(taskName);
  const { updateLayout } = useMasonry();
  const { paramsBasedOnRoute } = useUrlQueryParams();
  const attrLabel = widgetData && soloAttribute.label;
  const canAddValues = widgetData && soloAttribute.canAddValues;
  const hasMany = widgetData && soloAttribute.hasMany;
  const isClickable =
    Array.isArray(soloAttribute.crossLinking) && Boolean(soloAttribute.crossLinking.length) && disabled;
  const beFormat = pathOr({}, ['data', 'format', attrName], widgetData);
  const ksFormat = soloAttribute.format;
  const format = isNil(beFormat) || isEmpty(beFormat) ? ksFormat : beFormat;
  const transformation = pathOr('', ['value', 'transformation'], params);
  const formatType = pathOr('', ['value', 'formatType'], params);
  let elementToUse;
  const isGlobalModel = params?.baseModel === KS_GLOBAL_APP;
  const isDisplayValue = attrName === camelcase(params?.baseModel);

  const getElementBasedOnTransformationAndType = (transformation, type) => {
    switch (transformation) {
      case transformationElements.SELF_SINGLE:
        return elementsData.filter((element) => {
          if (
            element?.userInputSingle &&
            element?.userInputSingleType &&
            element.userInputSingleType[0] === type
          ) {
            return element;
          }
        });
      case transformationElements.SELF_MULTI:
        return elementsData.filter((element) => {
          if (
            element?.userInputMulti &&
            element?.userInputMultiType &&
            element.userInputMultiType[0] === type
          ) {
            return element;
          }
        });
      default:
        return elementsData.filter((element) => {
          if (
            element?.userInputSingle &&
            element?.userInputSingleType &&
            element.userInputSingleType[0] === type
          ) {
            return element;
          }
        });
    }
  };

  const elementSelectOnly = getElementBasedOnTransformationAndType(
    transformation,
    airTableElementType.SELECT_ONLY,
  );

  const elementNewAndExisting = getElementBasedOnTransformationAndType(
    transformation,
    airTableElementType.NEW_PLUS_EXISTING,
  );

  const attrProp =
    params?.baseModel && attrName === camelcase(params?.baseModel)
      ? `${WidgetDataAttributes.DisplayValue}::${attrName}`
      : attrName;

  const getAttrValue = (): Record<string, unknown> => {
    const path = ['data', 'data', '0', attrProp];
    if (hasMany) {
      return pathOr(INITIAL_ATTRIBUTE_VALUE_HAS_MANY, path, widgetData);
    } else {
      if (params?.baseModel === KS_GLOBAL_APP) {
        const exist = pathOr(
          INITIAL_ATTRIBUTE_VALUE_SINGLE,
          [...path, '0', WidgetDataAttributes.DisplayValue, WidgetDataAttributes.DisplayValue],
          widgetData,
        );
        if (exist) {
          return exist;
        } else {
          return pathOr(
            INITIAL_ATTRIBUTE_VALUE_SINGLE,
            [...path, '0', WidgetDataAttributes.DisplayValue],
            widgetData,
          );
        }
      } else {
        return pathOr(
          INITIAL_ATTRIBUTE_VALUE_SINGLE,
          [...path, WidgetDataAttributes.DisplayValue],
          widgetData,
        );
      }
    }
  };

  const attrValue = getAttrValue();

  const cell = pathOr(INITIAL_ATTRIBUTE_VALUE_SINGLE, ['data', 'data', '0', attrProp], widgetData);

  const [inputValue, setInputValue]: [any, React.Dispatch<React.SetStateAction<any>>] = useState(() => {
    hasMany ? INITIAL_ATTRIBUTE_VALUE_HAS_MANY : INITIAL_ATTRIBUTE_VALUE_SINGLE;
  });
  const inputValueRef = React.useRef(inputValue);
  const attrNameRef = React.useRef(attrName);
  const attrValueRef = React.useRef(attrValue);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectedOptionRef = React.useRef(selectedOption);
  const optionsValues = autoCompleteValues?.data?.length;

  const inputHeight = 40;

  useEffect(() => {
    updateLayout(optionsValues * inputHeight);
  }, [optionsValues, validationResponse.errors]);

  useEffect(() => {
    inputValueRef.current = inputValue;
    attrNameRef.current = attrName;
    attrValueRef.current = attrValue;
    if (inputValue) validateFormField(inputValue);
  }, [inputValue]);

  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  useEffect(() => {
    setInputValue(attrValue);
  }, [attrValue]);

  const onCancel = () => {
    setInputValue(attrValueRef.current);
    setSelectedOption(null);
  };

  const buildParams = () => {
    const baseValue = {
      displayValue: inputValueRef.current,
      id: selectedOptionRef?.current?.id,
    };
    if (isGlobalModel) {
      //config workflow
      return {
        [attrNameRef.current]: [baseValue],
      };
    }

    if (!isGlobalModel && isDisplayValue) {
      //single workflow
      const [firstParamOnRoute] = Object.values(paramsBasedOnRoute);
      return {
        id: firstParamOnRoute,
        displayValue: inputValueRef.current,
        referenceId: selectedOptionRef?.current?.id,
      };
    }

    if (!isGlobalModel && !isDisplayValue) {
      //add modal
      return {
        [attrNameRef.current]: baseValue,
      };
    }
  };

  const getWidgetPayload = (): Record<string, unknown> => {
    attrValueRef.current = inputValueRef.current;
    const entity = isGlobalModel ? attrName : params?.baseModel;
    const payloadParams = buildParams();
    const payload = {
      entity,
      params: payloadParams,
    };

    return payload;
  };
  const onSave = (): any => {
    if (inputValueRef.current !== attrValueRef.current) {
      updateRequest(getWidgetPayload());
      setSelectedOption(null);
    }
  };
  const onRegisterWidgetData = (): any =>
    inputValueRef.current !== attrValueRef.current ? getWidgetPayload() : undefined;

  useEffect(() => {
    if (registerEvents) {
      registerEvents({
        onSave: onRegisterWidgetData,
        onCancel,
      });
    }
  }, []);

  if (!widgetData) {
    return <Loader />;
  }
  const classes = useConfigInputStyles();
  const buttonsDisabled = (): boolean => {
    if (canAddValues) {
      return !inputValue || inputValue === attrValue;
    } else {
      if (hasMany) {
        const notSelectedOption = !selectedOption;
        const inputValueIsNotTheSelected = inputValue !== selectedOption;
        return notSelectedOption || inputValueIsNotTheSelected;
      }
      const notSelectedOption = !selectedOption;
      const inputValueIsNotTheSelected =
        inputValue !== (selectedOption?.displayValue ? selectedOption?.displayValue : selectedOption);
      return notSelectedOption || inputValueIsNotTheSelected;
    }
  };
  const onSetInputValue = (event) => {
    if (onInputChange) onInputChange(true);
    setInputValue(event);
  };

  if (!canAddValues) {
    if (hasMany) {
      elementToUse = elementSelectOnly.find((element) => {
        return element.maxChoices >= autoCompleteValues?.data?.length;
      });
      elementToUse = elementToUse
        ? { ...elementToUse, selectOnly: true }
        : { name: elementCase.FIELD_NOT_ADD_HAVE_MANY };
    } else {
      elementToUse = elementSelectOnly.find((element) => {
        return element.maxChoices >= autoCompleteValues?.data?.length;
      });
      elementToUse = elementToUse
        ? { ...elementToUse, selectOnly: true }
        : { name: elementCase.FIELD_CAN_NOT_ADD };
    }
  } else {
    if (canAddValues) {
      if (hasMany) {
        elementToUse = elementNewAndExisting.find(
          (element) => element.maxChoices && element.maxChoices >= autoCompleteValues?.data?.length,
        );
        elementToUse = elementToUse ? { ...elementToUse, selectOnly: true } : { name: elementCase.FIELD_ADD };
      } else {
        elementToUse = elementNewAndExisting.find(
          (element) => element.maxChoices && element.maxChoices <= autoCompleteValues?.data?.length,
        );
        elementToUse = elementToUse
          ? { ...elementToUse, selectOnly: true }
          : { name: elementCase.FIELD_ADD_NOT_MANY };
      }
    } else {
      if (hasMany) {
        elementToUse = elementNewAndExisting.find(
          (element) => element.maxChoices === autoCompleteValues?.data?.length,
        );
        elementToUse = elementToUse
          ? { ...elementToUse, selectOnly: true }
          : { name: elementCase.FIELD_CAN_NOT_ADD };
      } else {
        elementToUse = elementNewAndExisting.find(
          (element) => element.maxChoices === autoCompleteValues?.data?.length,
        );
        elementToUse = elementToUse
          ? { ...elementToUse, selectOnly: true }
          : { name: elementCase.FIELD_CAN_NOT_ADD };
      }
    }
  }

  const getClassNameForContainer = (elemToUse, isConfigDetail): string => {
    if (isConfigDetail) {
      return '';
    }
    switch (elemToUse?.name) {
      case elementCase.RADIO_GROUP:
        return classes['configInputRadioGroup' + optionsValues];
      case elementCase.CHECK_GROUP:
        return classes['configInputCheckGroup' + optionsValues];
      case elementCase.FIELD_ADD:
      case elementCase.FIELD_NOT_ADD_HAVE_MANY:
        return classes.configInputToken;
      case elementCase.FIELD_ADD_NOT_MANY:
      case elementCase.FIELD_CAN_NOT_ADD:
      default:
        return classes.configInputNormal;
    }
  };

  const showLoader = !widgetData || widgetData.isLoading;
  const classTypeInput =
    (canAddValues && !hasMany) || optionsValues === 1 || elementToUse.name === elementCase.FIELD_CAN_NOT_ADD;

  return (
    <>
      <div
        style={{ alignItems: widgetData.isLoading ? 'flex-start' : 'center' }}
        className={`${classes.configInputBasic} ${classNames(
          getClassNameForContainer(elementToUse, hideTitle && hideSaveAndClose),
          {
            [classes.clickableArea]: isClickable,
          },
        )}`}
      >
        {showLoader ? (
          <Loader />
        ) : (
          <div className={`${classes.configDisplay} ${classTypeInput ? classes.few : ''}`}>
            <div
              className={`${classes.cardContent} ${
                classTypeInput ? classes.cardContentFew : classes.cardContentMany
              }`}
            >
              <TransformToElement
                attrLabel={attrLabel}
                autoCompleteValues={autoCompleteValues}
                canAddValues={canAddValues}
                disabled={disabled}
                elementToUse={elementToUse}
                format={format}
                formatType={formatType}
                inputValue={inputValue}
                setInputValue={onSetInputValue}
                setSelectedOption={setSelectedOption}
                statisticalType={statisticalType}
                transformation={transformation}
                hideTitle={hideTitle}
                inSummaryDetails={inSummaryDetails}
              />
            </div>
            {!hideSaveAndClose && (
              <div
                className={`${classes.cardActionArea} ${
                  classTypeInput ? classes.contentActionFew : classes.contentActionMany
                }`}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className="action-button"
                  onClick={onCancel}
                  disabled={buttonsDisabled()}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="action-button"
                  onClick={onSave}
                  disabled={buttonsDisabled()}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {getValidationResponseErrors(validationResponse, classes.inputLuError)}
    </>
  );
}
