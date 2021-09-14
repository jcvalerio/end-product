import { KsMenu, KsMenuItem } from '../menu';
import { styled, withStyles } from '@material-ui/core';

export const Menu = styled(KsMenu)({
  '& .MuiMenu-paper': {
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    maxHeight: 'var(--wh-8XL)',
    width: 'var(--wh-5XL)',
    '& > ul': {
      paddingTop: '0',
    },
  },
  '& .even-stripe': {
    background: 'var(--row-even)',
    '&:hover': {
      background: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  },
  '& .odd-stripe': {
    background: 'var(--row-odd)',
    '&:hover': {
      background: 'var(--secondary-color-variant)',
      color: 'var(--on-secondary-color-variant)',
    },
  },
  '& .empty': {
    pointerEvents: 'none',
  },
});

export const MenuGroupItem = withStyles({
  root: {
    paddingLeft: 'var(--pm-1XS)',
    '& .menu-item-text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
})(KsMenuItem);

const MenuGroupNameBase = (props) => <KsMenuItem {...props} disabled />;

export const MenuGroupName = withStyles({
  root: {
    backgroundColor: 'var(--nav-top-bg-color)',
    color: 'var(--on-nav-top-bg-color)',
    fontSize: 'var(--tx-S)',
    height: 'var(--pm-L)',
    lineHeight: 'var(--tx-S)',
    paddingLeft: 'var(--pm-1XS)',
    '&.MuiListItem-button.Mui-disabled': {
      opacity: '1',
    },
    '& .menu-item-text': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
})(MenuGroupNameBase);

export const MenuTitle = withStyles({
  root: {
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--neutral-white-hsla)',
    fontSize: 'var(--tx-L)',
    fontWeight: 'bold',
    height: 'var(--wh-1XS)',
    paddingLeft: 'var(--pm-1XS)',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    '&.MuiListItem-button.Mui-disabled': {
      opacity: '1',
    },
    '&, span .text-formatter': {
      width: '100%',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      textAlign: 'left',
      display: 'inline-block',
    },
  },
})(MenuGroupNameBase);
