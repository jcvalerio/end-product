import { ActionShape, NotificationActionsMenu } from '../NotificationActionsMenu/NotificationActionsMenu';
import React, { Key } from 'react';
import { SimpleAction, SimpleActionProps } from './simpleAction';
import { makeStyles, styled } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/HighlightOffRounded';
import { Grid } from '@material-ui/core';
import { KsIntlMessage } from '@kleeen/react/components';
import MuiIconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useTheme } from '@kleeen/react/hooks';

const IconButton = styled(MuiIconButton)({
  '&:hover': {
    color: 'var(--secondary-color-variant)',
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    backgroundColor: 'var(--white)',
    height: 'var(--wh-L)',
    width: 'var(--wh-8XL)',
    boxShadow: 'var(--notification-shadow-color)',
  },
  iconContent: {
    width: 'var(--wh-1XS)',
    height: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 0,
  },
  icon: {
    color: 'var(--white)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'var(--wh-3XS)',
    height: 'var(--wh-3XS)',
  },
  content: {
    width: '100%',
    display: 'block',
    padding: 'var(--pm-1XS) var(--pm-M) var(--pm-1XS) var(--pm-M)',
    backgroundColor: 'var(--notification-bg-color)',
    color: 'var(--h3-title-color)',
  },
  header: {
    justifyContent: 'space-between',
    padding: 0,
  },
  title: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-L)',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  description: {
    color: 'var(--on-surface-color)',
    fontSize: 'var(--tx-M)',
    margin: '0 !important',
  },
  expand: {
    padding: 0,
    color: 'var(--on-surface-color)',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  iconAction: {
    width: 'var(--wh-2XS)',
    height: 'var(--wh-2XS)',
    margin: 0,
    padding: 0,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 'var(--pm-L)',
  },
  variantSuccess: {
    background: 'var(--primary-color)',
  },
  variantError: {
    background: 'var(--notification-error-color)',
  },
  actionContainer: {
    display: 'flex',
    color: 'var(--on-surface-color)',
  },
  actionMenu: {
    margin: '0 var(--pm-5XS) 0 var(--pm-5XS)',
    color: 'var(--on-surface-color)',
  },
  dismiss: {
    margin: '0 var(--pm-5XS) 0 var(--pm-5XS)',
  },
}));

export type MessageShape = {
  action?: SimpleActionProps;
  actions?: ActionShape[];
  functionName: string;
  message?: string | { msg: string; values: { [key: string]: any } };
  taskName?: string;
  title?: string | { msg: string; values: { [key: string]: any } };
  variant: 'success' | 'error';
};
export interface ToastNotificationProps {
  id: Key;
  message: MessageShape;
}

const getGenericTitle = (variant: 'error' | 'success', functionName: string): string =>
  variant === 'success' ? `${functionName} successful` : `${functionName} failed`;

const getGenericMessage = (variant: 'error' | 'success', functionName: string): React.ReactNode =>
  variant === 'success' ? (
    <>
      <span style={{ textTransform: 'capitalize' }}>{functionName}</span>
      {` was successfully completed.`}
    </>
  ) : (
    <>
      {`Unfortunately, `}
      <span style={{ textTransform: 'capitalize' }}>{functionName}</span>
      {` failed, please try again.`}
    </>
  );

const ActionMenu = ({
  action,
  actions,
  taskName,
}: {
  action?: SimpleActionProps;
  actions?: ActionShape[];
  taskName?: string;
}) => {
  if (actions) {
    return <NotificationActionsMenu actions={actions} taskName={taskName} />;
  }

  if (action && action.title) return <SimpleAction title={action.title} onClick={action.onClick} />;

  return null;
};

export const ToastNotification = React.forwardRef((props: ToastNotificationProps, ref) => {
  const classes = useStyles();
  const { action, actions, functionName, message, taskName, title, variant } = props.message;
  const { closeSnackbar } = useSnackbar();
  const { themeClass } = useTheme();

  const handleDismiss = () => {
    closeSnackbar(props.id);
  };

  return (
    <Card className={`${themeClass} ${classes.card}`} ref={ref} data-testid="toast-notification">
      {variant == 'error' ? (
        <Grid
          className={`${classes.iconContent} ${classes.variantError}`}
          data-testid="toast-notification-error"
        >
          <ErrorIcon className={classes.icon} />
        </Grid>
      ) : (
        <Grid
          className={`${classes.iconContent} ${classes.variantSuccess}`}
          data-testid="toast-notification-success"
        >
          <CheckIcon className={classes.icon} />
        </Grid>
      )}
      <Grid className={classes.content}>
        <CardActions classes={{ root: classes.header }}>
          <Typography variant="subtitle2" className={classes.title}>
            <KsIntlMessage message={title || getGenericTitle(variant, functionName)} />
          </Typography>
          <div className={classes.actionContainer}>
            <div className={classes.actionMenu}>
              <ActionMenu action={action} actions={actions} taskName={taskName} />
            </div>
            <div className={classes.dismiss}>
              <IconButton
                className={classes.expand}
                data-testid="toast-notification-close"
                onClick={handleDismiss}
              >
                <CloseIcon className={classes.iconAction} />
              </IconButton>
            </div>
          </div>
        </CardActions>
        <Typography variant="subtitle2" className={classes.description}>
          {message ? <KsIntlMessage message={message} /> : getGenericMessage(variant, functionName)}
        </Typography>
      </Grid>
    </Card>
  );
});

export default ToastNotification;
