import { Autocomplete, Paper } from './autocomplete.styles';

import { KsAutocompleteProps } from './autocomplete.model';
import { KsTextField } from '../text-field';
import { ReactElement } from 'react';
import { useTheme } from '@kleeen/react/hooks';

export function KsAutocomplete({
  textFieldProps,
  renderInput = (params) => <KsTextField variant="outlined" {...params} {...textFieldProps} />,
  ...restProps
}: KsAutocompleteProps): ReactElement {
  const { themeClass } = useTheme();

  return (
    <Autocomplete
      renderInput={renderInput}
      PaperComponent={({ children }) => (
        <Paper data-testid="autocomplete-container" className={`${themeClass}`}>
          {children}
        </Paper>
      )}
      {...restProps}
    />
  );
}
