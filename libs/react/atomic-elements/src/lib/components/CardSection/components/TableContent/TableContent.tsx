import { Button, Drawer, makeStyles } from '@material-ui/core';
import { ProgressBar } from '../ProgressBar';
import { ReactElement } from 'react';
import classnames from 'classnames';

const useStyles = makeStyles(() => ({
  drawer: {
    padding: 'var(--pm-L)',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 0,
  },
  drawerPaper: {
    background: 'inherit',
    border: 'none',
    overflowY: 'hidden',
    position: 'relative',
    width: '100%',
  },
  buttonMenu: {
    color: 'var(--secondary-color)',
    fontSize: 'var(--tx-M)',
    fontWeight: 'bold',
    height: 'var(--wh-4XS)',
    justifyContent: 'left',
    margin: 'var(--pm-4XS) 0',
    textAlign: 'left',
    textTransform: 'unset',
    width: '100%',
    '&:hover': {
      background: 'none',
      color: 'var(--secondary-color-variant)',
    },
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const bem = 'ks-table-content';

export const TableContent = ({ widgets, widgetsRefs, containerId }: any): ReactElement => {
  const classes = useStyles();

  function handleScroll(widgetId: string): void {
    widgetsRefs[widgetId].current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      className={classnames(`${bem}__content`, classes.drawer)}
      open={true}
      variant="persistent"
    >
      {widgets.map((widget) => {
        return (
          <Button
            key={widget.id}
            className={classnames(`${bem}__button-menu`, classes.buttonMenu)}
            onClick={() => handleScroll(widget.id)}
          >
            <ProgressBar widgetRef={widgetsRefs[widget.id]} containerId={containerId} />
            <span className={classnames(`${bem}__title`, classes.title)}>{widget.title}</span>
          </Button>
        );
      })}
    </Drawer>
  );
};
