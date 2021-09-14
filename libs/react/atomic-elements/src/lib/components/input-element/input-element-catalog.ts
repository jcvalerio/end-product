import {
  CheckBoxGroup,
  ColorPickerSelect,
  CompositeComponent,
  DateTimePicker,
  FieldTextAutocomplete,
  RadioGroup,
  SelectTextAutocomplete,
  SwitchField,
  TokenFieldText,
  TokenSelectText,
} from './components';
import { ElementInputType, InputCatalog, InputComponentProps, InputElement } from '@kleeen/types';

const inputCatalog: InputCatalog = {
  [ElementInputType.CheckGroup]: CheckBoxGroup,
  [ElementInputType.ColorPicker]: ColorPickerSelect,
  [ElementInputType.CompositeComponent]: CompositeComponent,
  [ElementInputType.DateTimeField]: DateTimePicker,
  [ElementInputType.FieldTextAutoComplete]: FieldTextAutocomplete,
  [ElementInputType.RadioGroup]: RadioGroup,
  [ElementInputType.SelectTextAutocomplete]: SelectTextAutocomplete,
  [ElementInputType.Switch]: SwitchField,
  [ElementInputType.TokenFieldText]: TokenFieldText,
  [ElementInputType.TokenSelectText]: TokenSelectText,
  [ElementInputType.UploadImage]: TODO,
};

export function getInputElement(inputComponent: ElementInputType): InputElement {
  return inputCatalog[inputComponent] || Default;
}

//#region Private members
function Default({ element }: InputComponentProps) {
  console.info(`${element} does not exist in the input catalog`);
  return null;
}

function TODO({ element }: InputComponentProps) {
  console.info(`${element} TBD soon`);
  return null;
}
//#endregion
