import { Attribute, Cell } from '@kleeen/types';
import { useAttributeContextMenu, useOnClickOutside } from '@kleeen/react/hooks';

import { KsContextMenu } from '@kleeen/react/components';
import { useRef } from 'react';

interface ContextMenuProps {
  attr: Attribute;
  cell: Cell;
}

export function HookableContextMenu(props: ContextMenuProps) {
  const { contextualToggle, context, setContextualToggle } = useAttributeContextMenu();
  const ref = useRef();
  useOnClickOutside(ref, () => setContextualToggle(false));

  const anchorEl = context.e && context.e.currentTarget;

  function handleClose() {
    setContextualToggle(false);
  }

  if (!contextualToggle) return null;

  return (
    <KsContextMenu
      anchorEl={anchorEl}
      dataPoints={context.dataPoints}
      handleClose={handleClose}
      widgetId={context.widgetId}
    />
  );
}

export default HookableContextMenu;
