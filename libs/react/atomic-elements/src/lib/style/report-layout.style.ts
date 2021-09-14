import { makeStyles } from '@material-ui/core/styles';

export const ReportLayoutStyle = makeStyles({
  dashboardArea: {
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
    width: '100%',
  },
  dashboardAreaWithDetailsSection: {
    width: '100%',
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  dashboardTask: {
    background: 'var(--application-background)',
    height: '100%',
    width: '100%',
    display: 'flex',
    'grid-auto-flow': 'row',
    'grid-template-columns': 'var(--wh-5XL) calc(100% - var(--wh-5XL))',
    'grid-auto-rows': '100%',
  },
  dashboardCardSection: {
    height: 'calc(100% - 186px)',
    margin: 'var(--pm-0) var(--pm-L)',
    'padding-bottom': 'var(--pm-L)',
    overflow: 'auto',
  },
  dashboardFilterSection: {
    height: 'auto',
    zIndex: 0,
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
  gridPageIntro: {
    margin: '0 var(--pm-L) var(--pm-L)',
  },
  dataViewDisplaySection: {
    height: 'calc(100% - var(--wh-M) - var(--pm-L))',
    margin: '0 var(--pm-L)',
    transition: 'height var(--speed-medium)',
  },
  snackbar: {
    height: 'calc(100% - var(--wh-L) - var(--pm-1XS) - var(--wh-M) - var(--pm-4XS))',
  },
  entityBrowserFilterSection: {
    height: 'calc(100% - var(--pm-L) - var(--pm-L))',
    zIndex: 0,
    margin: 'var(--pm-L) 0 var(--pm-L) var(--pm-L)',
  },
});
