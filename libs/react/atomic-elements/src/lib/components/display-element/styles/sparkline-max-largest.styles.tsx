import { displayWithVizHeight, displayWithVizWidth } from './shared.styles';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  content: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    '& > .ks-label': {
      width: '75%',
    },
  },
});
