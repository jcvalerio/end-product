import Grid from '@material-ui/core/Grid';
import MuiContainer from '@material-ui/core/Container';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

export const Typography = styled(MuiTypography)({
  color: 'var(--page-intro-text-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const Title = styled(Grid)({
  maxWidth: '100vw',
});

export const Container = styled(MuiContainer)({
  background: 'var(--page-intro-bg-color)',
  boxShadow: 'var(--page-intro-shadow)',
  paddingLeft: 'var(--pm-L)',
  paddingTop: 'var(--pm-S)',
  paddingBottom: 'var(--pm-S)',
  display: 'flex',
  ['@media (min-width:1920px)']: { maxWidth: 'initial' },
});
