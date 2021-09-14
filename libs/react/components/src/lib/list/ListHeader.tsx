import React, { ReactElement } from 'react';

import { ListHeaderProps } from './ListHeader.model';
import TextField from '@material-ui/core/TextField';
import { styleListHeader } from './ListHeader.style';

export function ListHeader({ columns, setSearchTerm, setSearchKey }: ListHeaderProps): ReactElement {
  const classes = styleListHeader();

  function handleChange(value: any, index: any): void {
    setSearchTerm(value);
    setSearchKey(index);
  }

  return (
    <li className={classes.listHeader}>
      {columns.map(({ label }, i) => (
        <div key={label} className={classes.textWrap}>
          <TextField
            onChange={(e) => {
              const { value } = e.target;
              handleChange(value, columns[i].name);
            }}
            className={classes.hoverTitleHeader}
            label={label}
          />
        </div>
      ))}
    </li>
  );
}
