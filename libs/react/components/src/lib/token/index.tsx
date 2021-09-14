import { StyledAutocomplete, StyledPaper, useTokenStyles } from './token.styles';
import { useTextFormatter, useTheme } from '@kleeen/react/hooks';

import { KsChip } from '../chip';
import { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import TextFormatter from '../textFormatter/TextFormatter';
import { getColorForSeverityValues } from '@kleeen/frontend/utils';

export function KsToken({
  format,
  getOptionLabel,
  inputMaxHeight = '77px',
  isAddable,
  options,
  placeholder,
  ...restProps
}): ReactElement {
  const classes = useTokenStyles();
  const { themeClass } = useTheme();
  const { value = [], formatType } = restProps;
  const [formatter] = useTextFormatter({ format, formatType });

  return isAddable ? (
    <StyledAutocomplete
      multiple
      freeSolo
      PaperComponent={({ children }) => <StyledPaper className={`${themeClass}`}>{children}</StyledPaper>}
      value={value}
      getOptionLabel={getOptionLabel}
      id="tags-outlined"
      options={options}
      renderOption={(option: { displayValue: string | number }) => (
        <TextFormatter format={format} transformation="selfSingle" formatType={formatType}>
          {isNaN(+option.displayValue) ? option.displayValue : +option.displayValue}
        </TextFormatter>
      )}
      filterSelectedOptions
      onChange={restProps.onChange}
      ChipProps={{ className: classes.chip }}
      renderTags={(value, getTagProps) => (
        <div style={{ maxHeight: inputMaxHeight, overflow: 'auto', width: '100%' }}>
          {value.map((option: { displayValue: string | number }, index) => {
            const borderColor = getColorForSeverityValues(option.displayValue, format, 'selfSingle');
            return (
              <KsChip
                variant="outlined"
                label={formatter(option.displayValue)}
                {...getTagProps({ index })}
                style={borderColor !== 'inherit' ? { borderColor } : {}}
              />
            );
          })}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ className: classes.inputLabel }}
          label={placeholder}
          placeholder={placeholder}
        />
      )}
      disabled={restProps.disabled}
    />
  ) : (
    <StyledAutocomplete
      multiple
      id="tags-outlined"
      PaperComponent={({ children }) => <StyledPaper className={`${themeClass}`}>{children}</StyledPaper>}
      options={options}
      value={value}
      renderOption={(option: { displayValue: string | number }) => (
        <TextFormatter format={format} transformation="selfSingle" formatType={formatType}>
          {option.displayValue}
        </TextFormatter>
      )}
      getOptionLabel={getOptionLabel}
      filterSelectedOptions
      ChipProps={{ className: classes.chip }}
      onChange={restProps.onChange}
      renderTags={(value, getTagProps) => (
        <div style={{ maxHeight: inputMaxHeight, overflow: 'auto', width: '100%' }}>
          {value.map((option: { displayValue: string | number }, index) => {
            const borderColor = getColorForSeverityValues(option.displayValue, format, 'selfSingle');
            return (
              <KsChip
                variant="outlined"
                label={formatter(option.displayValue)}
                {...getTagProps({ index })}
                style={borderColor !== 'inherit' ? { borderColor } : {}}
              />
            );
          })}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ className: classes.inputLabel }}
          variant="outlined"
          label={placeholder}
          placeholder={placeholder}
        />
      )}
      disabled={restProps.disabled}
    />
  );
}
