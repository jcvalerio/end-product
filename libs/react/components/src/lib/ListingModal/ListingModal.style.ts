import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core';
import { KsDialogStreamlined } from '../dialog/dialog.styles';

export const listingModalStyles = styled(KsDialogStreamlined)({
  '& .MuiDialogContent-root': {
    padding: '0px',
  },
  '& .MuiDialog-paper': {
    height: 'var(--wh-7XL)',
  },
  '& Label': {
    color: 'var(--alt-dark-color)',
  },
  '& .Mui-focused': {
    color: 'var(--secondary-color)',
  },
  '& .MuiInputBase-input': {
    color: 'var(--alt-dark-color)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '3px solid var(--secondary-color-variant)',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '3px solid var(--secondary-color)',
  },
});

export const iconStyles = makeStyles({
  iconFilter: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'var(--pm-4XS)',
    width: 'var(--wh-2XS)',
    height: 'var(--wh-2XS)',
    color: 'var(--secondary-color)',
    borderRadius: 'var(--wh-4XS)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  iconWrapper: {
    width: 'var(--wh-2XS)',
  },
});
