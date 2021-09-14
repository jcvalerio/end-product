import { CheckboxProps } from '@material-ui/core/Checkbox';
import { ReactElement } from 'react';

export interface KsCheckboxFormProps extends CheckboxProps {
  description?: string | ReactElement;
  label: string | ReactElement;
}
