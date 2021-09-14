import { makeStyles } from '@material-ui/core/styles';

const valueWidth = 'var(--wh-3XL)';

export const useStyles = makeStyles({
  content: {
    margin: '0 auto',
    '& .primary': {
      alignItems: 'center',
      display: 'flex',
      height: 'var(--wh-L)',
      marginBottom: 'var(--pm-1XL)',
    },
    '& .primary-label': {
      color: 'hsla(var(--on-surface-color-hsl), 0.7)',
      fontWeight: '600',
      marginRight: 'var(--pm-L)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      width: valueWidth,
    },
    '& .primary-value': {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      width: `calc(100% - ${valueWidth})`,
    },
  },
});
