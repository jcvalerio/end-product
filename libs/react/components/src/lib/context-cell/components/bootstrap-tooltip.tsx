import { Tooltip, makeStyles } from '@material-ui/core';

import { useTheme } from '@kleeen/react/hooks';

const useStylesBootstrap = makeStyles(() => ({
  tooltip: {
    fontSize: 'var(--tx-M)',
    backgroundColor: 'var(--tooltip-background)',
    color: 'var(--on-surface-color)',
    boxShadow: 'var(--shadow-elevation-mid-key)',
  },
  arrow: {
    color: 'var(--tooltip-background)',
  },
}));

export const BootstrapTooltip = (props) => {
  const { themeClass } = useTheme();
  const classes = useStylesBootstrap();

  return (
    <Tooltip
      arrow
      classes={classes}
      PopperProps={{ className: `MuiTooltip-popper MuiTooltip-popperArrow ${themeClass}` }}
      {...props}
    />
  );
};
