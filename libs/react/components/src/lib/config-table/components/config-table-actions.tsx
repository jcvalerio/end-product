import useKsActionsManager, { ActionsManagerProps } from '../../ActionDialogs/ActionManager';

import React from 'react';
import { isNilOrEmpty } from '@kleeen/common/utils';

export function ConfigTableActions({
  actions,
  attributes,
  context,
  entityActions,
  entityName,
  onAddAction,
  skinny,
  taskName,
}: ActionsManagerProps): JSX.Element | null {
  const { KsActionDialogs, KsActionsSection } = useKsActionsManager({
    actions,
    attributes,
    context,
    entityActions,
    entityName,
    onAddAction,
    skinny,
    taskName,
  });

  if (isNilOrEmpty(actions)) {
    return null;
  }

  return (
    <>
      {KsActionsSection}
      {KsActionDialogs}
    </>
  );
}
