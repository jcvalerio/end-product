import { BaseInputComponentProps, ListItem } from '@kleeen/types';
import { KsAutocomplete, KsTextField, TextFormatter } from '@kleeen/react/components';

import { AutocompleteInputChangeReason } from '@material-ui/lab/useAutocomplete';
import { INITIAL_ATTRIBUTE_VALUE_SINGLE } from '../../../Widgets/ConfigInputWidget/ConfigInputWidget.model';
import { getOptionLabel } from '../../utils';
import { isNilOrEmpty } from '@kleeen/common/utils';

interface BaseAutocompleteProps extends BaseInputComponentProps {
  color?: string;
  freeSolo?: boolean;
  helpText?: string;
  label?: string;
  options: ListItem[];
  variant?: 'filled' | 'outlined' | 'standard';
}

export function BaseAutocomplete(props: BaseAutocompleteProps) {
  const inputValue = isNilOrEmpty(props.value) ? INITIAL_ATTRIBUTE_VALUE_SINGLE : String(props.value);

  return (
    <KsAutocomplete
      freeSolo={props.freeSolo}
      getOptionLabel={getOptionLabel}
      getOptionSelected={(option: ListItem, value: string) =>
        option.displayValue === value || option.id === value
      }
      inputValue={inputValue}
      onInputChange={(_, value: string, signal: AutocompleteInputChangeReason) => {
        if (signal === 'clear' || (signal === 'input' && isNilOrEmpty(value))) {
          props.setValue(INITIAL_ATTRIBUTE_VALUE_SINGLE);
        } else if (value) {
          props.setValue(value);
        }
      }}
      onChange={(_, option?: ListItem) => {
        props.setSelectedOption(option);
        props.setValue(option?.displayValue || INITIAL_ATTRIBUTE_VALUE_SINGLE);
      }}
      options={props.options}
      renderInput={(params) => (
        <KsTextField
          {...params}
          InputProps={{ ...params.InputProps }}
          helperText={props.helpText}
          inputProps={{
            ...params.inputProps,
            style: { color: props.color },
          }}
          label={props.label}
          variant={props.variant}
        />
      )}
      renderOption={(option: ListItem) => (
        <TextFormatter
          format={props.format}
          formatType={props.formatType}
          transformation={props.transformation}
        >
          {option.displayValue}
        </TextFormatter>
      )}
      value={inputValue}
    />
  );
}
