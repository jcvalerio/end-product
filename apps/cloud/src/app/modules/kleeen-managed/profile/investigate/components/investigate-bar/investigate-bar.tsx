import { AppBar, Avatar } from '@material-ui/core';

import { InvestigateBarProps } from './investigate-bar.model';
import { KsButton } from '@kleeen/react/components';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { useStyles } from './investigate-bar.styles';

const bem = 'ks-investigate-bar';

export function InvestigateBar({ logo, onClose, title, translate }: InvestigateBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classNames(bem, classes.root)}>
      <Toolbar className={classes.toolbar}>
        {logo && <Avatar alt="Logo" src={logo} className={classNames(`${bem}__avatar`, classes.avatar)} />}
        <div className={classes.header}>
          <Typography className={classNames(`${bem}__subtitle`, classes.subtitle)} variant="h6">
            {translate('app.investigation.title')}
          </Typography>
          <Typography className={classNames(`${bem}__title`, classes.title)} variant="h5">
            {title}
          </Typography>
        </div>
        <KsButton
          className={classNames(`${bem}__close-button`, classes.closeButton)}
          onClick={onClose}
          variant="outlined"
        >
          {translate('app.close')}
        </KsButton>
      </Toolbar>
    </AppBar>
  );
}
