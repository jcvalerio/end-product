import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  'dragging-column-helper-styles': {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '2px 2px 9px 0px rgba(0, 0, 0, 0.5)',
    paddingLeft: 'var(--pm-0)',
    pointerEvents: 'auto !important' as 'auto', //drag and drop library sets pointer-events as none
    cursor: 'grabbing',
    position: 'relative',
    left: 'calc(var(--pm-5XS) * -1)',

    '& .draggableArea': {
      display: 'contents',
      '& .MuiSvgIcon-root': {
        width: '0.9em',
        fill: 'var(--table-header-text)',
        color: 'var(--table-header-text)',
        marginLeft: 'calc(var(--pm-4XS) * -1)',
        marginRight: 'var(--pm-4XS)',
      },
    },
  },
  virtualTable: {
    backgroundColor: 'var(--row-even)',
    borderRadius: 'var(--card-border-radius)',
    boxShadow: 'var(--card-shadow)',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
  },
});
