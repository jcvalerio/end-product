import { Action, AttributeProps, GenericFunctions, ParentProps } from '@kleeen/types';
import React, { useState } from 'react';

import { ActionDialogs } from './ActionDialogs';
import ActionsSection from '../ActionsSection/ActionSection';
import { AddDialogPayload } from '../dialog/components/add-dialog/add-dialog.model';
import { isAddAction } from '@kleeen/render-utils';

export interface ActionsManagerProps {
  actions: Action[];
  attributes: AttributeProps[];
  context?: any;
  entityActions?: GenericFunctions;
  entityName?: string;
  onAddAction?: (payload: AddDialogPayload) => void;
  parent?: ParentProps;
  skinny?: boolean;
  taskName?: string;
}

function useKsActionsManager({
  actions = [],
  attributes,
  entityActions,
  entityName,
  onAddAction,
  parent,
  skinny,
  context,
  taskName,
}: ActionsManagerProps): { KsActionDialogs: JSX.Element[]; KsActionsSection: JSX.Element } {
  const [actionPayload, setActionPayload] = useState<AddDialogPayload>();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const addActions: Action[] = actions?.filter(isAddAction);

  function handleClick(action: Action): void {
    if (action?.component) {
      setIsCustomOpen(true);
    } else if (action?.areYouSure) {
      setIsConfirmationOpen(true);
    }
  }

  // TODO: @cafe When we allow custom actions later on, we need to check in the action type to determine which callback/entityAction to call
  function dispatchAction({ action, payload }: { action: Action; payload: AddDialogPayload }): void {
    const isCustomDialogOpen = isCustomOpen;
    const needsConfirmation = action?.areYouSure;
    const dispatchedActionPayload = payload || actionPayload;

    if (isCustomDialogOpen && needsConfirmation) {
      setActionPayload(payload);
      setIsConfirmationOpen(true);
    } else {
      if (onAddAction) {
        onAddAction(dispatchedActionPayload);
      } else {
        entityActions && entityActions.addRequest && entityActions.addRequest(dispatchedActionPayload);
      }
    }
  }

  function handleIsConfirmationOpenChange(): void {
    setIsConfirmationOpen(!isConfirmationOpen);
  }

  function handleIsCustomOpenChange(): void {
    setIsCustomOpen(!isCustomOpen);
  }

  const KsActionDialogs = addActions.map((action) => (
    <ActionDialogs
      action={action}
      attributes={attributes}
      dispatchAction={dispatchAction}
      entity={entityName}
      isConfirmationOpen={isConfirmationOpen}
      isCustomOpen={isCustomOpen}
      key={`${action.name}-dialogs`}
      onIsConfirmationOpenChange={handleIsConfirmationOpenChange}
      onIsCustomOpenChange={handleIsCustomOpenChange}
      parent={parent}
      context={context}
      taskName={taskName}
    />
  ));
  const KsActionsSection = (
    <ActionsSection actions={addActions} entity={entityName} handleAddClick={handleClick} skinny={skinny} />
  );

  return { KsActionDialogs, KsActionsSection };
}

export default useKsActionsManager;
