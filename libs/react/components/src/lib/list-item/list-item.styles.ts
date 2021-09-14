import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  bar: {
    height: '100%',
  },
  barSpace: {
    height: '100%',
    right: 0,
    top: 0,
    width: '50%',
  },
  cell: {
    '&:first-of-type': {
      fontSize: 'var(--tx-L)',
      paddingTop: 'var(--pm-2XS)',
    },
    '&:last-of-type': {
      paddingTop: 'var(--pm-1XS)',
      textAlign: 'right',
    },
    height: '100%',
    padding: '0 var(--pm-L)',
    position: 'relative',
    width: '50%',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 'var(--tx-M)',
    height: 'var(--wh-1XS)',
    justifyContent: 'space-between',
    '&:nth-of-type(odd)': {
      backgroundColor: 'var(--row-odd)',
      color: 'var(--on-row-odd)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'var(--row-even)',
      color: 'var(--on-row-even)',
    },
  },
  negativeBar: {
    backgroundColor: 'hsla(var(--viz3), .2)',
    borderRight: 'var(--pm-6XS) solid hsla(var(--viz3), 1)',
    float: 'left',
  },
  numericBar: {
    display: 'flex',
    height: '80%',
    left: 0,
    position: 'absolute',
    top: '10%',
    width: '100%',
  },
  positiveBar: {
    backgroundColor: 'hsla(var(--viz1), .2)',
    borderLeft: 'var(--pm-6XS) solid hsla(var(--viz1), 1)',
    float: 'right',
  },
  textNumericBar: {
    position: 'inherit',
  },
}));
