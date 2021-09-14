import MuiMenu from '@material-ui/core/Menu';
import { styled } from '@material-ui/core';

export const Menu = styled(MuiMenu)({
  '& .MuiMenu-paper': {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--on-surface-color)',
  },
});
