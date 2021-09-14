import { CheckboxProps } from '@material-ui/core/Checkbox';
import { ReactElement } from 'react';

export interface KsCheckboxFormWithDependencyProps extends CheckboxProps {
  children: ReactElement;
  description?: string | ReactElement;
  label: string | ReactElement;
  showDependentQuestion?: boolean;
}
