import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  header: {
    alignItems: 'center',
    background: 'var(--surface-color)',
    borderRadius: '0 0 var(--card-border-radius) var(--card-border-radius)',
    color: 'var(--on-surface-color)',
    display: 'flex',
    height: 'var(--wh-M)',
    marginBottom: 'var(--sub-header-margin-bottom)',
    padding: 'var(--pm-L)',
  },
  withoutSubHeader: {
    borderRadius: 'var(--card-border-radius)',
  },
  infoContainer: {
    flex: '3',
    width: '100%',
    display: 'grid',
  },
  actionsContainer: {
    // TODO @cafe actions are not being displayed when there ARE actions
    // When actions show up again, review the styles here. For now refresh control goes
    // all the way to the left
    // flex: '1',
  },
  withoutMargin: {
    margin: '0px',
    fontSize: 'var(--tx-S)',
    color: 'var(--on-surface-color-variant)',
    opacity: '60%',
  },
  mainTitle: {
    textTransform: 'uppercase',
    margin: '0px',
    fontSize: 'var(--tx-1XL)',
    lineHeight: 'var(--tx-2XL)',
    width: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});
