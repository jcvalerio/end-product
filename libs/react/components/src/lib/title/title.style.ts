import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  infoContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 'var(--pm-L)',
    '& h3': {
      padding: 'var(--pm-0)',
    },
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'var(--pm-S)',
  },
  marginLeft: {
    marginLeft: 'var(--pm-S)',
  },
  withoutMargin: {
    margin: 'var(--pm-0)',
    fontSize: 'var(--tx-S)',
    color: 'var(--on-surface-color-variant)',
    opacity: '60%',
  },
  mainTitle: {
    textTransform: 'uppercase',
    margin: 'var(--pm-0)',
    fontSize: 'var(--tx-1XL)',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  commonTitle: {
    color: 'var(--h3-title-color)',
    fontSize: 'var(--tx-M)',
    fontWeight: 'bold',
    letterSpacing: 'var(--pm-0)',
    lineHeight: 'var(--tx-2XL)',
    margin: 'var(--pm-0)',
    overflow: 'hidden',
    paddingLeft: 'var(--pm-L)',
    paddingRight: 'var(--pm-L)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  largeTitleContainer: {
    maxWidth: 'var(--wh-9XL)',
  },
  mediumTitleContainer: {
    maxWidth: 'var(--wh-7XL)',
  },
  smallTitleContainer: {
    maxWidth: 'var(--wh-3XL)',
  },
});
