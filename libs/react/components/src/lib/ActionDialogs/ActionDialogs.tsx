import { MouseEvent, ReactElement } from 'react';

import { ActionDialogsProps } from './ActionDialogs.model';
import { ActionType } from '@kleeen/types';
import { AddDialogPayload } from '../dialog/components/add-dialog/add-dialog.model';
import { ConfirmationActionDialog } from './components/ConfirmationDialog/ConfirmationDialog';
import { KUIConnect } from '@kleeen/core-react';

function ActionDialogsComponent({
  action,
  attributes,
  context,
  dispatchAction,
  entity,
  isConfirmationOpen,
  isCustomOpen,
  onIsConfirmationOpenChange,
  onIsCustomOpenChange,
  parent,
  taskName,
  translate,
}: ActionDialogsProps): ReactElement {
  const { areYouSure, component: CustomDialog, type } = action;
  const isCustomAction = CustomDialog && type === ActionType.Custom;
  const isCustomAddAction = CustomDialog && type === ActionType.Add;
  const isCustomDeleteAction = CustomDialog && type === ActionType.Delete;

  function handleConfirmationClose(): void {
    onIsConfirmationOpenChange(action);
  }

  function handleCustomClose(): void {
    onIsCustomOpenChange(action);
  }

  return (
    <>
      {areYouSure && (
        <ConfirmationActionDialog
          description={
            entity
              ? `${translate && translate('app.dialog.confirmation')} ${translate(
                  'app.modal.action.addNew',
                )} ${entity}?`
              : `${translate && translate('app.dialog.confirmation')} ${action.displayName}?`
          }
          key={`${action.name}-confirmation`}
          open={isConfirmationOpen || false}
          onAction={(e: MouseEvent) => dispatchAction(action, e)}
          onClose={handleConfirmationClose}
          title={
            entity ? `${translate && translate('app.modal.action.addNew')} ${entity}` : action.displayName
          }
        />
      )}
      {isCustomAddAction && CustomDialog && (
        <CustomDialog
          attributes={attributes}
          action={action}
          context={context}
          description={`${translate && translate('app.dialog.confirmation')} ${action.displayName}?`}
          key={`${action.name}-custom`}
          open={isCustomOpen || false}
          onAction={(e: MouseEvent, payload: AddDialogPayload) => {
            dispatchAction({ action, e, payload });
          }}
          onClose={handleCustomClose}
          parent={parent}
          taskName={taskName}
          title={
            entity
              ? `${translate && translate('app.modal.action.addNew')} ${entity}`
              : translate && translate('app.modal.action.addNew')
          }
        />
      )}
      {
        // Add handler for Custom Delete dialog here
        isCustomDeleteAction && <></>
      }
      {isCustomAction && CustomDialog && (
        <CustomDialog
          context={context}
          description={action.description}
          key={`${action.name}-custom`}
          open={isCustomOpen || false}
          onAction={(e: MouseEvent) => dispatchAction(action, e)}
          onClose={handleCustomClose}
          title={action.displayName}
        />
      )}
    </>
  );
}

export const ActionDialogs = KUIConnect(({ translate }) => ({ translate }))(ActionDialogsComponent);
