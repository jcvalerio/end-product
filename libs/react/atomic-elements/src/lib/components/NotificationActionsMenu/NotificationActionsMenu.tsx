import { KsMenuItem } from '@kleeen/react/components';
import { makeStyles, styled } from '@material-ui/core/styles';
import { useKleeenActions } from '@kleeen/react/hooks';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MuiButton from '@material-ui/core/Button';
import MuiMenu from '@material-ui/core/Menu';
import React, { ReactElement, SyntheticEvent } from 'react';
import classnames from 'classnames';

const bem = 'ks-page-intro-section';

const Menu = styled(MuiMenu)({
  color: 'var(--secondary-color)',
  zIndex: '1800 !important' as any,
  '&:hover': {
    color: 'var(--secondary-color-variant)',
  },
});

const Button = styled(MuiButton)({
  boxShadow: 'var(--shadow-button)',
  minWidth: 'var(--pm-2XL)',
  height: 'var(--pm-2XL)',
  color: 'var(--on-surface-color)',
  '&:hover': {
    color: 'var(--secondary-color-variant)',
  },
});

const useStyles = makeStyles({
  actionContainer: {
    display: 'flex',
    color: 'var(--on-surface-color)',
  },
});

enum ActionTypes {
  Navigation = 'navigation',
  Reload = 'reload',
  Download = 'download',
}

export type ActionShape = {
  type: ActionTypes;
  link?: string | { url: string; target: string };
  title?: string;
};

const hardRefreshPage = () => {
  window.location.reload();
};

const actionEventManager = (taskName: string): ((e: SyntheticEvent, action: ActionShape) => void) => {
  const { refreshPage = hardRefreshPage } = useKleeenActions(taskName) || {};

  return (e: SyntheticEvent, action: ActionShape) => {
    e.preventDefault();

    if (action.type === ActionTypes.Navigation || action.type === ActionTypes.Download) {
      if (typeof action?.link === 'object') {
        window.open(action.link.url, action.link.target || '_blank');
      } else {
        window.open(action.link, '_blank');
      }
    }

    if (action.type === ActionTypes.Reload) {
      refreshPage();
    }
  };
};

const Actions = ({
  actions,
  actionEventHandler,
}: {
  actions: ActionShape[];
  actionEventHandler: (e: SyntheticEvent, action: ActionShape) => void;
}): ReactElement => (
  <>
    {actions.map((action) => (
      <KsMenuItem
        key={action.title}
        className={classnames(`${bem}__menu-item`, 'menu-item')}
        onClick={(e) => actionEventHandler(e, action)}
      >
        {action.title}
      </KsMenuItem>
    ))}
  </>
);

export const NotificationActionsMenu = ({
  actions,
  taskName,
}: {
  actions: ActionShape[];
  taskName: string;
}): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const actionEventHandler = actionEventManager(taskName);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div>
      {actions && (
        <>
          {actions.length > 2 ? (
            <div className={classnames(`${bem}__actions`)}>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="simple-menu"
                keepMounted
                onClose={handleClose}
                open={Boolean(anchorEl)}
              >
                <Actions actions={actions} actionEventHandler={actionEventHandler} />
              </Menu>
            </div>
          ) : (
            <div className={classnames(`${bem}__actions`, classes.actionContainer)}>
              <Actions actions={actions} actionEventHandler={actionEventHandler} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
