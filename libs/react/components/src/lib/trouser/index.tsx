import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { KsDialog } from '../dialog';
import { KsTrouserProps } from './trouser.model';
import { MessageArea } from '../ksMessageArea';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useStyles } from './trouser.styles';
import { useTheme } from '@kleeen/react/hooks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function KsTrouser({
  children,
  handleClose,
  open,
  showMessageArea,
  title,
}: KsTrouserProps): JSX.Element {
  const classes = useStyles();
  const { themeClass } = useTheme();

  return (
    <KsDialog
      className={`${themeClass} ${classes.container}`}
      fullScreen
      open={open}
      TransitionComponent={Transition}
    >
      <div className={classes.dialogTitle}>
        <div className={classes.title}>{title}</div>
        <div className={classes.closeButton}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {showMessageArea && (
        <MessageArea
          isStatic={false}
          typeMessage={'FEATURE:'}
          title={'As a Director I want to Monitor a Collection of Employee'}
          textImportant={', therefore I need to keep track of select KPIs'}
        />
      )}
      <div className={classes.dialogContent}>{children}</div>
    </KsDialog>
  );
}
