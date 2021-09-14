import { makeStyles } from '@material-ui/core/styles';

export const ConfigureLayoutStyle = makeStyles({
  configTask: {
    background: 'var(--application-background)',
    height: '100%',
    width: '100%',
  },
  pageIntro: {
    margin: 'var(--pm-0) var(--pm-L) var(--pm-L) var(--pm-L)',
    'padding-top': 'var(--pm-L)',
  },
  configCardSection: {
    height: '100%',
    margin: 'var(--pm-0) var(--pm-L)',
    overflow: 'auto',
    transition: 'height var(--speed-medium) cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  snackbarNavTop: {
    paddingBottom: 'var(--pm-5XL)',
  },
  snackbarNavLeft: {
    height: 'calc(100% - var(--wh-5XL) + var(--wh-2XS))',
  },
});
