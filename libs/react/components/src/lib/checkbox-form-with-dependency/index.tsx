import React, { ReactElement } from 'react';

import Collapse from '@material-ui/core/Collapse';
import { KsCheckbox } from '../checkbox';
import { KsCheckboxFormWithDependencyProps } from './checkbox-form-with-dependency.model';
import classnames from 'classnames';
import { useStyles } from './checkbox-form-with-dependency.styles';

export function KsCheckboxFormWithDependency({
  children,
  description,
  label,
  showDependentQuestion,
  ...rest
}: KsCheckboxFormWithDependencyProps): ReactElement {
  const classes = useStyles();

  const { disabled } = rest;

  return (
    <div className={classes.formContainer}>
      <div className={classes.checkboxContainer}>
        <div
          className={classnames(classes.checkboxDependencyIndicator, {
            [classes.dependencyHidden]: !showDependentQuestion,
          })}
        >
          <KsCheckbox {...rest}></KsCheckbox>
        </div>
        <div
          className={classnames(classes.labelContainer, {
            [classes.labelDisabled]: disabled,
          })}
        >
          <span className={classes.label}>{label}</span>
          {description && <span className={classes.description}>{description}</span>}
        </div>
      </div>
      <Collapse in={showDependentQuestion}>
        <div className={classes.dependencyContainer}>{children}</div>
      </Collapse>
    </div>
  );
}
