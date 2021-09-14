import './input-color.scss';

import { ArrowDropProps, TextColorInputProps, inputColorDefault } from './input-color.model';
import { ColorPickerProps, TypeColorFormat } from '../color-picker.model';
import React, { useEffect } from 'react';
import { ReactElement, Variant } from '@kleeen/types';
import { exportColorToAlpha, exportColorToHex, isValidColor } from '@kleeen/frontend/utils';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { FormControl } from './input-color.style';
import { InputAdornment } from '@material-ui/core';
import { KsTextField } from '@kleeen/react/components';
import { isNilOrEmpty } from '@kleeen/common/utils';

export const InputColor = ({
  handleOnChange,
  dataTestId = inputColorDefault.dataTestId,
  label = inputColorDefault.label,
  defaultValue,
  disabled = inputColorDefault.disabled,
  variant = inputColorDefault.variant,
  formatType = inputColorDefault.formatType,
}: ColorPickerProps): ReactElement => {
  const hasColor = !isNilOrEmpty(defaultValue) && isValidColor(defaultValue);
  const valueColor: string = hasColor ? exportColorToHex(defaultValue) : inputColorDefault.defaultValue;
  const valueAlpha: number = hasColor ? exportColorToAlpha(defaultValue) : inputColorDefault.alpha;
  const newVariant: Variant = disabled ? inputColorDefault.variant : variant;

  const formatColor = (value: string, alpha?: number): string => {
    return colorFormat(formatType as TypeColorFormat, value, alpha || valueAlpha);
  };

  return (
    <FormControl>
      <TextColorInput
        newVariant={newVariant}
        label={label}
        dataTestId={dataTestId}
        disabled={disabled}
        handleOnChange={handleOnChange}
        valueColor={valueColor}
        defaultValue={defaultValue}
        formatColor={formatColor}
      />
    </FormControl>
  );
};

export default InputColor;

//#region Private members

function TextColorInput({
  newVariant,
  label,
  dataTestId,
  disabled,
  handleOnChange,
  valueColor,
  defaultValue,
  formatColor,
}: TextColorInputProps): ReactElement {
  const [brandColor, setValue] = React.useState(valueColor);
  const [focused, setFocused] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const color = formatColor(event.target?.value, inputColorDefault.alpha);
    setValue(color);
  };

  const handleInputFocus = (): void => {
    setFocused((previousState) => {
      if (previousState && brandColor !== formatColor(valueColor)) {
        setTimeout(() => handleOnChange(brandColor));
      }
      return !previousState;
    });
  };

  useEffect(() => {
    if (brandColor !== defaultValue) {
      setValue(formatColor(valueColor));
    }
  }, [valueColor]);

  return (
    <KsTextField
      className="content-input-color"
      focused={focused}
      fullWidth
      label={label}
      type="search"
      value={brandColor}
      variant={newVariant}
      disabled={disabled}
      InputProps={{
        startAdornment: startAdornment(brandColor, focused),
        endAdornment: (
          <div>
            <input
              className="bar-color"
              data-testid={dataTestId}
              onBlur={handleInputFocus}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              type="color"
              disabled={disabled}
              value={valueColor}
            />
            <ArrowDrop focused={focused} />
          </div>
        ),
      }}
    />
  );
}

function ArrowDrop({ focused }: ArrowDropProps): ReactElement {
  const PositionArrowDrop = (): ReactElement => {
    if (focused) return <ArrowDropUpIcon />;
    return <ArrowDropDownIcon />;
  };

  return (
    <InputAdornment position="end">
      <PositionArrowDrop />
    </InputAdornment>
  );
}

function colorFormat(format: TypeColorFormat, value: string, alpha: number): string {
  let result;

  const hexToAlpha = (alphaPercent: number): string => {
    const hexAlpha = Math.round(alphaPercent * 255).toString(16);
    if (hexAlpha.length == 1) {
      return `0${hexAlpha}`;
    }
    return hexAlpha;
  };

  switch (format) {
    case TypeColorFormat.rgba:
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
      if (!result) return inputColorDefault.defaultValue;
      return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16,
      )},${alpha})`;
    case TypeColorFormat.rgbaHex:
      if (isNilOrEmpty(value)) return value;
      return `${value}${hexToAlpha(alpha)}`;
    default:
      return value;
  }
}

function startAdornment(brandColor: string, focused: boolean): ReactElement | undefined {
  const isShowPointColor = brandColor || focused;
  if (!isShowPointColor) return;

  const style = { backgroundColor: brandColor };
  return <div className="point-color" style={style}></div>;
}

//#region
