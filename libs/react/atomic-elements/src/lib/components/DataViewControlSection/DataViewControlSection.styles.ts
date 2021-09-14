import { Grid, makeStyles, styled } from '@material-ui/core';

import MuiContainer from '@material-ui/core/Container';
import MuiTab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTypography from '@material-ui/core/Typography';

export const Container = styled(MuiContainer)({
  background: 'var(--page-intro-bg-color)',
  boxShadow: 'var(--page-intro-shadow)',
  padding: 'var(--pm-L) var(--pm-S)',
  display: 'flex',
  ['@media (min-width:1920px)']: { maxWidth: 'initial' },
});

export const Tab = styled(MuiTab)({
  '&.MuiTab-root': {
    background: 'var(--surface-color)',
    color: 'var(--secondary-color)',
    minWidth: 'var(--wh-S)',
    maxHeight: 'var(--wh-1XS)',
    margin: 0,
    padding: 0,
    '&.Mui-selected': {
      background: 'var(--secondary-color)',
      color: 'var(--on-secondary-color)',
    },
    '&:hover': {
      background: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  },
});

export const Tabs = styled(MuiTabs)({
  '&.MuiTabs-root': {
    minHeight: 'var(--wh-1XS)',
    height: 'var(--wh-1XS)',
    border: 'var(--pm-7XS) solid var(--on-surface-color)',
    color: 'var(--on-surface-color)',
    alignItems: 'center',
    borderRadius: '4px',
  },
});

export const Title = styled(Grid)({
  maxWidth: '100vw',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export const Typography = styled(MuiTypography)({
  color: 'var(--page-intro-text-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const useStyles = makeStyles({
  IconContainer: {
    display: 'flex',
  },
});
