import { makeStyles, styled } from '@material-ui/core/styles';

import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { KsButton } from '@kleeen/react/components';

export const useStyles = makeStyles({
  root: {
    maxHeight: 'calc(var(--wh-L) - var(--pm-L))',
    width: '95%',
    marginLeft: 'var(--pm-2XL)',
  },
  message: {
    color: 'var(--on-surface-color)',
  },
  divContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 'var(--wh-S)',
  },
});

export const Button = styled(KsButton)({
  maxWidth: '50%',
  marginRight: 'var(--pm-2XL)',
  '& .MuiButton-label': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  },
});

export const CircularProgress = styled(MuiCircularProgress)({
  color: 'var(--primary-color)',
  marginRight: 'var(--pm-M)',
  maxWidth: '50%',
});
