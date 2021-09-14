import { styled, withStyles } from '@material-ui/core/styles';

import { KsMenuContainer } from '../menu';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';

export const Autocomplete = withStyles(() => ({
  root: {
    width: '100%',
  },
  popper: {
    backdropFilter: 'blur(4px)',
  },
}))(MuiAutocomplete);

export const Paper = styled(KsMenuContainer)({
  overflow: 'hidden',
  '& .MuiAutocomplete-groupLabel': {
    backgroundColor: 'var(--menu-bg-color)',
    color: 'var(--primary-color)',
    fontSize: 'var(--tx-S)',
    fontWeight: 'bold',
    lineHeight: 'var(--tx-S)',
    padding: 'var(--pm-5XS) var(--pm-1XS) var(--pm-6XS)',
  },
  '& .MuiAutocomplete-option': {
    padding: 'var(--pm-4XS) var(--pm-1XS)',
    fontSize: 'var(--tx-M)',
  },
  '& .MuiAutocomplete-noOptions': {
    color: 'var(--on-surface-color)',
    padding: 'var(--pm-4XS) var(--pm-1XS)',
    fontSize: 'var(--tx-M)',
  },
});
