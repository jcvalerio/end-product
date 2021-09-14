import { createStyles } from '@material-ui/core/styles';

export const styles = () =>
  createStyles({
    infiniteLoader: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: '100%',
      borderRight: 'var(--table-cell-border-right)',
      '&:last-child': {
        borderRight: 'none',
        paddingLeft: 'var(--pm-7XS)',
        '&.ReactVirtualized__Table__row': {
          paddingLeft: '0px',
          '& .ReactVirtualized__Table__rowColumn': {
            '&:last-child': {
              paddingLeft: 'var(--pm-7XS)',
            },
          },
        },
      },
      justifyContent: 'space-between',
      height: '100%',
      minWidth: 'var(--wh-M)',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        borderTopLeftRadius: 'var(--card-border-radius)',
        borderTopRightRadius: 'var(--card-border-radius)',
        borderBottom: 'var(--table-header-border-bottom)',
      },
      '& div.ReactVirtualized__Table__headerRow': {
        backgroundColor: 'var(--table-header)',
      },
      '& .ReactVirtualized__Table__row ': {
        paddingRight: '0px !important',
        width: '100% !important',
      },
      '& .truncate-text': {
        '&, span.text-formatter': {
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          textAlign: 'left',
          display: 'inline-block',
        },
      },
      '& .ReactVirtualized__Table__Grid': {
        '&:focus': {
          outline: 'none',
        },
      },
      '& .ReactVirtualized__Grid ': {
        borderBottomLeftRadius: 'var(--card-border-radius)',
        borderBottomRightRadius: 'var(--card-border-radius)',
        paddingBottom: 'var(--pm-L)',
      },
      '& .header-container': {
        display: 'flex',
        alignItems: 'center',
        minWidth: 'var(--wh-3XS)',
        width: '100%',
        '&:hover': {
          '& .$draggableArea': {
            visibility: 'visible',
            color: 'var(--table-header-text)',
            position: 'relative',
            display: 'inherit',
            left: 'calc(var(--pm-5XS) * -1)',
          },
        },
      },
      '& .draggableArea': {
        visibility: 'hidden',
        position: 'relative',
        display: 'inherit',
        left: 'calc(var(--pm-5XS) * -1)',
        width: 'var(--wh-9XS)',
        zIndex: '99',
        '& .MuiSvgIcon-root': {
          width: '0.9em',
        },
        '&:hover': {
          cursor: 'grab',
        },
      },
    },
    tableHidden: {
      visibility: 'hidden',
      overflow: 'hidden',
    },
    tableHeader: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      minWidth: 'var(--wh-M)',
      '& .MuiTableCell-root': {
        width: '100%',
        borderRight: 'var(--table-cell-border-right)',
        minWidth: 'var(--wh-M)',
        color: 'var(--table-header-text)',
        paddingTop: 'var(--pm-0)',
        paddingBottom: 'var(--pm-0)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        position: 'sticky',
        borderBottom: 'none',
        left: 'unset',
        '& .MuiButtonBase-root': {
          '&:hover': {
            color: 'var(--secondary-color)',
          },
        },
        '&.firstHeader': {
          paddingLeft: 'var(--pm-L) !important',
          borderRight: 'var(--pm-7XS) solid var(--grey_light_2x)',
        },
        '&.middleHeader': {
          borderRight: 'var(--pm-7XS) solid var(--grey_light_2x)',
        },
        '&.lastHeader': {
          borderRight: 'none !important',
        },
        '& .MuiFormControl-root': {
          width: '100%',
          paddingBottom: 'var(--pm-S)',
          paddingTop: 'var(--pm-L)',
          maxHeight: 'var(--wh-1XS)',
          '& .MuiFormLabel-root': {
            fontSize: 'var(--tx-M)',
            color: 'inherit',
            fontWeight: 'bold',
            display: 'block',
            top: 'calc(var(--pm-M)*-1)',
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '&.Mui-focused': {
              fontWeight: 'bold',
              fontSize: 'var(--tx-S)',
              paddingTop: 'var(--pm-5XS)',
              top: 'calc(var(--pm-6XS)*-1)',
            },
            '&.MuiFormLabel-filled': {
              fontWeight: 'bold',
              fontSize: 'var(--tx-S)',
              paddingTop: 'var(--pm-5XS)',
              top: 'calc(var(--pm-6XS)*-1)',
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
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'var(--wh-S)',
          '& .sort-icon': {
            '& .kui-icon': {
              color: 'transparent',
            },
          },
          '& .sort-icon.show': {
            '& .kui-icon': {
              color: 'var(--table-header-text)',
            },
          },
        },
        '& .header-item:hover': {
          '& .sort-icon': {
            '& .kui-icon': {
              color: 'var(--table-header-text)',
            },
          },
        },
      },
      '&:last-child': {
        '& .MuiTableCell-root': {
          borderRight: 'none',
        },
      },
    },
    tableRow: {
      height: 'var(--wh-1XS)',
      border: 'none',
      borderBottom: 'var(--table-row-border-bottom)',
      '& .firstColumn': {
        paddingLeft: 'var(--pm-0) !important',
      },
      '& .sortable-cell': {
        '& > :first-child': {
          flex: '0 1 0',
        },
      },
      '& .editable-cell': {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 0,
        '& > :first-child': {
          flex: '1 0',
          width: '100%',
        },
        '& .icon': {
          cursor: 'pointer',
          color: 'var(--transparent)',
        },
        '&:hover': {
          '& .icon': {
            color: 'var(--on-secondary-color-variant)',
          },
        },
        '& .MuiInputBase-root': {
          '& .MuiInput-input': {
            color: 'var(--on-row-odd)',
          },
        },
      },
      '& .draggable-container': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'var(--wh-1XS)',
        padding: '0 var(--pm-6XS)',
        '& .draggable-column': {
          visibility: 'hidden',
          position: 'absolute',
          textAlign: 'center',
          paddingTop: 'var(--pm-5XS)',
        },
        '& .draggable-column-number': {
          position: 'absolute',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'inherit',
          visibility: 'visible',
        },
      },
      '&.MuiTableRow-head': {
        height: 'var(--wh-S)',
      },
      '&:nth-of-type(odd)': {
        color: 'var(--on-row-odd)',
        backgroundColor: 'var(--row-odd)',
      },
      '&:nth-of-type(even)': {
        color: 'var(--on-row-even)',
        backgroundColor: 'var(--row-even)',
      },
      '& .actions-form-cell': {
        width: '40%',
        textAlign: 'right',
        paddingLeft: '0px',
        '& .actions-form-container': {
          visibility: 'hidden',
        },
      },
      '& .confirm-delete-container': {
        display: 'flex',
        '& .confirm-delete-label': {
          lineHeight: 'var(--wh-3XS)',
          marginLeft: 'var(--pm-1XL)',
        },
      },
      '&.dragging-row-helper-styles': {
        backgroundColor: 'var(--secondary-color-variant)',
        '& .MuiTableCell-root': {
          paddingLeft: 'var(--pm-0)',
          '&.editable-cell': {
            paddingLeft: 'var(--pm-L) !important',
            '& .MuiInputBase-root': {
              color: 'var(--on-secondary-color-variant)',
              '& .MuiInput-input': {
                color: 'var(--on-secondary-color-variant)',
              },
            },
          },
          '&.firstColumn': {
            paddingLeft: 'var(--pm-0) !important',
          },
          '& .MuiToolbar-root': {
            '& .MuiButtonBase-root': {
              color: 'var(--on-secondary-color-variant)',
            },
          },
        },
        '& .draggable-container': {
          paddingLeft: 'calc(var(--pm-1XL) + var(--pm-7XS))',
          color: 'var(--on-secondary-color-variant)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'var(--wh-1XS)',
          padding: '0 var(--pm-6XS)',
        },
        '& .draggable-column': {
          position: 'absolute',
          textAlign: 'center',
          color: 'var(--on-secondary-color-variant)',
          visibility: 'visible !important',
          paddingTop: 'var(--pm-5XS)',
        },
        '& .draggable-column-number': {
          position: 'absolute',
          textAlign: 'center',
          color: 'var(--on-secondary-color-variant)',
          visibility: 'hidden !important',
        },
        '& .MuiSvgIcon-root': {
          fill: 'var(--on-secondary-color-variant)',
          color: 'var(--on-secondary-color-variant)',
          marginLeft: 'calc(var(--pm-S) * -1)',
          marginRight: 'var(--pm-S)',
        },
        '& .actions-container': {
          paddingLeft: 'var(--pm-S)',
        },
        '& .actions-form-cell': {
          paddingLeft: '0px',
          '& .actions-form-container': {
            visibility: 'visible',
          },
        },
        '& .show-more-label': {
          color: 'var(--on-secondary-color-variant)',
        },
        '& .text-formatter': {
          color: 'var(--on-secondary-color-variant) !important',
        },
        '& .ks-filled-outer-circle': {
          borderColor: 'var(--on-secondary-color-variant) !important',
          marginLeft: 'var(--pm-7XS)',
        },
        '& .ks-filled-inner-circle': {
          backgroundColor: 'var(--on-secondary-color-variant) !important',
        },
      },
    },
    tableRowHover: {
      '&:hover': {
        '& .clickable-chips': {
          '& .chips-container': {
            '& .MuiChip-label': {
              color: 'var(--on-secondary-color-variant)',
            },
          },
        },
        '& .text': {
          '& .UserAvatar--inner': {
            color: 'var(--secondary-color-variant) !important',
            backgroundColor: 'var(--on-secondary-color-variant) !important',
          },
        },
        backgroundColor: 'var(--secondary-color-variant)',
        '& .MuiTableCell-root': {
          '&.editable-cell': {
            '& .MuiInputBase-root': {
              color: 'var(--on-secondary-color-variant)',
              '& .MuiInput-input': {
                color: 'var(--on-secondary-color-variant)',
              },
            },
          },
          '& .MuiToolbar-root': {
            '& .MuiButtonBase-root': {
              color: 'var(--on-secondary-color-variant)',
            },
          },
        },
        '& .draggable-container': {
          color: 'var(--on-secondary-color-variant)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'var(--wh-1XS)',
          padding: '0 var(--pm-6XS)',
        },
        '& .draggable-column': {
          position: 'absolute',
          textAlign: 'center',
          color: 'var(--on-secondary-color-variant)',
          visibility: 'visible',
          paddingTop: 'var(--pm-5XS)',
        },
        '& .draggable-column-number': {
          position: 'absolute',
          textAlign: 'center',
          color: 'var(--on-secondary-color-variant)',
          visibility: 'hidden',
        },
        '& .MuiCheckbox-colorSecondary': {
          color: 'var(--on-secondary-color-variant)',
        },
        '& .actions-form-cell': {
          paddingLeft: '0px',
          '& .actions-form-container': {
            visibility: 'visible',
          },
        },
        '& .show-more-label': {
          color: 'var(--on-secondary-color-variant)',
        },
        '& .text-formatter': {
          color: 'var(--on-secondary-color-variant) !important',
        },
        '& .ks-filled-outer-circle': {
          borderColor: 'var(--on-secondary-color-variant) !important',
          marginLeft: 'var(--pm-7XS)',
        },
        '& .ks-filled-inner-circle': {
          backgroundColor: 'var(--on-secondary-color-variant) !important',
        },
      },
    },
    tableCell: {
      flex: 1,
    },
    isDeletingRow: {
      '& > div:nth-of-type(1)': {
        position: 'absolute',
      },
      '& > div': {
        border: 'none',
      },
    },
    noClick: {
      cursor: 'initial',
    },
    '.dragging-row-helper-styles': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  });
