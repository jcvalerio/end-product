import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  displayMedia: {
    marginRight: 'var(--pm-S)',
  },
  mediaValueContainer: {
    alignItems: 'center',
    display: 'flex',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
