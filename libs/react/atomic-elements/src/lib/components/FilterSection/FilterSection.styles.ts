import { KsChip, KsMenuContainer } from '@kleeen/react/components';
import { makeStyles, styled, withStyles } from '@material-ui/core';

import MuiBadge from '@material-ui/core/Badge';
import MuiTooltip from '@material-ui/core/Tooltip';

export const useStyles = makeStyles(() => ({
  drawerClose: {
    height: '100%',
    overflowX: 'hidden',
    alignItems: 'center',
    width: 'var(--wh-1XS)',
  },
  iconFilter: {
    margin: 'var(--pm-4XS)',
    width: 'var(--wh-2XS)',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: 'var(--wh-4XS)',
    '&.MuiSvgIcon-root': {
      color: 'var(--on-secondary-color)',
    },
    '&:hover': {
      backgroundColor: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
      cursor: 'pointer',
    },
  },
  closeContainer: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.23)',
    width: 'var(--wh-6XS)',
    borderRadius: '0 var(--card-border-radius) var(--card-border-radius) 0',

    '&:hover': {
      backgroundColor: 'var(--secondary-color)',
      color: 'var(--surface-color)',
      cursor: 'pointer',
    },
  },
  iconClose: {
    height: '100%',
    color: 'inherit',
    marginLeft: 'calc(var(--pm-1XS)*-1)',
    fontSize: 'var(--wh-2XS)',
  },
  popper: {
    zIndex: 2,
  },
}));

export const Badge = styled(MuiBadge)({
  top: 'var(--wh-6XS)',
  height: 'var(--wh-5XS)',
  width: 'var(--wh-5XS)',
  '& .MuiBadge-anchorOriginTopRightRectangle': {
    top: 'var(--pm-5XS)',
    left: 'var(--pm-6XS)',
  },
  '& .MuiBadge-colorPrimary': {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--on-primary-color)',
  },
});

export const Chip = styled(KsChip)({
  width: 'calc( var(--wh-4XL) - var(--pm-S))',
  margin: 'var(--pm-5XS)',
  '& .MuiChip-label': {
    width: ' 90%',
  },
});

export const Paper = styled(KsMenuContainer)({
  borderRadius: 'var(--card-border-radius)',
  border: 'var(--card-border)',
});

export const Tooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'var(--surface-color)',
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-M)',
    boxShadow: 'var(--shadow-elevation-low-key)',
    position: 'absolute',
    display: 'block',
    width: 'calc(var(--wh-2XL) + var(--wh-2XS))',
    '& li': {
      display: 'block',
      listStylePosition: 'inside',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}))(MuiTooltip);
