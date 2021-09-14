import { makeStyles } from '@material-ui/core/styles';

export const EntireProductDomainLayoutStyle = makeStyles({
  entityBrowserArea: {
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
    width: '100%',
  },
  entityBrowserAreaWithFilterSection: {
    width: '100%',
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  entityBrowserTask: {
    background: 'var(--application-background)',
    display: 'flex',
    'grid-auto-flow': 'row',
    'grid-auto-rows': '100%',
    'grid-template-columns': 'var(--wh-5XL) calc(100% - var(--wh-5XL))',
    height: '100%',
    width: '100%',
  },
  dashboardCardSection: {
    height: 'calc(100% - 186px)',
    margin: 'var(--pm-0) var(--pm-L)',
    overflow: 'auto',
    'padding-bottom': 'var(--pm-L)',
  },
  entityBrowserFilterSection: {
    height: 'calc(100% - var(--pm-L) - var(--pm-L))',
    zIndex: 0,
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  gridPageIntro: {
    marginBottom: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
  },
  gridGridSection: {
    height: 'calc(100% - var(--wh-M) - var(--pm-L))',
    marginBottom: 'var(--pm-L)',
    marginRight: 'var(--pm-L)',
    transition: 'height var(--speed-medium)',
  },
  snackbar: {
    height: 'calc(100% - var(--wh-L) - var(--pm-1XS) - var(--wh-M) - var(--pm-4XS))',
  },

  configCardSection: {
    height: 'calc(100% - var(--wh-3XL))',
    margin: 'var(--pm-0) var(--pm-L)',
    'padding-bottom': 'var(--pm-L)',
    overflow: 'auto',
    transition: 'height var(--speed-medium) cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  snackbarNavLeft: {
    height: 'calc(100% - var(--wh-5XL) - var(--wh-2XS))',
  },
});
