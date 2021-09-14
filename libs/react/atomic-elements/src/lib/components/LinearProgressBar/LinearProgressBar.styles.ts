import { createStyles, LinearProgress, makeStyles, styled } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';

export const ProgressBar = styled(LinearProgress)({
  width: '100%',
  '& > * + *': {
    marginTop: 'var(--pm-6XS)',
  },
  '&.MuiLinearProgress-colorPrimary': {
    height: 'var(--wh-6XS)',
    borderRadius: 'var(--pm-3XS)',
    backgroundColor: 'var(--secondary-color)',
    '& .MuiLinearProgress-bar1Determinate': {
      borderRadius: 'var(--pm-3XS)',
      boxShadow: 'var(--shadow-elevation-mid-key)',
      '&.MuiLinearProgress-barColorPrimary': {
        backgroundColor: 'var(--secondary-color-variant)',
      },
    },
  },
});

export const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: 'calc(var(--wh-3XL) + var(--wh-4XS))',
      margin: 'calc(var(--pm-M) * -1)',
      padding: 'var(--pm-2XS)',
      position: 'relative',
      overflow: 'visible',
      backgroundColor: 'var(--menu-bg-color)',
      color: 'var(--on-surface-color)',
      boxShadow: 'var(--shadow-elevation-mid-key)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '14%',
        width: '0',
        height: '0',
        border: 'var(--pm-L) solid transparent',
        borderTopColor: 'var(--shadow-ambient-light)',
        borderBottom: '0',
        marginLeft: 'calc(var(--pm-6XS) - var(--pm-L))',
        marginBottom: 'calc(var(--pm-6XS) - var(--pm-L))',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '95%',
        left: '15%',
        width: '0',
        height: '0',
        border: '14px solid transparent',
        borderTopColor: 'var(--surface-color)',
        borderBottom: '0',
        marginLeft: 'calc(var(--pm-6XS) - var(--pm-L))',
        marginBottom: 'calc(var(--pm-6XS) - var(--pm-L))',
      },
    },
    popover: {
      pointerEvents: 'none',
      marginLeft: 'calc(var(--pm-7XS) - var(--pm-1XL))',
      boxShadow: 'var(--shadow-elevation-mid-key)',
    },
    tooltip: {
      fontSize: 'var(--tx-S)',
      color: 'var(--alt-mid-color)',
    },
  }),
);

export const PauseButton = styled(MuiButton)({
  background: 'transparent',
  padding: '0',
  '&:hover': {
    background: 'none',
  },
});

export const TooltipText = styled(MuiTypography)({
  color: 'var(--on-surface-color)',
}) as typeof MuiTypography;
