import './RefreshControlSection.scss';

import { KsButton, KsMenuItem } from '@kleeen/react/components';
import { Theme, createStyles, makeStyles, styled } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import MuiContainer from '@material-ui/core/Container';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect from '@material-ui/core/Select';
import MuiTypography from '@material-ui/core/Typography';

export const Button = styled(KsButton)({
  boxShadow: 'var(--shadow-button)',
  borderRadius: 'var(--size-size7)',
  width: 'var(--size-size20)',
  '&:hover': {
    boxShadow: 'var(--shadow-button-hover)',
  },
});

export const MenuItem = styled(KsMenuItem)({
  '&.Mui-selected': {
    backgroundColor: 'var(--secondary-color-variant)',
    color: 'var(--on-secondary-color-variant)',
    '&:hover': {
      backgroundColor: 'var(--secondary-color)',
    },
  },
});

export const InputLabel = styled(MuiInputLabel)({
  color: 'var(--outlined-input)',
  fontSize: 'var(--tx-M)',
  left: 'auto',
  '&.Mui-focused': {
    color: 'var(--outlined-input-hover)',
  },
});

export const Select = styled(MuiSelect)({
  '& .MuiSelect-select': {
    '&:focus': {
      backgroundColor: 'var(--transparent)',
    },
  },
  '& fieldset': {
    'border-color': 'var(--outlined-input)',
    borderRadius: '8px',
  },
  '&:hover': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--outlined-input-hover)',
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--outlined-input-hover)',
    },
    '& .MuiSelect-root': {
      color: 'var(--outlined-input)',
    },
  },
  '& .MuiSelect-root': {
    color: 'var(--outlined-input)',
  },
  '& svg': {
    color: 'var(--outlined-input)',
  },
});

export const Typography = styled(MuiTypography)({
  color: 'var(--on-surface-color)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}) as typeof MuiTypography;

export const Title = styled(Grid)({
  maxWidth: '60vw',
});

export const Container = styled(MuiContainer)({
  alignItems: 'center',
  background: 'var(--surface-color)',
  boxShadow: 'var(--refresh-control-section-shadow)',
  boxSizing: 'border-box',
  display: 'flex',
  paddingLeft: 'var(--pm-S)',
  paddingTop: 'var(--pm-S)',
  paddingBottom: 'var(--pm-S)',
  paddingRight: 'var(--pm-S)',
  height: 'var(--wh-L)',
  ['@media (min-width:1920px)']: { maxWidth: 'initial' },
  borderRadius: 'var(--card-border-radius)',
  border: 'var(--card-border)',
});
