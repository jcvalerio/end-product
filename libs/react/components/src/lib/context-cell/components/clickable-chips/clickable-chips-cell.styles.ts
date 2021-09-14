import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  clickableChips: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chipsContainer: {
    display: 'flex',
    maxWidth: '85%',
    overflow: 'hidden',
    '& .MuiChip-root': {
      backgroundColor: 'var(--table-chip-background)',
      height: 'var(--wh-3XS)',
      margin: 'var(--pm-6XS)',
      whiteSpace: 'nowrap',
      color: 'var(--table-chip-color)',
      '& span': {
        '&:hover': {
          color: 'var(--table-chip-color)',
        },
      },
    },
    // TODO:this needs to be implemented with crosslink classes, the color variables just were added to be used later
    '& .MuiChip-root.clickable': {
      backgroundColor: 'var(--table-chip-clickable-background)',
      color: 'var(--table-chip-clickable-color)',
    },
  },
  showMoreLabel: {
    alignItems: 'center',
    color: 'var(--secondary-color-variant)',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'var(--tx-S)',
    justifyContent: 'center',
    maxWidth: '10%',
    width: 'var(--wh-2XS)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  numbersLabelContainer: {
    width: '100%',
    textAlign: 'center',
  },
}));
