import './SnackBarSection.scss';

import { Action, DeleteDialogProps, bem } from './snack-bar-utils';
import { Dialog, Paper, TypographyBold } from './styled-components';

import { KsButton as Button } from '@kleeen/react/components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import React from 'react';
import { SelectedStatsSection } from './snack-bar-components';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import classnames from 'classnames';
import { useTheme } from '@kleeen/react/hooks';

export interface SnackBarSectionProps {
  actions: Action[];
  entityActions: Record<string, (d: any) => void>;
  showSelectAndExecute?: boolean;
  selectedRows?: any[];
  entity?: string;
  showSnackBar: boolean;
  className?: string;
  setSelectedRows?: any;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { themeClass } = useTheme();
  const title = props.title || `Deleting ${props.entity}`;
  const description = props.description || `Are you sure you want to delete this ${props.entity}?`;

  const handleClose = () => {
    if (props.clearOnClose) {
      props.setSelectedRows([]);
    }
    props.setOpen(false);
  };

  const handleDelete = () => {
    props.entityActions['deleteRequest']({ id: (props.selectedRows || [])[0].id });
    props.setOpen(false);
    props.setSelectedRows([]);
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      className={classnames(`${bem}__dialog`, themeClass)}
      onClose={handleClose}
      open={props.open}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-kleeen-analytics-attrs="component:DeleteDialog,action:cancel"
          data-kleeen-analytics-name="click"
          data-kleeen-analytics-on="click"
          data-testid="cancel-action"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          data-kleeen-analytics-attrs="component:DeleteDialog,action:delete"
          data-kleeen-analytics-name="click"
          data-kleeen-analytics-on="click"
          data-testid="delete-action"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SnackBarSection = (props: SnackBarSectionProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Slide
        in={props.showSnackBar}
        mountOnEnter
        unmountOnExit
        direction="up"
        timeout={400}
        data-testid="snack-bar"
      >
        <Paper
          className={classnames(
            props.className,
            `${bem}__snack-bar`,
            `snack-bar ${props.showSnackBar ? 'visible' : 'hidden'}`,
          )}
        >
          <Toolbar>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2} />
              <Grid container item xs={12} sm={8} justify="center" alignItems="center">
                {(props.selectedRows || []).length > 0 && (
                  <>
                    <TypographyBold
                      variant="button"
                      display="block"
                      className={classnames(`${bem}__snack-bar--button`, 'snackbar-text')}
                    >
                      {(props.selectedRows || []).length}
                    </TypographyBold>
                    <MuiTypography
                      variant="caption"
                      display="block"
                      className={classnames(`${bem}__snack-bar--caption`, 'snackbar-text')}
                    >
                      {props.entity} selected
                    </MuiTypography>
                  </>
                )}
                <SelectedStatsSection
                  showSelectAndExecute={props.showSelectAndExecute}
                  actions={props.actions}
                  setOpen={setOpen}
                />
              </Grid>
              <Grid container item xs={12} sm={2} justify="flex-end" alignItems="center">
                {(props.selectedRows || []).length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classnames(`${bem}__cta--selected`, 'action-button')}
                    onClick={() => {
                      props.setSelectedRows([]);
                    }}
                  >
                    DESELECT ALL
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Paper>
      </Slide>
      <DeleteDialog
        entity={props.entity}
        open={open}
        setOpen={setOpen}
        entityActions={props.entityActions}
        selectedRows={props.selectedRows || []}
        setSelectedRows={props.setSelectedRows}
      />
    </>
  );
};

export default SnackBarSection;
