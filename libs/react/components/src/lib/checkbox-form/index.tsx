import React, { ReactElement } from 'react';

import { KsCheckbox } from '../checkbox';
import { KsCheckboxFormProps } from './checkbox-form.model';
import classnames from 'classnames';
import { useStyles } from './checkbox-form.styles';

export function KsCheckboxForm({ description, label, ...rest }: KsCheckboxFormProps): ReactElement {
  const classes = useStyles();

  const { disabled } = rest;

  return (
    <div className={classes.formContainer}>
      <div className={classes.checkboxContainer}>
        <KsCheckbox {...rest} />
        <div
          className={classnames(classes.labelContainer, {
            [classes.labelDisabled]: disabled,
          })}
        >
          <span className={classes.label}>{label}</span>
          {description && <span className={classes.description}>{description}</span>}
        </div>
      </div>
    </div>
  );
}
