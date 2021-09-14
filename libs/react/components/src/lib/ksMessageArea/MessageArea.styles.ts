import { makeStyles } from '@material-ui/core/styles';

export const subheaderStyles = makeStyles({
  subheader: {
    height: 'var(--wh-1XS)',
    background: 'var(--surface-color-opacity)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 'var(--pm-0) var(--pm-0) var(--pm-1XL)',
  },
  titleSubheader: {
    fontSize: 'var(--tx-M)',
    color: 'var(--on-surface-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  textBold: {
    fontWeight: 'bold',
    marginRight: 'var(--pm-3XS)'
  },
  button:{
    background: 'transparent',
    color: 'var(--secondary-color)',
    '&:hover':{
      background: 'transparent',
      color: 'var(--secondary-color-variant)'
    }
  }
});
