import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { TextFieldProps } from '@material-ui/core/TextField';

export interface KsAutocompleteProps
  extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'renderInput'> {
  defaultSelectedValue?: any[];
  renderInput?: (params: any) => any;
  textFieldProps?: TextFieldProps;
}
