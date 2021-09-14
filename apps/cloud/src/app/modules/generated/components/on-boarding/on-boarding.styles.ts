import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  onBoardingTask: {
    background: 'var(--application-background)',
    height: 'var(--size-pageHeight)',
  },
  onBoardingPageIntro: {
    margin: 'var(--pm-0) var(--pm-L) var(--pm-L) var(--pm-L)',
    paddingTop: 'var(--pm-L)',
  },
  onBoardingGridSection: {
    backgroundColor: 'var(--surface-color)',
    boxShadow: 'var(--shadow-elevation-mid-key)',
    color: 'var(--on-surface-color)',
    display: 'box',
    height: 'calc(var(--size-pageHeight) - var(--pm-8XL) - var(--pm-8XL) - var(--pm-4XL))',
    margin: 'var(--pm-0) var(--pm-L)',
    marginBottom: 'var(--pm-5XL)',
    overflow: 'auto',
    paddingBottom: 'var(--pm-L)',
    position: 'relative',
    transition: 'height var(--speed-medium)',
  },
  snackbar: {
    height: 'calc(var(--size-pageHeight) - var(--pm-6XL) - var(--pm-1XS) - var(--pm-5XL) - var(--pm-4XS))',
  },
  preview: {
    height: 'cal(var(--size-pageHeight) - var(--pm-8XL) - var(--pm-8XL) - var(--pm-4XL))',
    padding: 'var(--pm-1XL)',
  },
});
