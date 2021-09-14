import { makeStyles } from '@material-ui/core/styles';

export const styleListHeader = makeStyles(() => ({
  listHeader: {
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    height: 'var(--wh-1XS)',
    justifyContent: 'space-between',
    padding: '0 var(--pm-L)',
    position: 'sticky',
    top: 0,
    background: 'var(--simple-list-header-background)',
    color: 'var(--simple-list-header-color)',
    borderBottom: 'var(--card-header-border)',
    borderBottomWidth: 'var(--wh-0)',
    zIndex: 1,
  },
  textWrap: {
    color: 'var(--on-surface-color)',
  },
  hoverTitleHeader: {
    '& .MuiInputBase-root': {
      '&:hover, &.Mui-focused': {
        color: 'inherit',
      },
      '&.MuiInput-underline:before, &.MuiInput-underline:after': {
        borderBottom: '0px solid',
      },
    },
    '& label': {
      color: 'inherit',
      fontSize: 'var(--tx-1XS)',
    },
    '& label.Mui-focused': {
      color: 'inherit',
      marginTop: 'var(--tx-1XS)',
    },
  },
}));
