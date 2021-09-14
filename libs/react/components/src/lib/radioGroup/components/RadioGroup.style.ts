import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  formLabel: {
    maxWidth: 'var(--wh-3XL)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--outlined-input)',
    fontSize: 'var(--tx-M)',
    paddingBottom: 'var(--pm-1XS)',
    '&.Mui-focused': {
      color: 'var(--outlined-input-focus)',
    },
    '&.Mui-disabled': {
      color: 'var(--alt-mid-color);',
    },
  },
  formControlLabel: {
    fontSize: 'var(--size-textM)',
    color: 'var(--on-surface-color)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  formControlLabelDetails: {
    maxWidth: 'var(--wh-3XL)',
  },
  formControlLabelCard: {
    maxWidth: 'var(--wh-7XL)',
  },
  formControlLabelCardOneElement: {
    maxWidth: 'var(--wh-5XL)',
  },
  tooltip: {
    fontSize: 'var(--tx-M)',
  },
});
