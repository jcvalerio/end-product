import { Attribute } from '@kleeen/types';
import { Icon } from '../../Icon';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import { Order } from '@kleeen/common/utils';
import React from 'react';
import { TableHeaderProps } from '../GridSection.model';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';

const TableHead = styled(MuiTableHead)({
  height: 'var(--wh-S)',
  '& .MuiTableCell-stickyHeader': {
    backgroundColor: 'var(--table-header)',
    color: 'var(--table-header-text)',
    paddingTop: 'var(--pm-0)',
    paddingBottom: 'var(--pm-0)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    position: 'sticky',
    left: 'unset',
    '& .MuiButtonBase-root': {
      '&:hover': {
        color: 'var(--secondary-color)',
      },
    },
    '& .MuiFormControl-root': {
      paddingBottom: 'var(--pm-S)',
      paddingTop: 'var(--pm-1XS)',
      maxHeight: 'var(--wh-1XS)',
      '& .MuiFormLabel-root': {
        fontSize: 'var(--tx-M)',
        color: 'inherit',
        fontWeight: 'bold',
        display: 'block',
        top: 'calc(var(--pm-1XL)*-1)',
        position: 'inherit',
        whiteSpace: 'nowrap',
        '&.Mui-focused': {
          fontWeight: 'bold',
          fontSize: 'var(--tx-S)',
          paddingTop: 'var(--pm-5XS)',
          top: 'calc(var(--pm-3XS)*-1)',
        },
        '&.MuiFormLabel-filled': {
          fontWeight: 'bold',
          fontSize: 'var(--tx-S)',
          paddingTop: 'var(--pm-5XS)',
          top: 'calc(var(--pm-3XS)*-1)',
        },
      },
      '& .MuiInput-formControl': {
        color: 'inherit',
        marginTop: 'calc(var(--pm-M)*-1)',
        minWidth: 'var(--wh-M)',
        '& Input': {
          color: 'inherit',
          fontSize: 'var(--tx-L)',
        },
      },
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .kui-icon': {
      height: 'var(--wh-3XS)',
      width: 'var(--wh-2XS)',
    },
    '& .header-item': {
      '& .sort-icon': {
        '& .kui-icon': {
          color: 'var(--table-header-text)',
        },
      },
    },
  },
});

const TableRow = styled(MuiTableRow)({
  height: 'var(--wh-1XS)',
  '&.MuiTableRow-head': {
    height: 'var(--wh-S)',
  },
});

const TableCell = styled(MuiTableCell)({
  color: 'inherit',
  fontSize: 'var(--tx-M)',
  paddingTop: 'var(--pm-2XS)',
  paddingBottom: 'var(--pm-2XS)',
  lineHeight: 'normal',
  borderBottom: 'none',
  minWidth: 'var(--wh-S)',
  width: '100%',

  '&.MuiTableCell-paddingCheckbox': {
    width: 'var(--wh-S)',
  },
  '&:last-child': {
    borderRight: 'none',
  },
});

const iconBySortDirection: { [key in Order]: string } = {
  [Order.asc]: 'ks-sort-asc',
  [Order.desc]: 'ks-sort-desc',
  [Order.none]: 'ks-sort-asc',
};

const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps): JSX.Element => {
  const { order, orderBy, onSort, attributes, handleChange, hasActions, widgetId } = props;

  const getColumnLabel = (attr: Attribute): string => attr.label || attr.name;

  return (
    <TableHead id={`table-container-head_${widgetId}`}>
      <TableRow>
        <>
          {attributes.map((attr, idx) => {
            const colSpan = idx === 0 && hasActions ? 2 : 0;
            return (
              <TableCell key={attr.name} colSpan={colSpan}>
                <div className="header-item">
                  <TextField
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange(attr.name, value);
                    }}
                    label={getColumnLabel(attr)}
                  />
                  <div
                    className={`sort-icon ${orderBy === attr.name ? 'show' : ''}`}
                    onClick={() => {
                      onSort(attr.name);
                    }}
                  >
                    <Icon icon={iconBySortDirection[order]} />
                  </div>
                </div>
              </TableCell>
            );
          })}
        </>
      </TableRow>
    </TableHead>
  );
};

export { TableCell, TableHeader, TableRow };
