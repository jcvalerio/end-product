import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  dropDownSize: {
    width: 'var(--wh-4XL)',
  },
  formControl: {
    height: '100%',
  },
  menuItemIcon: {
    marginRight: 'var(--pm-2XS)',
  },
  popper: {
    backdropFilter: 'blur(4px)',
    width: 'var(--wh-4XL)',
    zIndex: 99,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
