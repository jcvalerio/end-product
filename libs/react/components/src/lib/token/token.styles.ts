import { makeStyles, styled } from '@material-ui/core/styles';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { KsMenuContainer } from '../menu';

export const StyledAutocomplete = styled(MuiAutocomplete)({
  width: '100%',
  '& .MuiInputBase-input': {
    color: 'var(--on-surface-color)',
  },
  '& fieldset': {
    'border-color': 'var(--on-surface-color)',
  },
  '&:hover': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      'border-color': 'var(--on-surface-color)',
    },
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--on-surface-color)',
    },
  },
  '& .MuiSelect-root': {
    color: 'var(--secondary-color)',
  },
  '& svg': {
    color: 'var(--secondary-color)',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'var(--pm-7XS) solid var(--outlined-input)',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-hover)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'var(--pm-6XS) solid var(--outlined-input-focus)',
  },
});

export const useTokenStyles = makeStyles({
  chip: {
    maxWidth: 'var(--wh-4XL);',
    margin: 'var(--pm-5XS)',
    '& .MuiChip-label': {
      width: ' 90%',
    },
  },
  inputLabel: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-L)',
    left: 'auto',
    '&.Mui-focused': {
      color: 'var(--on-surface-color)',
    },
  },
});

export const StyledPaper = styled(KsMenuContainer)({
  overflow: 'hidden',
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
