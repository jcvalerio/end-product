import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';

import { Action } from '@kleeen/types';
import { ActionDialogs } from '../ActionDialogs/ActionDialogs';
import { Menu } from './ActionsMenu.styles';
import MenuItem from '@material-ui/core/MenuItem';
import { RowData } from '../config-table';
import { useTheme } from '@kleeen/react/hooks';

interface ActionsMenuProps {
  actions: Action[];
  anchorEl: null | HTMLElement;
  handleClose: (event: React.MouseEvent) => void;
  row: RowData;
  triggerAction: (name: Action) => void;
}

type ActionDialogMap = { [key: string]: boolean };

function ActionsMenu({ actions, anchorEl, handleClose, row, triggerAction }: ActionsMenuProps): ReactElement {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState({});
  const [isCustomOpen, setIsCustomOpen] = useState({});
  const { themeClass } = useTheme();

  useEffect(() => {
    if (Array.isArray(actions)) {
      const actionsWithConfirmation = actions.filter((action) => action.areYouSure);
      const actionsWithCustom = actions.filter((action) => action.component);

      setIsConfirmationOpen(actionsWithConfirmation.reduce(reduceActionsModals, {}));
      setIsCustomOpen(actionsWithCustom.reduce(reduceActionsModals, {}));
    }

    function reduceActionsModals(acc: ActionDialogMap, action: Action): ActionDialogMap {
      acc[action.name] = false;

      return acc;
    }
  }, [actions]);

  function dispatchAction(action: Action, e: MouseEvent): void {
    const isCustomDialogOpen = isCustomOpen[action.name];
    const needsConfirmation = action?.areYouSure;

    if (isCustomDialogOpen && needsConfirmation) {
      setIsConfirmationOpen({
        ...isConfirmationOpen,
        [action.name]: true,
      });
    } else {
      e.preventDefault();
      handleClose(e);
      triggerAction(action);
    }
  }

  function handleClick(action: Action): (e: MouseEvent) => void {
    return (e: MouseEvent): void => {
      if (action?.component) {
        setIsCustomOpen({
          ...isCustomOpen,
          [action.name]: true,
        });
      } else if (action?.areYouSure) {
        setIsConfirmationOpen({
          ...isConfirmationOpen,
          [action.name]: true,
        });
      } else {
        dispatchAction(action, e);
      }
    };
  }

  function handleIsConfirmationOpenChange(action: Action): void {
    setIsConfirmationOpen({
      ...isConfirmationOpen,
      [action.name]: !isConfirmationOpen[action.name],
    });
  }

  function handleIsCustomOpenChange(action: Action): void {
    setIsCustomOpen({
      ...isCustomOpen,
      [action.name]: !isCustomOpen[action.name],
    });
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        className={themeClass}
        id="actions-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {actions.map((action) => (
          <MenuItem key={`${action.name}-menu-item`} onClick={handleClick(action)}>
            {action.displayName}
          </MenuItem>
        ))}
      </Menu>
      {actions.map((action) => (
        <ActionDialogs
          action={action}
          context={{
            row,
          }}
          dispatchAction={dispatchAction}
          isConfirmationOpen={isConfirmationOpen[action.name]}
          isCustomOpen={isCustomOpen[action.name]}
          key={`${action.name}-action-dialogs`}
          onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
          onIsCustomOpenChange={handleIsCustomOpenChange}
        />
      ))}
    </>
  );
}

export default ActionsMenu;
