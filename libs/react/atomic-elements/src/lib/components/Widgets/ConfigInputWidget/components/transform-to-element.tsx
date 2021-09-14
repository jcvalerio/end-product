import { AggregationType, ListItem, StatisticalDataType, Variant } from '@kleeen/types';
import {
  CheckBoxGroup,
  DateTime,
  FileResult,
  KsAutocomplete,
  KsColorPicker,
  KsTextField,
  KsToken,
  RadioGroup,
  Switch,
  TextFormatter,
  Upload,
} from '@kleeen/react/components';
import {
  INITIAL_ATTRIBUTE_VALUE_HAS_MANY,
  INITIAL_ATTRIBUTE_VALUE_SINGLE,
  TransformToElementProps,
  elementCase,
} from '../ConfigInputWidget.model';

import { InputProps } from '@material-ui/core';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function TransformToElement(props: TransformToElementProps): JSX.Element {
  const {
    attrLabel,
    autoCompleteValues,
    canAddValues,
    disabled,
    elementToUse,
    hideTitle,
    format,
    formatType,
    inputValue,
    inSummaryDetails,
    setInputValue,
    setSelectedOption,
    statisticalType,
    transformation,
    refValue,
    errors,
    helpText,
  } = props;

  const severityColor = getColorForSeverityValues(inputValue, format, transformation);

  const getCheckBoxInput = (): JSX.Element => {
    return (
      <CheckBoxGroup
        title={attrLabel}
        options={autoCompleteValues}
        initialCheckedValues={inputValue}
        disabled={disabled}
        onChange={(newValues) => {
          setSelectedOption && setSelectedOption(newValues);
          setInputValue(newValues);
        }}
      />
    );
  };

  const getTokenInput = (isAddable = false): JSX.Element => {
    return (
      <KsToken
        isAddable={isAddable}
        options={autoCompleteValues.data || []}
        placeholder={attrLabel}
        getOptionLabel={({ displayValue }) => (displayValue ? String(displayValue) : '')}
        onInputChange={(e, value, signal) => {
          if (signal === 'clear' || (signal === 'input' && value === '')) {
            setInputValue(INITIAL_ATTRIBUTE_VALUE_HAS_MANY);
          } else if (value) setInputValue(value);
        }}
        value={inputValue}
        onChange={(_, options, eventType) => {
          if (options) {
            if (eventType === 'create-option' && isAddable === true) {
              const lastOption = options[options.length - 1];
              const newOptions = [...options.slice(0, options.length - 1), { displayValue: lastOption }];
              setSelectedOption && setSelectedOption(newOptions);
              setInputValue(newOptions);
              return;
            } else {
              setSelectedOption && setSelectedOption(options);
              setInputValue(options);
            }
          }
        }}
        disabled={disabled}
        format={format}
        formatType={formatType}
      />
    );
  };

  const getSwitchInput = (): JSX.Element => {
    return (
      <Switch
        disabled={disabled}
        label={attrLabel}
        defaultValue={inputValue}
        handleOnChange={(newValue) => {
          setInputValue(newValue);
          setSelectedOption && setSelectedOption(newValue);
        }}
      />
    );
  };
  const getColorPickerInput = (): JSX.Element => {
    return (
      <KsColorPicker
        disabled={disabled}
        label={attrLabel}
        defaultValue={inputValue}
        formatType={formatType}
        variant={!canAddValues && !disabled ? Variant.outlined : Variant.standard}
        handleOnChange={(newValue) => {
          setInputValue(newValue);
          setSelectedOption && setSelectedOption(newValue);
        }}
      />
    );
  };

  const getRadioGroupInput = (): JSX.Element => {
    return (
      <RadioGroup
        title={attrLabel}
        options={autoCompleteValues}
        disabled={disabled}
        defaultSelectionValue={inputValue}
        hideTitle={hideTitle}
        inSummaryDetails={inSummaryDetails}
        onSelect={(selectedOption?: ListItem) => {
          if (setInputValue) {
            setInputValue(selectedOption?.displayValue);
          }
          if (setSelectedOption) {
            setSelectedOption(selectedOption);
          }
        }}
      />
    );
  };

  const getDateInput = (): JSX.Element => (
    <DateTime
      label={attrLabel}
      disabled={disabled}
      defaultValue={inputValue}
      handleOnChange={(newValue) => {
        setInputValue(newValue);
        setSelectedOption && setSelectedOption(newValue);
      }}
    />
  );

  const getUploadInput = (is_multiple = false): JSX.Element => {
    return (
      <Upload
        is_multiple={is_multiple}
        badgeConfig={{ color: disabled ? 'primary' : 'secondary' }}
        buttonConfig={{ color: 'primary' }}
        disabled={disabled}
        label={attrLabel}
        onChange={(filesToUpload: FileResult) => {
          const hasAFileToUpload = !isNilOrEmpty(filesToUpload) && !isNilOrEmpty(filesToUpload.filteredFiles);
          if (hasAFileToUpload) {
            const [firstFile] = filesToUpload.filteredFiles;
            // TODO: @guaria here we have to define how the file is going to be uploaded
            setInputValue(firstFile.name);
            setSelectedOption && setSelectedOption(firstFile.name);
          }
        }}
      />
    );
  };

  const getAutocompleteInput = (): JSX.Element => {
    const extraInputProps: InputProps = {
      disableUnderline: disabled,
    };
    if (disabled) {
      extraInputProps.endAdornment = undefined;
    }
    return (
      <KsAutocomplete
        freeSolo={canAddValues}
        options={autoCompleteValues?.data || []}
        renderOption={(option) => (
          <TextFormatter format={format} formatType={formatType} transformation={AggregationType.SelfSingle}>
            {option.displayValue}
          </TextFormatter>
        )}
        getOptionLabel={({ displayValue }) => (displayValue ? String(displayValue) : '')}
        getOptionSelected={(option, value) => option.displayValue === value || option.id === value}
        onInputChange={(e, value, signal) => {
          if (signal === 'clear' || (signal === 'input' && value === '')) {
            setInputValue(INITIAL_ATTRIBUTE_VALUE_SINGLE);
          } else if (value) setInputValue(value);
        }}
        value={String(inputValue) || ''}
        inputValue={String(inputValue) || ''}
        onChange={(_, option?: ListItem) => {
          if (setSelectedOption) {
            setSelectedOption(option);
          }
          setInputValue(option?.displayValue || '');
        }}
        disabled={disabled}
        renderInput={(params) => (
          <KsTextField
            variant={!canAddValues && !disabled ? Variant.outlined : Variant.standard}
            label={attrLabel}
            {...params}
            InputProps={{ ...params.InputProps, ...extraInputProps }}
            inputProps={{
              ...params.inputProps,
              style: { color: severityColor },
              name: attrLabel,
            }}
            inputRef={refValue}
            error={Boolean(errors && errors[attrLabel])}
            helperText={errors && errors[attrLabel] ? 'This field is required' : helpText}
          />
        )}
      />
    );
  };

  const getStaticalTypeElement = (): JSX.Element => {
    switch (statisticalType) {
      case StatisticalDataType.NumericTemporal:
        return getDateInput();
      case StatisticalDataType.Binary:
        return getSwitchInput();
      case StatisticalDataType.Image:
        return getUploadInput();
      case StatisticalDataType.Color:
        return getColorPickerInput();
      default:
        return getAutocompleteInput();
    }
  };

  switch (elementToUse?.name) {
    case elementCase.FIELD_NOT_ADD_HAVE_MANY:
      return getTokenInput(false);
    case elementCase.FIELD_ADD:
      return getTokenInput(true);
    case elementCase.FIELD_CAN_NOT_ADD:
    case elementCase.FIELD_ADD_NOT_MANY:
      return getStaticalTypeElement();
    case elementCase.CHECK_GROUP:
      return getCheckBoxInput();
    case elementCase.RADIO_GROUP:
      if (disabled && inSummaryDetails) {
        return getAutocompleteInput();
      } else {
        return getRadioGroupInput();
      }
    default:
      return getAutocompleteInput();
  }
}
